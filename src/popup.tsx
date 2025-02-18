import * as Ace from "ace-builds";
import { For, createEffect, onCleanup, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { render } from "solid-js/web";
import { createRefContent } from "./utils";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
// import "ace-builds/src-noconflict/theme-monokai";
import "./popup.css";

const Tabs = (props: {
  tabs: $TabItem[];
  onTabChange: (index: number) => void;
}) => {
  return (
    <div class="flex flex-grow">
      <For each={props.tabs}>
        {(tab, i) => (
          <div class="tab-buttons">
            <button
              type="button"
              class={`tab-button ${tab.active ? "active" : ""}`}
              onClick={() => props.onTabChange(i())}
            >
              {tab.name ?? i()}
            </button>
          </div>
        )}
      </For>
    </div>
  );
};

type EditorRef = {
  editor: Ace.Editor;
};
const Editor = (props: { ref?: EditorRef }) => {
  let editor: Ace.Editor;
  let editorEl = undefined as unknown as HTMLDivElement;

  onMount(() => {
    editor = Ace.edit(editorEl);
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");
    // 启用自动补全功能
    editor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
    });
  });

  createRefContent(
    () => props.ref,
    () => ({
      get editor() {
        return editor;
      },
    }),
  );

  return <div id="editor" class="w-640 h-360" ref={editorEl} />;
};

const App = () => {
  let editorRef: EditorRef = undefined as unknown as EditorRef;
  const [store, setStore] = createStore({
    tabs: [] as $TabItem[],
    scripts: {} as { [key: string]: string },
  });
  const activeTab = () => store.tabs.find((tab) => tab.active);
  const scriptContent = () => {
    const id = activeTab()?.id;
    return id ? store.scripts[id] : "";
  };

  onMount(async () => {
    const result = await chrome.storage.local.get(["TAB_LIST", "SCRIPTS"]);
    const tabList: $TabItem[] = result.TAB_LIST
      ? JSON.parse(result.TAB_LIST)
      : Array.from({ length: 4 }).map((_, i) => ({
          name: `Tab ${i + 1}`,
          id: btoa(`${i}${Date.now()}`),
          active: i === 0,
        }));
    const scripts: Record<string, string> = result.SCRIPTS
      ? JSON.parse(result.SCRIPTS)
      : {};
    console.log("Message from local storage:", result);
    setStore("tabs", tabList);
    setStore("scripts", scripts);
  });

  onCleanup(() => {
    chrome.storage.local.set({ byebye: 1 });
  });

  createEffect(() => {
    console.log("tabs changed", store.tabs);
    serielizeTabList();
  });
  createEffect(() => {
    console.log("scripts changed", store.scripts);
    serielizeScripts();
  });
  createEffect(() => {
    console.log("active tab changed", activeTab());
    if (!editorRef?.editor) return console.error("editor is not defined");
    editorRef.editor.setValue(scriptContent());
  });

  function serielizeTabList() {
    chrome.storage.local.set({ TAB_LIST: JSON.stringify(store.tabs) });
  }
  function serielizeScripts() {
    chrome.storage.local.set({ SCRIPTS: JSON.stringify(store.scripts) });
  }
  function onTabChange(index: number) {
    setStore(
      "tabs",
      produce((tabs) =>
        tabs.forEach((tab, i) => {
          tab.active = i === index;
        }),
      ),
    );
  }
  function toggleScript(e: Event) {
    setStore(
      "tabs",
      (tab) => !!tab.active,
      produce((tab) => {
        tab.enabled = !!(e.target as HTMLInputElement)?.checked;
      }),
    );
  }
  function onReset() {
    setStore("scripts", activeTab()!.id, "");
  }
  function onSave() {
    const val = editorRef.editor.getValue();
    console.log(val);
    setStore("scripts", activeTab()!.id, val ?? "");
  }

  return (
    <div id="app">
      <div class="flex justify-between mb-4">
        <Tabs tabs={store.tabs} onTabChange={onTabChange} />
        <input
          type="checkbox"
          checked={activeTab()?.enabled}
          onchange={toggleScript}
        />
        <button type="button" onclick={onReset}>
          Reset
        </button>
        <button type="button" onclick={onSave}>
          Save
        </button>
      </div>
      <Editor ref={editorRef} />
    </div>
  );
};

const root = document.getElementById("root");
if (root) render(() => <App />, root);
