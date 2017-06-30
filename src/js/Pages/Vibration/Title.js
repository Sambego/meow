import {h, render, Component} from 'preact';
import {BubbleSlide} from '../../Components';

export default class VibrationTitlePage extends Component {
    render() {
        return (
            <BubbleSlide previous="/audio-code" next="/vibration-example">
                <h1>Vibration API</h1>
            </BubbleSlide>
        );
    }
};
