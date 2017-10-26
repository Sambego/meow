import { h, render, Component } from 'preact';
import { BubbleSlide, Bubble, Code } from '../../Components';

export default class AudioCodePage extends Component {
    codeExample1 = 'const ac = new AudioContext();';
    codeExample2 = 'const oscillator = ac.createOscillator();';
    codeExample3 = 'oscillator.frequency.value = 440;\noscillator.type = \'sine\';\noscillator.start();';
    codeExample4 = 'oscillator.connect(ac.destination);';
    codeExample5 = 'console.log(ac.currentTime);';
    codeExample6 = '// Start the oscillator now\noscillator.start(ac.currentTime)\n\n// Stop the oscillator in 2 seconds\noscillator.stop(ac.currentTime + 2)';
    codeExample7 = 'const ac = new AudioContext();\n\nconst oscillator = ac.createOscillator();\noscillator.frequency.value = 440;\noscillator.type = \'sine\';\noscillator.start();\n\noscillator.connect(ac.destination);';

    render() {
        return (
            <BubbleSlide previous="/audio-example" next="/vibration">
                <Bubble>
                    Here are the basics of creating sounds with the web-audio
                    api. We first need to create a new audio context.
                </Bubble>
                <Bubble full>
                    <Code code={this.codeExample1} />
                </Bubble>
                <Bubble>
                    Once we have an audio context we can create an oscillator,
                    which will generate a tone for us.
                </Bubble>
                <Bubble full>
                    <Code code={this.codeExample2} />
                </Bubble>
                <Bubble>
                    We can adjust the frequency and type of our oscillator, and
                    start it.
                </Bubble>
                <Bubble full>
                    <Code code={this.codeExample3} />
                </Bubble>
                <Bubble>
                    The oscillator will not be audible until you connect it to
                    the destination of the audio context.
                </Bubble>
                <Bubble full>
                    <Code code={this.codeExample4} />
                </Bubble>
                <Bubble>
                    An audio context has a built in clock, you can access it to
                    schedule sounds.
                </Bubble>
                <Bubble full>
                    <Code code={this.codeExample5} />
                </Bubble>
                <Bubble>
                    By using this clock, you can schedule changes, for example
                    start and stop an oscillator on a certain timestamp.
                </Bubble>
                <Bubble full>
                    <Code code={this.codeExample6} />
                </Bubble>
                <Bubble>So let's put this all together.</Bubble>
                <Bubble full>
                    <Code code={this.codeExample7} />
                </Bubble>
            </BubbleSlide>
        );
    }
}
