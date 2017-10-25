import { h, render, Component } from 'preact';
import { BubbleSlide, Bubble } from '../../Components';
import Config from '../../Config';
import IconRobot from '../../../icons/favicon-robot.png';
import Sound from '../../../sound/bensound-memories.mp3';

export default class MediaSessionPage extends Component {
    setSessionInfo() {
        if (navigator.mediaSession) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: 'The Moon',
                artist: 'Cat Power',
                album: 'The greatest',
                artwork: [{ src: 'Poes', sizes: '96x96', type: 'image/png' }],
            });

            navigator.mediaSession.setActionHandler('play', () =>
                console.log('play')
            );
            navigator.mediaSession.setActionHandler('pause', () =>
                console.log('pause')
            );
            navigator.mediaSession.setActionHandler('seekbackward', () =>
                console.log('seek backward')
            );
            navigator.mediaSession.setActionHandler('seekforward', () =>
                console.log('seek forward')
            );
            navigator.mediaSession.setActionHandler('previoustrack', () =>
                console.log('previous track')
            );
            navigator.mediaSession.setActionHandler('nexttrack', () =>
                console.log('next track')
            );
        }
    }

    renderSlide() {
        return (
            <BubbleSlide previous="/media-session" next="/media-session-code">
                <Bubble>
                    Hey Sam, have you ever noticed how Chrome on Androind adds
                    playback controlls to the notification tray when playing
                    some audio or video on a website?
                </Bubble>
                <Bubble>
                    <audio controls>
                        <source src={Sound} type="audio/mp3" />
                    </audio>
                </Bubble>
                <Bubble>
                    That's cool, did you know you can customize the metadata and
                    add some more controlls?
                </Bubble>
                <Bubble onShow={this.setSessionInfo}>
                    <audio controls>
                        <source src={Sound} type="audio/mp3" />
                    </audio>
                </Bubble>
            </BubbleSlide>
        );
    }

    renderNoSupportMessage() {
        return (
            <BubbleSlide previous="/media-session" next="/media-session-code">
                <Bubble>
                    Unfortunately your browser does not support the{' '}
                    <strong>media session API</strong>, try using another
                    browser to see this example, or continue the presentation.
                </Bubble>
                <Bubble>
                    Open this url on an android phone to try it out:
                    <a
                        href="https://meow.sambego.be/media-session-example"
                        title="Open this link on an Android phone."
                    >
                        https://meow.sambego.be/media-session-example
                    </a>.
                </Bubble>
            </BubbleSlide>
        );
    }

    render() {
        // if (!('mediaSession' in navigator)) {
        //     return this.renderNoSupportMessage();
        // }

        return this.renderSlide();
    }
}
