import {h, render, Component} from 'preact';
import {element, string} from 'proptypes';
import styles from './notification.scss';
import Icon from '../../../favicon/apple-icon-180x180.png';

export default class NotificationElement extends Component  {
    static propTypes = {
        message: string,
    };

    componentWillMount() {
        Notification.requestPermission(permission => {
            if (permission === 'granted') {
                const notification = new Notification('Incomming message from Poes', {
                    body: this.props.message,
                    icon: Icon,
                });
            }
        });
    }
};
