import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble, Code} from '../../Components';

export default class SpeechCodePage extends Component {
    codeExample1 = 'const synth = window.speechSynthesis;';
    codeExample2 = 'const utterThis = new SpeechSynthesisUtterance(\'Hi everybody!\');';
    codeExample3 = 'synth.speak(utterThis);';
    codeExample4 = 'const voice = voices.find(voice => voice.name === \'Fiona\');\nutterThis.voice = voice;';
    codeExample5 = '// We start by creating a voice synthesizer\nconst synth = window.speechSynthesis;\n\n// Next we create a new speech synthesis utterance\nconst utterThis = new SpeechSynthesisUtterance(\'Hi everybody!\');\n\n// We choose an appropriate voce\nconst voice = voices.find(voice => voice.name === \'Fiona\');\n\nutterThis.voice = voice;\n\n// And last, let\'s speak!\nsynth.speak(utterThis);';

    render() {
        return (
            <BubbleSlide previous="speech" next="speech-recognition">
                <Bubble>So let's see how this speech API works.</Bubble>
                <Bubble>We start by creating a new speech synthesizer.</Bubble>
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
            </BubbleSlide>
        );
    }
};
