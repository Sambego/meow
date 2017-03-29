import {h, render, Component} from 'preact';
import linkRef from 'linkref';
import {BubbleSlide, Bubble, BubbleCollection, SpeechRecognition, Loader} from '../../Components';

export default class SpeechRecognitionPage extends Component {
    constructor(...props) {
        super(...props);

        this.state = {
            speechRegnitionInProcess: false,
            recognizedText: '',
        };
    }

    onSpeechRecognitionStart() {
        this.setState({
            speechRegnitionInProcess: true,
        });
    }

    setRecognizedSpeech(result) {
        this.setState({
            speechRegnitionInProcess: false,
            recognizedText: result.transcript,
        });

        this.refs.bubbleSlide.getNextAction();
    }

    renderSlide() {
        return (
            <BubbleSlide previous="/speech-recognition" next="/speech-recognition-code" ref={linkRef(this, 'bubbleSlide')}>
                <BubbleCollection>
                    <Bubble>So Sam, you know I can talk to you trough the browser, but did you know you can also talk to me? That's right, I can understand the words you say to me. Press the button below and say something.</Bubble>
                    <SpeechRecognition onSpeechRecognitionStart={::this.onSpeechRecognitionStart} onSpeechRecognized={::this.setRecognizedSpeech}></SpeechRecognition>
                    {this.state.speechRegnitionInProcess && <Bubble me>
                        <Loader/>
                    </Bubble>}
                </BubbleCollection>
                <BubbleCollection>
                    <Bubble me>{this.state.recognizedText}.</Bubble>
                    <Bubble>Now that I understand your language, it's time you start learning mine!</Bubble>
                    <Bubble>Meow, means give me food!!</Bubble>
                </BubbleCollection>
            </BubbleSlide>
        );
    }

    renderNoSupportMessage() {
        return (
            <BubbleSlide previous="/speech-recognition" next="/speech-recognition-code" >
                <Bubble>Unfortunately your browser does not support the <strong>speech recognition API</strong>, try using another browser to see this example, or continue the presentation.</Bubble>
            </BubbleSlide>
        );
    }

    render() {
        if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
            return this.renderNoSupportMessage();
        }

        return this.renderSlide();
    }
};
