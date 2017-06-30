import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble, Mouse} from '../../Components';

export default class DeviceOrientationExamplePage extends Component {
    render() {
        return (
            <BubbleSlide previous="/vibration-code" next="/acknowledgements">
                <Bubble>DeviceOrientationPage</Bubble>
                <Mouse />
                <Bubble>DeviceOrientationPage 2</Bubble>
            </BubbleSlide>
        );
    }
};
