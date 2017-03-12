import {h, render} from 'preact';
import {BubbleSlide, Bubble, Code} from '../../Components';

const SpeechRecognitionCodePage = () => {
    const codeExample1 = 'const recognition = new SpeechRecognition();';
    const codeExample2 = '// Set The language of the text that should be recognized\nrecognition.lang = \'en-US\';\n\n// Should the SpeechRecognition API send intermediate results\nrecognition.interimResults = false;\n\n// Handle the result and error events\nrecognition.onresult = event => handleResult(event);\nrecognition.onerror = error => handleError(error);';

    return (
        <BubbleSlide previous="speech-recognition">
            <Bubble>Let me teach you how to setup speech-recognition.</Bubble>
            <Bubble>It is important to know that you need internet access to use this API!</Bubble>
            <Bubble>First we need a new SpeechRecognition instance.</Bubble>
            <Bubble full>
                <Code code={codeExample1} />
            </Bubble>
            <Bubble>Once we've created our SpeechRecognition object, we can configure it by setting some parameters.</Bubble>
            <Bubble full>
                <Code code={codeExample2} />
            </Bubble>
            <Bubble>Now all that's left to do is wait for the SpeechRecognition API to send some results back.</Bubble>
        </BubbleSlide>
    );
};

SpeechRecognitionCodePage.propTypes = {};

export default SpeechRecognitionCodePage;
