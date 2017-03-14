import {h, render, Component} from 'preact';
import {element, string} from 'proptypes';
import styles from './notification.scss';
import Icon from '../../../icons/favicon.png';

export default class NotificationElement extends Component  {
    static propTypes = {
        icon: string,
        title: string,
        message: string,
    };

    static defaultProps = {
        icon: Icon,
        title: 'Incomming message from Poes',
    };

    componentWillMount() {
        Notification.requestPermission(permission => {
            if (permission === 'granted') {
                const notification = new Notification(this.props.title, {
                    body: this.props.message,
                    icon: this.props.icon,
                });
            }
        });
    }
};
