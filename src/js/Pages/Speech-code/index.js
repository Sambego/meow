import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble, Code} from '../../Components';
import {Speech} from '../../Services';

export default class SpeechCodePage extends Component {
    codeExample1 = 'const synth = window.speechSynthesis;';
    codeExample2 = 'const utterThis = \n    new SpeechSynthesisUtterance(\'Hi everybody!\');';
    codeExample3 = 'synth.speak(utterThis);';
    codeExample4 = '// Find the voice you want\nconst voices = synth.getVoices();\nconst voice = voices\n    .find(voice => voice.name === \'Fiona\');\n\n// Use the selected voice\nutterThis.voice = voice;\n\n// Change the pitch and pace\nutterThis.pitch = 1.5;\nutterThis.rate = 0.8;';
    codeExample5 = '// We start by using the voice synthesizer\nconst synth = window.speechSynthesis;\n\n// Next we create a new speech synthesis utterance\nconst utterThis = \n    new SpeechSynthesisUtterance(\'Hi everybody!\');\n\n// We choose an appropriate voce\nconst voice = voices\n    .find(voice => voice.name === \'Fiona\');\n\nutterThis.voice = voice;\n\n// And last, let\'s speak!\nsynth.speak(utterThis);';

    talkMale() {
        Speech.speak('Hi everybody', false);
    }

    talkFemale() {
        Speech.speak('Now, this is better, dont you think?');
    }

    render() {
        return (
            <BubbleSlide previous="/speech-example" next="/speech-recognition">
                <Bubble>Let's dive into some code and see how we can make this browser talk, shall we?</Bubble>
                <Bubble>Modern browsers have started implementing the speech API, we'll use this API to make the browser talk.</Bubble>
                <Bubble>Let's start by using the speech synthesizer.</Bubble>
                <Bubble full>
                    <Code code={this.codeExample1} />
                </Bubble>
                <Bubble>Once we have this synthesizer, we can create a new speech synthesis utterance.</Bubble>
                <Bubble full>
                    <Code code={this.codeExample2} />
                </Bubble>
                <Bubble>The last thing we have to do is let the synthesizer say our words.</Bubble>
                <Bubble full>
                    <Code code={this.codeExample3} />
                </Bubble>
                {window.speechSynthesis &&
                    <Bubble>Let's hear this in action.</Bubble>
                }
                {window.speechSynthesis &&
                    <Bubble hidden onShow={this.talkMale}></Bubble>
                }
                <Bubble>Ok cool, but I'm a female cat and the default English voice is a male one. How do I change this?</Bubble>
                <Bubble full>
                    <Code code={this.codeExample4} />
                </Bubble>
                {window.speechSynthesis &&
                    <Bubble hidden onShow={this.talkFemale}></Bubble>
                }
                <Bubble>Let's recap shall we?</Bubble>
                <Bubble full>
                    <Code code={this.codeExample5} />
                </Bubble>
            </BubbleSlide>
        );
    }
};
