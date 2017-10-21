import { h, render, Component } from 'preact';
import { BubbleSlide } from '../../Components';

export default class MediaSessionTitlePage extends Component {
    render() {
        return (
            <BubbleSlide
                previous="/device-orientation-code"
                next="/media-session-example"
            >
                <h1>Media Session API</h1>
            </BubbleSlide>
        );
    }
}
