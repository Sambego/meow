import {h, render, Component} from 'preact';
import {BubbleSlide} from '../../Components';

export default class SpeechTitlePage extends Component {
    render() {
        return (
            <BubbleSlide previous="/about" next="/speech-example">
                <h1>Speech API</h1>
            </BubbleSlide>
        );
    }
};
