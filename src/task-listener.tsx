/**
 * 运行在真实世界，接收任务并执行
 */

window.addEventListener('ZCJW-exec', (e) => {
  const { detail } = e as CustomEvent<string>;
  const el = document.createElement('script');
  el.type = 'module';
  el.textContent = detail;
  document.head.appendChild(el);
});
