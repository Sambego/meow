import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble, HeadTracking} from '../../Components';

export default class HeadTrackingBonusPage extends Component {
    render() {
        return (
            <BubbleSlide previous="/device-orientation-code" next="/acknowledgements">
                <h1>Let's throw everything together! 🎉</h1>
            </BubbleSlide>
        );
    }
};
