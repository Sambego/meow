import { h, render, Component } from 'preact';
import { element, boolean, func, isRequired } from 'proptypes';
import classnames from 'classnames';
import styles from './bubble.scss';

export default class Bubble extends Component {
    static propTypes = {
        children: element.isRequired,
        full: boolean,
        hidden: boolean,
        me: boolean,
        noContainer: boolean,
        onShow: func,
        onHide: func,
    };

    static defaultProps = {
        hidden: false,
        me: false,
    };

    constructor(...args) {
        super(...args);

        this.state = {
            in: false,
        };
    }

    componentWillMount() {
        if (this.props.onShow) {
            this.props.onShow();
        }
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            this.setState({
                in: true,
            });
        });
    }

    componentWillUnmount() {
        if (this.props.onHide) {
            this.props.onHide();
        }
    }

    render() {
        const classes = classnames(styles.bubble, styles['bubble-animation'], {
            [styles['bubble--me']]: this.props.me,
            [styles['bubble--full']]: this.props.full,
            [styles['bubble--hidden']]: this.props.hidden,
            [styles['bubble-animation--active']]: this.state.in,
        });

        return (
            <div>
                {this.props.noContainer
                    ? <div className={classes}>
                          {this.props.children}
                      </div>
                    : <div className={styles['bubble-container']}>
                          <div className={classes}>
                              {this.props.children}
                          </div>
                      </div>}
            </div>
        );
    }
}
