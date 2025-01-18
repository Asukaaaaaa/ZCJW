// async function getCurrentTab() {
//   const [currentTab] = await chrome.tabs.query({
//     active: true,
//     lastFocusedWindow: true,
//   });
//   if (!currentTab) throw new Error('No tab found');
//   return currentTab;
// }

// chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
//   console.log('Message from background:', message);
//   const { name, content } = message as $Message;
//   if (name === 'hello') {
//     chrome.scripting.executeScript({
//       target: { tabId: (await getCurrentTab()).id! },
//       func: () => {
//         eval(`alert('hello')`);
//         eval(`alert(${content})`);
//         eval(content);
//       },
//       world: 'MAIN',
//     });
//   }
//   sendResponse({ message: 'Message received' });
// });

export default undefined;
