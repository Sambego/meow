import {h, render, Component} from 'preact';
import linkRef from 'linkref';
import {Slide, Bubbles, Bubble} from '../../Components';
import styles from  './speech.scss';
import {Speech} from '../../Services';
import Keyboard from '../../Services/Keyboard';

export default class SpeechPage extends Component {
    conf = 'Front Trends';
    bubble1 = `Hi ${this.conf}, did you know the browser could talk? Cool huh!`;
    bubble2 = 'The web speech API converts text to spoken words. You can even choose my voice, since I\'m a female cat, I\'ll be talking with a female voice. Meow!';

    goToPreviousPage = () => {
        this.refs.slide.previous();
    }

    goToNextPage = () => {
        this.refs.slide.next();
    }

    getPreviousAction() {
        if (!this.refs.bubbles.firstBubbleIsShown()) {
            return this.refs.bubbles.nextBubble();
        }

        return this.goToPreviousPage();
    }

    getNextAction() {
        if (!this.refs.bubbles.lastBubbleIsShown()) {
            return this.refs.bubbles.nextBubble();
        }

        return this.goToNextPage();
    }

    speakBubble1() {
        Speech.speak(this.bubble1);
    }

    speakBubble2() {
        Speech.speak(this.bubble2);
    }

    componentWillMount() {
        this.KeyboardLeftListener = Keyboard.on('left', () => this.getPreviousAction());
        this.KeyboardRightListener = Keyboard.on('right', () => this.getNextAction());
    }

    componentWillUnmount() {
        Keyboard.off(this.KeyboardLeftListener);
        Keyboard.off(this.KeyboardRightListener);
    }

    render() {
        return (
            <Slide previous="/" next="speech-code" ref={linkRef(this, 'slide')}>
                <Bubbles ref={linkRef(this, 'bubbles')} >
                    <Bubble onShow={::this.speakBubble1}>{this.bubble1}</Bubble>
                    <Bubble onShow={::this.speakBubble2}>{this.bubble2}</Bubble>
                </Bubbles>
            </Slide>
        );
    }
};
