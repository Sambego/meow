import {h, render, Component} from 'preact';
import {element, boolean, func, isRequired} from 'proptypes';
import classnames from 'classnames';
import styles from './bubble.scss';

export default class Bubble extends Component {
    static propTypes = {
        children: element.isRequired,
        full: boolean,
        me: boolean,
        onShow: func.isRequired,
    };

    static defaultProps = {
        me: false,
    };

    componentWillMount() {
        if (this.props.onShow) {
            this.props.onShow();
        }
    }

    render() {
        const classes = classnames(styles.bubble, {
            [styles['bubble--me']]: this.props.me,
            [styles['bubble--full']]: this.props.full,
        });

        return (
            <div className={classes}>
                {this.props.children}
            </div>
        );
    }
};
