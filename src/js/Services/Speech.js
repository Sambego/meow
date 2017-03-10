export default class Speech {
    static synth = window.speechSynthesis;

    static speak(input) {
        const utterThis = new SpeechSynthesisUtterance(input);
        const voices = this.synth.getVoices();
        const doSpeak = () => {
            const voice = voices.find(voice => voice.name === 'Fiona');

            // Set voice params
            utterThis.voice = voice;
            utterThis.pitch = 2;
            utterThis.rate = .8;

            // Speak§
            this.synth.speak(utterThis);
        };

        if (voices.length) {
            doSpeak();
        } else {
            // http://stackoverflow.com/questions/21513706/getting-the-list-of-voices-in-speechsynthesis-of-chrome-web-speech-api
            window.speechSynthesis.onvoiceschanged = doSpeak;
        }
    };
};
