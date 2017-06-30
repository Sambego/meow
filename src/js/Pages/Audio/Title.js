import {h, render, Component} from 'preact';
import {BubbleSlide} from '../../Components';

export default class AudioTitlePage extends Component {
    render() {
        return (
            <BubbleSlide previous="/media-recoder-code" next="/audio-example">
                <h1>Web-audio API</h1>
            </BubbleSlide>
        );
    }
};
