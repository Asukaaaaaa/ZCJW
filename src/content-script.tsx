const result = await chrome.storage.local.get(["TAB_LIST", "SCRIPTS"]);

const tabList: $TabItem[] = result.TAB_LIST ? JSON.parse(result.TAB_LIST) : [];
const scripts: Record<string, string> = result.SCRIPTS
  ? JSON.parse(result.SCRIPTS)
  : {};

for (const script of tabList
  .filter((tab) => tab.enabled)
  .map(({ id }) => scripts[id])) {
  const el = document.createElement("script");
  el.textContent = script;
  document.head.appendChild(el);
  console.log(document.head, el);
}

export default undefined;

// import { proxy } from "ajax-hook";
// import axios from "axios";

// console.log("dididi", document.readyState);
// const { originXhr, unProxy } = proxy({
//   //请求发起前进入
//   onRequest: (config, handler) => {
//     console.log(config);
//     handler.next(config);
//   },
//   //请求发生错误时进入，比如超时；注意，不包括http状态码错误，如404仍然会认为请求成功
//   onError: (err, handler) => {
//     console.log(err);
//     handler.next(err);
//   },
//   //请求成功后进入
//   onResponse: (response, handler) => {
//     console.log(response);
//     handler.next(response);
//   },
// });

// const http = axios.create({
//   baseURL: "https://swapi.dev/api/",
//   timeout: 10000,
//   // withCredentials: true,
// });
// http.get("/people").catch(console.log);
// http.get("/starships").catch(console.log);
// http.get("/planets").catch(console.log);
