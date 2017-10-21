import { h, render, Component } from 'preact';
import { BubbleSlide, Bubble, Code } from '../../Components';

export default class DeviceOrientationCodePage extends Component {
    codeExample1 = 'window.addEventListener(\'deviceorientation\', move);';
    codeExample2 = 'const move = event => {\n    // event.alpha\n    // event.beta\n    // event.gamma\n}';

    render() {
        return (
            <BubbleSlide
                previous="/device-orientation-example"
                next="/media-session"
            >
                <Bubble>
                    To listen to changes in the orientation of our device, we
                    can register an eventlistener for the{' '}
                    <strong>deviceorientation</strong> event.
                </Bubble>
                <Bubble full>
                    <Code code={this.codeExample1} />
                </Bubble>
                <Bubble>
                    Every time the event dispatches, it will give us usefull
                    information about the orientation of our device.
                </Bubble>
                <Bubble full>
                    <Code code={this.codeExample2} />
                </Bubble>
            </BubbleSlide>
        );
    }
}
