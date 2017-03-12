import {h, render} from 'preact';
import {BubbleSlide, Bubble, Code} from '../../Components';

const SpeechCodePage = () => {
    const codeExample1 = 'const synth = window.speechSynthesis;';
    const codeExample2 = 'const utterThis = new SpeechSynthesisUtterance(\'Hi everybody!\');';
    const codeExample3 = 'synth.speak(utterThis);';
    const codeExample4 = 'const voice = voices.find(voice => voice.name === \'Fiona\');\nutterThis.voice = voice;';
    const codeExample5 = '// We start by creating a voice synthesizer\nconst synth = window.speechSynthesis;\n\n// Next we create a new speech synthesis utterance\nconst utterThis = new SpeechSynthesisUtterance(\'Hi everybody!\');\n\n// We choose an appropriate voce\nconst voice = voices.find(voice => voice.name === \'Fiona\');\n\nutterThis.voice = voice;\n\n// And last, let\'s speak!\nsynth.speak(utterThis);';

    return (
        <BubbleSlide previous="speech" next="speech-recognition">
            <Bubble>So let's see how this speech API works.</Bubble>
            <Bubble>We start by creating a new speech synthesizer.</Bubble>
            <Bubble full>
                <Code code={codeExample1} />
            </Bubble>
            <Bubble>Once we have this synthesizer, we can create a new speech synthesis utterance.</Bubble>
            <Bubble full>
                <Code code={codeExample2} />
            </Bubble>
            <Bubble>The last thing we have to do is let the synthesizer speak our words.</Bubble>
            <Bubble full>
                <Code code={codeExample3} />
            </Bubble>
            <Bubble>Ok cool, but I'm a female cat and the default English voice is a male one. How do I change this?</Bubble>
            <Bubble full>
                <Code code={codeExample4} />
            </Bubble>
            <Bubble>Let's recap shall we?</Bubble>
            <Bubble full>
                <Code code={codeExample5} />
            </Bubble>
        </BubbleSlide>
    );
};

SpeechCodePage.propTypes = {};

export default SpeechCodePage;
