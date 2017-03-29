import {h, render, Component} from 'preact';
import {BubbleSlide} from '../../Components';

export default class NotificationPushTitlePage extends Component {
    render() {
        return (
            <BubbleSlide previous="/notifications-code" next="/notifications-push-example">
                <h1>Push API</h1>
            </BubbleSlide>
        );
    }
};
