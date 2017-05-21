import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble, HeadTracking} from '../../Components';

export default class HeadTrackingBonusPage extends Component {
    render() {
        return (
            <BubbleSlide previous="/media-recorder-code" next="/head-tracking">
                <h1>Bonus 🎉</h1>
            </BubbleSlide>
        );
    }
};
