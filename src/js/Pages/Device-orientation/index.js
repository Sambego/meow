import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble, Mouse} from '../../Components';

export default class DeviceOrientationExamplePage extends Component {
    render() {
        return (
            <BubbleSlide previous="/device-orientation" next="/device-orientation-code">
                <Bubble>One more cool trick. I know when you move your browser!</Bubble>
                <Mouse />
                <Bubble>If you device is equiped with a gyroscope or accelerometer, you can move the mouse by moving your device in the direction the mouse should go!</Bubble>
                <Bubble>Should your device not have the right sensors, try opeing this page on your phone or tablet <a href="https://meow.sambego.be/device-orientation-code" alt="device orientation">https://meow.sambego.be/device-orientation-code</a>.</Bubble>
            </BubbleSlide>
        );
    }
};
