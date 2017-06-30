import {h, render, Component} from 'preact';
import {BubbleSlide} from '../../Components';

export default class DeviceOrientationPage extends Component {
    render() {
        return (
            <BubbleSlide previous="/vibration-code" next="/device-orientation-example">
                <h1>Device orientation</h1>
            </BubbleSlide>
        );
    }
};
