import {h, render, Component} from 'preact';
import {Slide, Bubbles, Bubble} from '../../Components';
import styles from  './speech.scss';
import {Speech} from '../../Services';

const SpeechPage = ({children}) => {
    const conf = 'Front Trends';
    const bubble1 = `Hi ${conf}, did you know the browser could talk? Cool huh!`;
    const bubble2 = 'The web speech API converts text to spoken words. You can even choose my voice, since I’m a female cat, I’ll be talking with a female voice. Meow!';

    const speak = bubbleId => {
        switch (bubbleId) {
            case 1:
                Speech.speak(bubble1);
                break;
            case 2:
                Speech.speak(bubble2);
                break;
        }
    };

    return (
        <Slide previous="/" next="speech-code">
            <Bubbles onNextBubble={speak}>
                <Bubble>{bubble1}</Bubble>
                <Bubble>{bubble2}</Bubble>
            </Bubbles>
        </Slide>
    );
};

SpeechPage.propTypes = {};

export default SpeechPage;
