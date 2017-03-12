import {h, render, Component} from 'preact';
import linkRef from 'linkref';
import {Slide, Bubbles, Bubble} from '../../Components';
import styles from  './speech.scss';
import {Speech} from '../../Services';
import Keyboard from '../../Services/Keyboard';

export default class SpeechPage extends Component {
    constructor(...props) {
        super(...props);

        this.KeyboardLeftListener = Keyboard.on('left', this.goToPreviousPage);
        this.KeyboardRightListener = Keyboard.on('right', this.goToNextPage);
    }

    conf = 'Front Trends';
    bubble1 = `Hi ${this.conf}, did you know the browser could talk? Cool huh!`;
    bubble2 = 'The web speech API converts text to spoken words. You can even choose my voice, since I\'m a female cat, I\'ll be talking with a female voice. Meow!';

    goToPreviousPage = () => {
        this.refs.slide.previous();
    }

    goToNextPage = () => {
        this.refs.slide.next();
    }

    componentWillUnmount() {
        Keyboard.off(this.KeyboardLeftListener);
        Keyboard.off(this.KeyboardRightListener);
    }

    speak = bubbleId => {
        switch (bubbleId) {
            case 1:
                Speech.speak(this.bubble1);
                break;
            case 2:
                Speech.speak(this.bubble2);
                break;
        }
    };

    render() {
        return (
            <Slide previous="/" next="speech-code"  ref={linkRef(this, 'slide')}>
                <Bubbles onNextBubble={this.speak}>
                    <Bubble>{this.bubble1}</Bubble>
                    <Bubble>{this.bubble2}</Bubble>
                </Bubbles>
            </Slide>
        );
    }
};
