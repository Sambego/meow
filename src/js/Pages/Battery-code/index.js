import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble, Code} from '../../Components';

export default class BatteryCodePage extends Component {
    codeExample1 = 'navigator.getBattery().then(battery => {\n    // Battery info lives here\n});';
    codeExample2 = 'navigator.getBattery().then(battery => {\n    //battery.charging\n    //battery.level\n    //battery.chargingTime\n    //battery.dischargingTime\n});';
    codeExample3 = 'navigator.getBattery().then(battery => {\n    battery.addEventListener(\'levelchange\', levelListener);\n    battery.addEventListener(\'chargingchange\', chargingListener);\n    battery.addEventListener(\'chargingtimechange\', chargingTimeListener);\n    battery.addEventListener(\'dischargingtimechange\', dischargingTimeListener);\n});';

    render() {
        return (
            <BubbleSlide previous="battery" next="acknowledgements">
                <Bubble>To start working with the battery API, we first need to request a battery manager object.</Bubble>
                <Bubble full>
                    <Code code={this.codeExample1} />
                </Bubble>
                <Bubble>Using this battery manager object we can get all kinds of information.</Bubble>
                <Bubble full>
                    <Code code={this.codeExample2} />
                </Bubble>
                <Bubble>Besides getting the information, the battery manager can also trigger events when this information changes.</Bubble>
                <Bubble full>
                    <Code code={this.codeExample3} />
                </Bubble>
                <Bubble>Now don't you dare to use the empty battery excuse when I try to reach you!</Bubble>
            </BubbleSlide>
        );
    }
};
