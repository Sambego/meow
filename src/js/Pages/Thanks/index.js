import { h, render, Component } from 'preact';
import { BubbleSlide } from '../../Components';
import { Keyboard } from '../../Services';

export default class ThanksPage extends Component {
    render() {
        return (
            <BubbleSlide previous="/acknowledgements">
                <h1>Thank you!</h1>
            </BubbleSlide>
        );
    }
}
