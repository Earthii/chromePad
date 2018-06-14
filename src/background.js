chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "createNote",
    title: "ChromePad: Add to a new Note",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(clickData => {
  if (clickData.menuItemId === "createNote" && clickData.selectionText) {
    const fakeUUID = Date.now();
    const noteData = {};
    noteData[fakeUUID] = {
      name: "",
      content: clickData.selectionText,
      id: fakeUUID.toString()
    };
    chrome.storage.sync.set(noteData, () => {});
  }
});
