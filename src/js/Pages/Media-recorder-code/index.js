import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble, Code} from '../../Components';

export default class MediaRecorderCodePage extends Component {
    render() {
        return (
            <BubbleSlide previous="/media-recorder-example" next="/head-tracking">
                <Bubble>code</Bubble>
            </BubbleSlide>
        );
    }
};
