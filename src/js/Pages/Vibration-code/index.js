import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble, Code} from '../../Components';

export default class AudioCodePage extends Component {
    codeExample1 = 'navigator.vibrate(400);';
    codeExample2 = 'navigator.vibrate([400, 200, 400]);';

    render() {
        return (
            <BubbleSlide previous="/vibration-example" next="/bonus">
                <Bubble>Vibrating a device is pretty easy. You can use the vibrate function in the navigator object. It takes a parameter which will determine the length of the vibration.</Bubble>
                <Bubble full>
                    <Code code={this.codeExample1} />
                </Bubble>
                <Bubble>It is also possible to vibrate in a pattern, just supply the durations and intervals in an array.</Bubble>
                <Bubble full>
                    <Code code={this.codeExample2} />
                </Bubble>
            </BubbleSlide>
        );
    }
};
