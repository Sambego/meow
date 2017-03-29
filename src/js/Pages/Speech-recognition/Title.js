import {h, render, Component} from 'preact';
import {BubbleSlide} from '../../Components';

export default class SpeechRecognitionTitlePage extends Component {
    render() {
        return (
            <BubbleSlide previous="/speech-code" next="/speech-recognition-example">
                <h1>Speech Recognition API</h1>
            </BubbleSlide>
        );
    }
};
