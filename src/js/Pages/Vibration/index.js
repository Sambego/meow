import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble, BubbleCollection, Loader, Location, Map} from '../../Components';

export default class VibrationPage extends Component {
    constructor(...args) {
        super(...args);

        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    }

    vibrate() {
        navigator.vibrate([200, 100, 200, 100, 200, 100, 200]);
    }

    renderSlide() {
        return (
            <BubbleSlide previous="/vibration" next="/vibration-code">
                <Bubble>Yep, that's right, I can make your device vibrate!</Bubble>
                <Bubble>Unfortunately this only works on devices with a vibration motor. Try opening this url on a phone: <a href="https://meow.sambego.be/vibration-example" title="Open this link on a mobile phone.">https://meow.sambego.be/vibration-example</a>.</Bubble>
            </BubbleSlide>
        );
    }

    renderNoSupportMessage() {
        return (
            <BubbleSlide previous="/vibration" next="/vibration-code" >
                <Bubble>Unfortunately your browser does not support the <strong>vibration API</strong>, try using another browser to see this example, or continue the presentation.</Bubble>
            </BubbleSlide>
        );
    }

    render() {
        if (!('vibrate' in navigator) && ('ontouchstart' in window)) {
            return this.renderNoSupportMessage();
        }

        return this.renderSlide();
    }
};
