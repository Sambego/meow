import { h, render, Component } from 'preact';
import { BubbleSlide, Bubble } from '../../Components';

export default class FuturePage extends Component {
    render() {
        return (
            <BubbleSlide previous="/future" next="/bonus">
                <Bubble>Payments API</Bubble>
                <Bubble>Web bluetooth API</Bubble>
                <Bubble>Web USB API</Bubble>
                <Bubble>
                    Who knows? The web is changing so fast, we can't even
                    imagine what will be possible in the future.
                </Bubble>
            </BubbleSlide>
        );
    }
}
