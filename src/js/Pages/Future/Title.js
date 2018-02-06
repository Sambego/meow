import { h, render, Component } from 'preact';
import { BubbleSlide } from '../../Components';

export default class FutureTitlePage extends Component {
    render() {
        return (
            <BubbleSlide previous="/device-orientation-code" next="/future-example">
                <h1>What else?</h1>
            </BubbleSlide>
        );
    }
}
