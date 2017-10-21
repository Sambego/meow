import { h, render, Component } from 'preact';
import { BubbleSlide } from '../../Components';

export default class OfflineTitlePage extends Component {
    render() {
        return (
            <BubbleSlide previous="/media-session-code" next="/future">
                <h1>Offline</h1>
            </BubbleSlide>
        );
    }
}
