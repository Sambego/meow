import {h, render} from 'preact';
import {func, isRequired} from 'proptypes';
import styles from './speech-recognition.scss';
import {Icon} from '../../Components';
import {Speech} from '../../Services';

const SpeechRecognition = ({onSpeechRecognitionStart, onSpeechRecognized}) => {
    const startSpeechRecognition = () => {
        onSpeechRecognitionStart();

        Speech.recognize()
            .then(result => onSpeechRecognized(result));
    };

    return (
        <button className={styles['speech-recognition']} onClick={startSpeechRecognition}>
            <Icon name="micropone" color="white"/>
        </button>
    );
};

SpeechRecognition.propTypes = {
    onSpeechRecognitionStart: func.isRequired,
    onSpeechRecognized: func.isRequired,
};

export default SpeechRecognition;
