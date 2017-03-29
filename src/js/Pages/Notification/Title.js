import {h, render, Component} from 'preact';
import {BubbleSlide} from '../../Components';

export default class NotificationTitlePage extends Component {
    render() {
        return (
            <BubbleSlide previous="/location-code" next="/notifications-example">
                <h1>Notifications API</h1>
            </BubbleSlide>
        );
    }
};
