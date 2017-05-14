import {h, render, Component} from 'preact';
import {element, boolean, func, isRequired} from 'proptypes';
import classnames from 'classnames';
import styles from './bubble.scss';

export default class Bubble extends Component {
    static propTypes = {
        children: element.isRequired,
        full: boolean,
        hidden: boolean,
        me: boolean,
        onShow: func,
        onHide: func,
    };

    static defaultProps = {
        hidden: false,
        me: false,
    };

    componentWillMount() {
        if (this.props.onShow) {
            this.props.onShow();
        }
    }

    componentWillUnmount() {
        if (this.props.onHide) {
            this.props.onHide();
        }
    }

    render() {
        const classes = classnames(styles.bubble, {
            [styles['bubble--me']]: this.props.me,
            [styles['bubble--full']]: this.props.full,
            [styles['bubble--hidden']]: this.props.hidden,
        });

        return (
            <div className={classes}>
                {this.props.children}
            </div>
        );
    }
};
