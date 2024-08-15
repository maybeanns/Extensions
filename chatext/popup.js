document.getElementById('send-btn').addEventListener('click', () => {
    const inputElement = document.getElementById('user-input');
    const userInput = inputElement.value;
    
    if (userInput) {
      addMessage('user', userInput);
      inputElement.value = '';
  
      // Call the Gemini API to get a response
      getResponseFromGemini(userInput).then(botResponse => {
        addMessage('bot', botResponse);
      }).catch(error => {
        addMessage('bot', `Error fetching response: ${error}`);
      });
    }
  });
  
  function addMessage(role, text) {
    const messagesElement = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${role}`;
    messageElement.textContent = text;
    messagesElement.appendChild(messageElement);
    messagesElement.scrollTop = messagesElement.scrollHeight;
  }
  
  async function getResponseFromGemini(userInput) {
    const apiKey = '';  // Replace with your actual API key
    const url = `https://generativeai.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}`;
  
    const requestBody = {
      "prompt": {
        "text": userInput
      },
      "temperature": 0.5,
      "candidateCount": 1,
      "top_k": 40,
      "top_p": 0.8,
      "maxOutputTokens": 60,
      "stopSequences": []
    };
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const responseData = await response.json();
    if (responseData && responseData.candidates && responseData.candidates.length > 0) {
      return responseData.candidates[0].output;
    } else {
      return 'Error: Could not get a response from the bot.';
    }
  }
  