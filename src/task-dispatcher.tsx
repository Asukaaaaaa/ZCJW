/**
 * 运行在隔离世界，与拓展主体通信并通过 dom 事件派发任务
 */

const result = await chrome.storage.local.get(['TAB_LIST', 'SCRIPTS']);

const tabList: $TabItem[] = result.TAB_LIST ? JSON.parse(result.TAB_LIST) : [];
const scripts: Record<string, string> = result.SCRIPTS
  ? JSON.parse(result.SCRIPTS)
  : {};

for (const script of tabList
  .filter((tab) => tab.enabled)
  .map(({ id }) => scripts[id])) {
  window.dispatchEvent(new CustomEvent('ZCJW-exec', { detail: script }));
}

export default undefined;
