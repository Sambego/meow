import {h, render} from 'preact';
import {func, bool} from 'proptypes';
import classnames from 'classnames';
import styles from './speech-recognition.scss';
import {Icon} from '../../Components';
import {Speech} from '../../Services';

const SpeechRecognition = ({onSpeechRecognitionStart, onSpeechRecognized, small}) => {
    const startSpeechRecognition = () => {
        if (onSpeechRecognitionStart) {
            onSpeechRecognitionStart();
        }

        Speech.recognize()
            .then(result => onSpeechRecognized(result))
            .catch(error => console.error(error));
    };

    const classes = classnames({
        [styles['speech-recognition__small']]: small,
    }, styles['speech-recognition']);

    return (
        <button className={classes} onClick={startSpeechRecognition}>
            <Icon name="micropone" color="white"/>
        </button>
    );
};

SpeechRecognition.propTypes = {
    onSpeechRecognitionStart: func.isRequired,
    onSpeechRecognized: func.isRequired,
    small: bool,
};

export default SpeechRecognition;
