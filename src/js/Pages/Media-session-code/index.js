import { h, render, Component } from 'preact';
import { BubbleSlide, Bubble, Code } from '../../Components';

export default class MediaSessionCode extends Component {
    codeExample1 = 'navigator.mediaSession.metadata = new MediaMetadata({\n    title: \'Close your eyes and meow to fluff\',\n    artist: \'Meow the jewels\',\n    album: \'Meow the jewels\',\n    artwork: [{ src: \'Poes\', sizes: \'96x96\', type: \'image/png\' }],\n});';
    codeExample2 = 'navigator.mediaSession.setActionHandler(\'pause\', () = {\n    // Do something cool, or just pause the track.\n});';
    codeExample3 = 'navigator.mediaSession.setActionHandler(\'play\', () => true);\nnavigator.mediaSession.setActionHandler(\'seekbackward\', () => true);\nnavigator.mediaSession.setActionHandler(\'seekforward\', () => true);\nnavigator.mediaSession.setActionHandler(\'previoustrack\', () => true);\nnavigator.mediaSession.setActionHandler(\'nexttrack\', () => true);';

    render() {
        return (
            <BubbleSlide previous="/media-session-example" next="/share">
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
                <Bubble>Here are some other buttons you can add.</Bubble>
                <Bubble>
                    <Code code={this.codeExample3} />
                </Bubble>
            </BubbleSlide>
        );
    }
}
