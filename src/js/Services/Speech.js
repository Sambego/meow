export default class Speech {
    static synth = window.speechSynthesis;
    static speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    static speak(input, female = true) {
        const utterThis = new SpeechSynthesisUtterance(input);
        const voices = this.synth.getVoices();
        const doSpeak = () => {
            const voice = voices.find(voice => voice.name === (female ? 'Fiona' : 'Alex'));

            // Set voice params
            utterThis.voice = voice;
            utterThis.pitch = (female ? 2 : 1);
            utterThis.rate = (female ? .8 : 1);

            // Speak§
            this.synth.speak(utterThis);
        };

        if (voices.length) {
            doSpeak();
        } else {
            // http://stackoverflow.com/questions/21513706/getting-the-list-of-voices-in-speechsynthesis-of-chrome-web-speech-api
            window.speechSynthesis.onvoiceschanged = doSpeak;
        }
    }

    static recognize() {
        return new Promise((resolve, reject) => {
            const recognition = new this.speechRecognition();

            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;
            recognition.onresult = event => console.log(event.results) && resolve(event.results[0][0]);
            recognition.onerror = error => console.log(error) && reject(error);

            recognition.start();
        });
    }
};
