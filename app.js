window.addEventListener('load', () => {
    setTimeout(() => speak('good evening, welcome to sample voice assistant'), 1000);
})

const color = ['red', 'blue', 'black', 'green', 'grey', 'yellow', 'pink', 'rose', 'violet', 'white', 'purple']

const speak = (content) => {
    const speech_content = new SpeechSynthesisUtterance();
    speech_content.text = content;
    window.speechSynthesis.speak(speech_content);
};

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.addEventListener('result', (event) => {
    const content = event.results[event.resultIndex][0].transcript;
    console.log('Recognized content::', content);
    handleActions(content.toLowerCase());
});

const listen = () => {
    recognition.start();
}


const handleActions = (text) => {
    let new_content = 'I couldnt understand anything. How can I help you?'
    console.log(text.split(' ').length === 2)
    if ((text.length <= 5) && text.includes('hi') || text.includes('hey') || text.includes('hello')) {
        new_content = 'hello, welcome'
    }

    else if (text.includes('how are you')) {
        new_content = 'I am fine. How can I help you?'
    }

    else if (text.includes('who are you')) {
        new_content = 'I am your personal voice assistant'
    }

    else if (text.includes('open google')) {
        new_content = 'Opening google'
        window.open('https://www.google.com', '_blank')
    }

    else if (text.includes('open twitter')) {
        new_content = 'Here is what I found'
        window.open('https://www.x.com', '_blank')
    }

    else if (text.includes('open linkedin')) {
        new_content = 'Here is what I found'
        window.open('https://www.linkedin.com', '_blank')
    }

    else if (text.includes('what is') || text.includes('where is') || text.includes('who is') || text.includes('how are') || text.includes('how is')) {
        new_content = ' Here is what I found'
        window.open(`https://www.google.com/search?q=${text.replace(" ", "+")}`, "_blank");
    }
    else if (text.split(' ').length === 2) {
        text.replace('.', '');
        const new_color = (text.split(' ')[1].toLowerCase()).replace('.', '');
        if (color.includes(new_color)) {
            document.body.style.backgroundColor = new_color;
            new_content = 'Changing the background color to ' + new_color
        }
    }
    speak(new_content)
}
