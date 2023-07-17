document.querySelector("#btnConvert").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "fetchArticle" },
      function (response) {
        chrome.runtime.sendMessage(
          { action: "process", articleContent: response.data },
          function (response) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "replaceArticle",
              data: response.data,
            });
          }
        );
      }
    );
  });
});
