import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble} from '../../Components';
import {Speech} from '../../Services';
import Config from '../../Config';

export default class SpeechUsePage extends Component {
    render() {
        return (
            <BubbleSlide previous="/speech-code" next="/speech-recognition" >
                <Bubble>So what can we use this for?</Bubble>
                <Bubble>- A simple sreenreader</Bubble>
            </BubbleSlide>
        );
    }
};
