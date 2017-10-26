import { h, render, Component } from 'preact';
import linkRef from 'linkref';
import FrequencyCalculator from 'frequency-calculator';
import {
    BubbleSlide,
    BubbleCollection,
    Bubble,
    Battery,
    Loader,
} from '../../Components';
import Config from '../../Config';
import Composer from '../../Services/Composer.js';

export default class AudioPage extends Component {
    constructor(...args) {
        super(...args);

        this.audioContext = new AudioContext();
    }

    playNote() {
        this.oscillator = this.audioContext.createOscillator();
        this.oscillator.frequency.value = FrequencyCalculator.calculateFrequencyByNote(
            'C',
            4
        );
        this.oscillator.start();

        this.gain = this.audioContext.createGain();
        this.gain.gain.setValueAtTime(0, this.audioContext.currentTime);
        this.gain.gain.linearRampToValueAtTime(
            1,
            this.audioContext.currentTime + 2
        );
        this.gain.gain.linearRampToValueAtTime(
            0,
            this.audioContext.currentTime + 3
        );

        this.oscillator.connect(this.gain);
        this.gain.connect(this.audioContext.destination);

        this.oscillator.stop(4);
    }

    playScale() {
        const composer = new Composer(this.audioContext);
        composer.add(2, FrequencyCalculator.calculateFrequencyByNote('C', 4));
        composer.add(2, FrequencyCalculator.calculateFrequencyByNote('D', 4));
        composer.add(2, FrequencyCalculator.calculateFrequencyByNote('E', 4));
        composer.add(2, FrequencyCalculator.calculateFrequencyByNote('F', 4));
        composer.add(2, FrequencyCalculator.calculateFrequencyByNote('G', 4));
        composer.add(2, FrequencyCalculator.calculateFrequencyByNote('A', 4));
        composer.add(2, FrequencyCalculator.calculateFrequencyByNote('B', 4));
        composer.add(2, FrequencyCalculator.calculateFrequencyByNote('C', 5));
        composer.play();
    }

    playSong() {
        const composer = new Composer(this.audioContext);
        composer.add(4, FrequencyCalculator.calculateFrequencyByNote('E', 5));
        composer.add(
            8,
            FrequencyCalculator.calculateFrequencyByNote('Dsharp', 5)
        );
        composer.add(4, FrequencyCalculator.calculateFrequencyByNote('E', 5));
        composer.add(
            8,
            FrequencyCalculator.calculateFrequencyByNote('Dsharp', 5)
        );
        composer.add(4, FrequencyCalculator.calculateFrequencyByNote('E', 5));
        composer.add(4, FrequencyCalculator.calculateFrequencyByNote('B', 4));
        composer.add(4, FrequencyCalculator.calculateFrequencyByNote('D', 5));
        composer.add(4, FrequencyCalculator.calculateFrequencyByNote('C', 5));
        composer.add(2, FrequencyCalculator.calculateFrequencyByNote('A', 4));
        composer.add(4, 0, true);
        composer.add(4, FrequencyCalculator.calculateFrequencyByNote('C', 3));
        composer.add(4, FrequencyCalculator.calculateFrequencyByNote('E', 3));
        composer.add(4, FrequencyCalculator.calculateFrequencyByNote('A', 4));
        composer.add(2, FrequencyCalculator.calculateFrequencyByNote('B', 4));
        composer.add(4, 0, true);
        composer.add(4, FrequencyCalculator.calculateFrequencyByNote('E', 3));
        composer.add(
            4,
            FrequencyCalculator.calculateFrequencyByNote('Gsharp', 3)
        );
        composer.add(4, FrequencyCalculator.calculateFrequencyByNote('B', 4));
        composer.add(2, FrequencyCalculator.calculateFrequencyByNote('C', 5));
        composer.play();
    }

    renderSlide() {
        return (
            <BubbleSlide
                previous="/audio"
                next="/audio-code"
                ref={linkRef(this, 'bubbleSlide')}
            >
                <Bubble>
                    Hey Sam, you're a music lover right? Did you know you can
                    create music in the browser?
                </Bubble>
                <Bubble onShow={::this.playNote}>
                    Listen to this cool tone. Doesn't it remind you of a horn of
                    a ship in the distance?
                </Bubble>
                <Bubble>
                    You can also create multiple tones and combine them
                    together.
                </Bubble>
                <Bubble onShow={::this.playScale}>
                    Here is a scale from C4 to C5, or DO to DO. Cool huh!
                </Bubble>
                <Bubble onShow={::this.playSong}>
                    And this is a song you might know. I wrote it for a tomcat I
                    have a crush on, true story!
                </Bubble>
                <Bubble>
                    I'm on my way to become the next {Config.composer}!
                </Bubble>
            </BubbleSlide>
        );
    }

    renderNoSupportMessage() {
        return (
            <BubbleSlide previous="/audio" next="/audio-code">
                <Bubble>
                    Unfortunately your browser does not support the{' '}
                    <strong>web-audio API</strong>, try using another browser to
                    see this example, or continue the presentation.
                </Bubble>
            </BubbleSlide>
        );
    }

    render() {
        if (!('AudioContext' in window)) {
            return this.renderNoSupportMessage();
        }

        return this.renderSlide();
    }
}
