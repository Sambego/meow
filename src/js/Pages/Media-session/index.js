import { h, render, Component } from 'preact';
import { BubbleSlide, Bubble } from '../../Components';
import Config from '../../Config';
import Poes from '../../../icons/favicon.png';
import Sound from '../../../sound/bensound-memories.mp3';

export default class MediaSessionPage extends Component {
    constructor(args) {
        super(args);

        if (navigator.mediaSession) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: 'Close your eyes and meow to fluff',
                artist: 'Meow the jewels',
                album: 'Meow the jewels',
                artwork: [{ src: 'Poes', sizes: '96x96', type: 'image/png' }],
            });
        }
    }

    renderSlide() {
        return (
            <BubbleSlide previous="/media-session" next="/media-session-code">
                <Bubble>
                    Hey Sam, have you ever tried controlling some media on a
                    webpage?
                </Bubble>
                <Bubble>
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
