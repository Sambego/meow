import {h, render, Component} from 'preact';
import linkRef from 'linkref';
import {Slide, Bubbles, Bubble} from '../../Components';
import {Speech} from '../../Services';
import Keyboard from '../../Services/Keyboard';

export default class SpeechecognitionPage extends Component {
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
            <Slide previous="/speech-code" next="speech-recognition-code" ref={linkRef(this, 'slide')}>
                <Bubbles ref={linkRef(this, 'bubbles')} >
                    <Bubble>Speech recognition is cool</Bubble>
                </Bubbles>
            </Slide>
        );
    }
};
