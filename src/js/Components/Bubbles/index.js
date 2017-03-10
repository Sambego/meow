import {h, render, Component} from 'preact';
import {element, func} from 'proptypes';
import keycode from 'keycode';
import styles from './bubbles.scss';

export default class Bubbles extends Component {
    static propTypes = {
        children: element,
        onNextBubble: func,
    };

    constructor(...props) {
        super(...props);

        this.state = {
            shownBubbles: 1,
        };

        if (typeof this.props.onNextBubble !== 'undefined') {
            this.props.onNextBubble(this.state.shownBubbles);
        }

        window.addEventListener('keyup', this.nextBubbleInstance);
    }

    renderBubbles() {
        return this.props.children.map((child, index) => {
            if (index <= (this.state.shownBubbles - 1)) {
                return child;
            }

            return null;
        });
    };

    nextBubble(event) {
        if (this.state.shownBubbles <= this.props.children.length && keycode(event) === 'up') {
            this.setState({shownBubbles: (this.state.shownBubbles + 1)});

            if (typeof this.props.onNextBubble !== 'undefined') {
                this.props.onNextBubble(this.state.shownBubbles);
            }
        } else {
            window.removeEventListener('keyup', this.nextBubbleInstance);
        }
    };

    nextBubbleInstance = event => this.nextBubble(event);

    render() {
        return (
            <div className={styles.bubbles}>
                {this.renderBubbles()}
            </div>
        );
    }
};
