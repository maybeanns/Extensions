document.getElementById('analyzeBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "get_reviews" }, (response) => {
        const reviews = response.reviews;
        if (reviews.length === 0) {
          alert("No reviews found on this page.");
          return;
        }
        
        const sentiment = analyzeSentiment(reviews);
        displayResults(sentiment);
      });
    });
  });
  
  function analyzeSentiment(reviews) {
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'perfect', 'fantastic', 'happy'];
    const negativeWords = ['bad', 'terrible', 'poor', 'awful', 'hate', 'disappointed', 'worse', 'unhappy'];
    
    let happy = 0, neutral = 0, sad = 0;
  
    reviews.forEach(review => {
      const reviewLower = review.toLowerCase();
      if (positiveWords.some(word => reviewLower.includes(word))) {
        happy++;
      } else if (negativeWords.some(word => reviewLower.includes(word))) {
        sad++;
      } else {
        neutral++;
      }
    });
  
    const total = reviews.length;
    return {
      happy: (happy / total * 100).toFixed(2),
      neutral: (neutral / total * 100).toFixed(2),
      sad: (sad / total * 100).toFixed(2)
    };
  }
  
  function displayResults(sentiment) {
    document.getElementById('happy').textContent = sentiment.happy + '%';
    document.getElementById('neutral').textContent = sentiment.neutral + '%';
    document.getElementById('sad').textContent = sentiment.sad + '%';
  }
  