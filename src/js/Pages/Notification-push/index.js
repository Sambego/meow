import {h, render, Component} from 'preact';
import linkRef from 'linkref';
import {Push} from '../../Services';
import {BubbleSlide, Bubble, BubbleCollection, Button} from '../../Components';
import Icon from '../../../icons/favicon.png';

export default class NotificationPushPage extends Component {
    constructor(...props) {
        super(...props);

        this.pushManager = new Push();
        this.pushManager.requestPermission();
        this.pushManager.onMessage(message => {
            Notification.requestPermission(permission => {
                if (permission === 'granted') {
                    const notification = new Notification('Incomming push message from Poes.', {
                        body: message.data.message,
                        icon: Icon,
                    });
                }
            });
        });
    }

    sendPushMessage(message) {
        this.pushManager.sendPushMessage(message);
    }

    render() {
        return (
            <BubbleSlide previous="notification" next="notification-push-code">
                <BubbleCollection>
                    <Bubble>It is also possible to receive push notifications from a push server.</Bubble>
                    <Button onClick={() => ::this.sendPushMessage('This message is comming from a remote push server. Cool huh?!')}>Send push notification</Button>
                </BubbleCollection>
                <Bubble>So what's the difference with regular notifications?</Bubble>
                <Bubble>This message is came from a remote push server, letting us know something happend. I just show the notification to warn you about this event.</Bubble>
                <Bubble>What's even cooler is that the current window can be closed and I will still show you a notification! Go ahead, close the window and I will show you!</Bubble>
            </BubbleSlide>
        );
    }
};
