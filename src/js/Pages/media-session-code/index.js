import { h, render, Component } from 'preact';
import { BubbleSlide, Bubble, Code } from '../../Components';

export default class MediaSessionCode extends Component {
    codeExample1 = 'navigator.mediaSession.metadata = new MediaMetadata({\n    title: \'Close your eyes and meow to fluff\',\n    artist: \'Meow the jewels\',\n    album: \'Meow the jewels\',\n    artwork: [{ src: \'Poes\', sizes: \'96x96\', type: \'image/png\' }],\n});';

    render() {
        return (
            <BubbleSlide previous="/media-session-example" next="/bonus">
                <Bubble>Controlling some media is not that difficult.</Bubble>
                <Bubble>
                    Let's start by creating a new media metadata object>
                </Bubble>
                <Bubble>
                    <Code code={this.codeExample1} />
                </Bubble>
                <Bubble>
                    Now we can start listening to user actions, for example
                    pausing the media.
                </Bubble>
            </BubbleSlide>
        );
    }
}
