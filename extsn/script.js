fetch('https://icanhazdadjoke.com/slack')
.then(response => response.json())
.then(jokedata =>{
    const jokeText = jokedata.attachments[0].text;
    const jokeElement = document.getElementById('jokeElement');
    jokeElement.innerHTML = jokeText;
    
})