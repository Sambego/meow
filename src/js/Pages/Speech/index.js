import {h, render} from 'preact';
import {BubbleSlide, Bubble} from '../../Components';
import {Speech} from '../../Services';

const SpeechPage = () => {
    const conf = 'Front Trends';
    const bubble1 = `Hi ${conf}, did you know the browser could talk? Cool huh!`;
    const bubble2 = 'The web speech API converts text to spoken words. You can even choose my voice, since I\'m a female cat, I\'ll be talking with a female voice. Meow!';

    const speakBubble1 = () => {
        Speech.speak(bubble1);
    };

    const speakBubble2 = () => {
        Speech.speak(bubble2);
    };

    return (
        <BubbleSlide previous="/" next="speech-code" >
            <Bubble onShow={speakBubble1}>{bubble1}</Bubble>
            <Bubble onShow={speakBubble2}>{bubble2}</Bubble>
        </BubbleSlide>
    );
};

SpeechPage.propTypes = {};

export default SpeechPage;
