import { h, render, Component } from 'preact';
import { BubbleSlide, Bubble } from '../../Components';
import Config from '../../Config';
import Poes from '../../../icons/favicon.png';

export default class MediaSessionPage extends Component {
    constructor(args) {
        super(args);

        this.state = {
            mediaState: 'playing',
        };

        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: 'Close your eyes and meow to fluff',
                artist: 'Meow the jewels',
                album: 'Meow the jewels',
                artwork: [{ src: 'Poes', sizes: '96x96', type: 'image/png' }],
            });

            navigator.mediaSession.setActionHandler(
                'play',
                this.setState({ mediaState: 'playing' })
            );
            navigator.mediaSession.setActionHandler(
                'pause',
                this.setState({ mediaState: 'paused' })
            );
            navigator.mediaSession.setActionHandler(
                'previoustrack',
                this.setState({ mediaState: 'next' })
            );
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
                    The state of the media on this page is;{' '}
                    {this.state.mediaState}!
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
        if (!('mediaSession' in navigator)) {
            return this.renderNoSupportMessage();
        }

        return this.renderSlide();
    }
}
