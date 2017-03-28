import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble, Code} from '../../Components';
import {Speech} from '../../Services';

export default class SpeechCodePage extends Component {
    codeExample1 = 'const synth = window.speechSynthesis;';
    codeExample2 = 'const utterThis = new SpeechSynthesisUtterance(\'Hi everybody!\');';
    codeExample3 = 'synth.speak(utterThis);';
    codeExample4 = 'const voice = voices.find(voice => voice.name === \'Fiona\');\nutterThis.voice = voice;';
    codeExample5 = '// We start by creating a voice synthesizer\nconst synth = window.speechSynthesis;\n\n// Next we create a new speech synthesis utterance\nconst utterThis = new SpeechSynthesisUtterance(\'Hi everybody!\');\n\n// We choose an appropriate voce\nconst voice = voices.find(voice => voice.name === \'Fiona\');\n\nutterThis.voice = voice;\n\n// And last, let\'s speak!\nsynth.speak(utterThis);';

    beatbox() {
        Speech.beatbox('ctsndbootsssndctsndbotssndctsndbootssndctsndbotss');
    };

    render() {
        return (
            <BubbleSlide previous="speech" next="speech-recognition">
                <Bubble>Let's dive into some code and see how we can make this browser talk, shall we?</Bubble>
                <Bubble>Modern browsers have started implmenting the speech API, we'll use this API to make the browser talk.</Bubble>
                <Bubble>Let's start by creating a new speech synthesizer.</Bubble>
                <Bubble full>
                    <Code code={this.codeExample1} />
                </Bubble>
                <Bubble>Once we have this synthesizer, we can create a new speech synthesis utterance.</Bubble>
                <Bubble full>
                    <Code code={this.codeExample2} />
                </Bubble>
                <Bubble>The last thing we have to do is let the synthesizer speak our words.</Bubble>
                <Bubble full>
                    <Code code={this.codeExample3} />
                </Bubble>
                <Bubble>Ok cool, but I'm a female cat and the default English voice is a male one. How do I change this?</Bubble>
                <Bubble full>
                    <Code code={this.codeExample4} />
                </Bubble>
                <Bubble>Let's recap shall we?</Bubble>
                <Bubble full>
                    <Code code={this.codeExample5} />
                </Bubble>
                <Bubble onShow={::this.beatbox}>Here's a something fun for y'all, I used to be a beatbox star when I was a kitten, listen!</Bubble>
            </BubbleSlide>
        );
    }
};
