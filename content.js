chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchArticle") {
    let article = document.querySelector("article");
    if (article) {
      sendResponse({ data: article.innerText });
    } else {
      chrome.tabs.update({ url: chrome.runtime.getURL("error.html") });
    }
    return true;
  } else if (request.action === "replaceArticle") {
    let article = document.querySelector("article");
    if (article) {
      article.innerText = request.data;
    }
  }
});
