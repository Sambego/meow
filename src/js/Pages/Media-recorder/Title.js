import {h, render, Component} from 'preact';
import {BubbleSlide} from '../../Components';

export default class MediaRecorderTitlePage extends Component {
    render() {
        return (
            <BubbleSlide previous="/battery-example" next="/media-recorder-example">
                <h1>Media Recorder API</h1>
            </BubbleSlide>
        );
    }
};
