chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "process") {
    // Put your OpenAI key here
    const OPEN_AI_KEY = "your_openai_key";

    // Formulate the data to be sent
    let data = {
      prompt: `What is the steel-man argument against this: ${request.articleContent}`,
      max_tokens: 500,
    };

    // Define the API URL
    let url = "https://api.openai.com/v4/engines/davinci-codex/completions";

    // Fetch API request
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPEN_AI_KEY}`,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        sendResponse({ data: data.choices[0].text });
      })
      .catch(error => {
        chrome.tabs.update(sender.tab.id, {
          url: chrome.runtime.getURL("error.html"),
        });
      });

    return true; // This keeps the message channel open until sendResponse is invoked
  }
});
