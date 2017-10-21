import { h, render, Component } from 'preact';
import { BubbleSlide, Bubble, Code } from '../../Components';

export default class MediaSessionCode extends Component {
    codeExample1 = 'navigator.mediaSession.metadata = new MediaMetadata({\n    title: \'Close your eyes and meow to fluff\',\n    artist: \'Meow the jewels\',\n    album: \'Meow the jewels\',\n    artwork: [{ src: \'Poes\', sizes: \'96x96\', type: \'image/png\' }],\n});';
    codeExample2 = 'navigator.mediaSession.setActionHandler(\'pause\', () = {\n    // Do something cool, or just pause the track.\n});';

    render() {
        return (
            <BubbleSlide previous="/media-session-example" next="/offline">
                <Bubble>Adding this metadata is not difficult.</Bubble>
                <Bubble>
                    Let's start by creating a new media metadata object.
                </Bubble>
                <Bubble>
                    <Code code={this.codeExample1} />
                </Bubble>
                <Bubble>
                    You can also listen for some user interaction with the
                    action buttons.
                </Bubble>
                <Bubble>
                    <Code code={this.codeExample2} />
                </Bubble>
            </BubbleSlide>
        );
    }
}
