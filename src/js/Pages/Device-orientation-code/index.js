import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble} from '../../Components';

export default class DeviceOrientationCodePage extends Component {
    render() {
        return (
            <BubbleSlide previous="/vibration-code" next="/acknowledgements">
                <Bubble>DeviceOrientationPage code</Bubble>
            </BubbleSlide>
        );
    }
};
