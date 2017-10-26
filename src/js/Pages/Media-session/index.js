import { h, render, Component } from 'preact';
import { BubbleSlide, Bubble } from '../../Components';
import Config from '../../Config';
import Image1 from '../../../img/mediasession-1.png';
import Image2 from '../../../img/mediasession-2.png';

export default class MediaSessionPage extends Component {
    render() {
        return (
            <BubbleSlide previous="/media-session" next="/media-session-code">
                <Bubble>
                    Hey Sam, have you ever noticed how Chrome on Android adds
                    playback controlls to the notification tray when playing
                    some audio or video on a website?
                </Bubble>
                <Bubble>
                    <img
                        style={{ width: '100%' }}
                        src={Image1}
                        alt="Preview of the audio player in the notification tray of an Android phone."
                    />
                </Bubble>
                <Bubble>
                    That's cool, did you know you can customize the metadata and
                    add some more controlls?
                </Bubble>
                <Bubble>
                    <img
                        style={{ width: '100%' }}
                        src={Image2}
                        alt="Preview of the audio player in the notification tray of an Android phone with extra meta data."
                    />
                </Bubble>
            </BubbleSlide>
        );
    }
}
