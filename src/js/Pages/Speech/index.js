import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble} from '../../Components';
import {Speech} from '../../Services';

export default class SpeechPage extends Component {
    conf = 'PHP Antwerp';
    bubble1 = `Hi ${this.conf}, did you know the browser could talk? Cool huh!`;
    bubble2 = 'The web speech API converts text to spoken words. You can even choose my voice, since I\'m a female cat, I\'ll be talking with a female voice. Meow!';

    speakBubble1() {
        Speech.speak(this.bubble1);
    };

    speakBubble2() {
        Speech.speak(this.bubble2);
    };

    renderSlide() {
        return (
            <BubbleSlide previous="/speech" next="/speech-code" >
                <Bubble onShow={::this.speakBubble1}>{this.bubble1}</Bubble>
                <Bubble onShow={::this.speakBubble2}>{this.bubble2}</Bubble>
            </BubbleSlide>
        );
    }

    renderNoSupportMessage() {
        return (
            <BubbleSlide previous="/speech" next="/speech-code" >
                <Bubble>Unfortunately your browser does not support the <strong>speech API</strong>, try using another browser to see this example, or continue the presentation.</Bubble>
            </BubbleSlide>
        );
    }

    render() {
        if (!('speechSynthesis' in window)) {
            return this.renderNoSupportMessage();
        }

        return this.renderSlide();
    }
};
