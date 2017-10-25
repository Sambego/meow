import { h, render, Component } from 'preact';
import { BubbleSlide } from '../../Components';

export default class ShareTitlePage extends Component {
    render() {
        return (
            <BubbleSlide previous="/media-session-code" next="/share-example">
                <h1>Web share API</h1>
            </BubbleSlide>
        );
    }
}
