import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble, HeadTracking} from '../../Components';

export default class HeadTrackingPage extends Component {
    render() {
        return (
            <BubbleSlide previous="/media-recorder-code" next="/acknowledgements">
                <Bubble><HeadTracking /></Bubble>
            </BubbleSlide>
        );
    }
};
