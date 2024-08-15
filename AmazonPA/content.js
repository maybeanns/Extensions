function getReviews() {
    // Select all review elements on the page
    const reviewElements = document.querySelectorAll('.review-text-content span');
    
    // Extract and return the text content of each review
    return Array.from(reviewElements).map(review => review.innerText.trim());
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "get_reviews") {
      const reviews = getReviews();
      sendResponse({ reviews });
    }
  });
  