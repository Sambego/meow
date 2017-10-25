import { h, render, Component } from 'preact';
import { BubbleSlide, Bubble } from '../../Components';
import Config from '../../Config';
import Image1 from '../../../img/mediasession-1.png';

export default class SharePage extends Component {
    share() {
        if (navigator.share) {
            navigator.share({
                title: 'The share API is cool!',
                text: 'The share API is cool!',
                url: 'https://meow.sambego.be',
            });
        }
    }
    render() {
        return (
            <BubbleSlide previous="/share" next="/offline">
                <Bubble onShow={this.share}>
                    Wouldn't it be nice to use the native share tray when
                    sharing a page on a mobile device?
                </Bubble>
                <Bubble>
                    <img
                        style={{ width: '100%' }}
                        src={Image1}
                        alt="Preview of the audio player in the notification tray of an Android phone."
                    />
                </Bubble>
            </BubbleSlide>
        );
    }
}
