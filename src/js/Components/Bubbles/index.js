import {h, render, Component} from 'preact';
import {element} from 'proptypes';
import styles from './bubbles.scss';

export default class Bubbles extends Component {
    static propTypes = {
        children: element,
    };

    componentWillMount() {
        this.reset();
    }

    renderBubbles() {
        return this.props.children.map((child, index) => {
            if (index <= (this.state.shownBubbles - 1)) {
                return child;
            }

            return null;
        });
    };

    previousBubble() {
        this.setState({shownBubbles: (this.state.shownBubbles - 1)});
    }

    nextBubble() {
        this.setState({shownBubbles: (this.state.shownBubbles + 1)});
    }

    firstBubbleIsShown() {
        return this.state.shownBubbles === 1;
    }

    lastBubbleIsShown() {
        return this.state.shownBubbles === this.props.children.length;
    }

    reset() {
        this.setState({
            shownBubbles: 1,
        });
    }

    render() {
        return (
            <div className={styles.bubbles}>
                {this.renderBubbles()}
            </div>
        );
    }
};
