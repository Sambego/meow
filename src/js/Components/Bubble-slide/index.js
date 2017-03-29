import {h, render, Component} from 'preact';
import linkRef from 'linkref';
import {Slide, Bubbles, Icon} from '../../Components';
import {Keyboard} from '../../Services';
import styles from './bubble-slide.scss';

export default class BubbleSlide extends Component {
    goToPreviousPage() {
        this.refs.slide.previous();
    }

    goToNextPage() {
        this.refs.slide.next();
    }

    getPreviousAction() {
        if (!this.refs.bubbles.firstBubbleIsShown()) {
            return this.refs.bubbles.previousBubble();
        }

        return this.goToPreviousPage();
    }

    getNextAction() {
        if (!this.refs.bubbles.lastBubbleIsShown()) {
            return this.refs.bubbles.nextBubble();
        }

        return this.goToNextPage();
    }

    resetBubbles() {
        this.refs.bubbles.reset();
    }

    scroll() {
        this.refs.slide.base.scrollTop = (this.refs.slide.base.scrollHeight - this.refs.slide.base.clientHeight);
    }

    componentWillMount() {
        this.KeyboardLeftListener = Keyboard.on('left', () => this.getPreviousAction());
        this.KeyboardRightListener = Keyboard.on('right', () => this.getNextAction());
        this.KeyboardUpListener = Keyboard.on('page up', () => this.getPreviousAction());
        this.KeyboardDownListener = Keyboard.on('page down', () => this.getNextAction());
    }

    componentWillUnmount() {
        this.resetBubbles();

        Keyboard.off(this.KeyboardLeftListener);
        Keyboard.off(this.KeyboardRightListener);
        Keyboard.off(this.KeyboardUpListener);
        Keyboard.off(this.KeyboardDownListener);
    }

    render() {
        return (
            <Slide previous={this.props.previous} next={this.props.next} ref={linkRef(this, 'slide')}>
                <Bubbles ref={linkRef(this, 'bubbles')} onUpdate={::this.scroll}>
                    {this.props.children}
                </Bubbles>

                <nav className={styles['bubble-nav']}>
                    <button className={styles['bubble-nav__prev']} onClick={::this.getPreviousAction}><Icon name="caret-left" color="#66B7F9" size="small"/></button>
                    <button className={styles['bubble-nav__next']} onClick={::this.getNextAction}><Icon name="caret-right" color="#66B7F9" size="small" /></button>
                </nav>
            </Slide>
        );
    }
};
