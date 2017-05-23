import {h, render, Component} from 'preact';
import {AI, Location, Speech} from '../../Services';
import {Battery, Bubble, LocationBubble, Weather, Reminder, HeadTracking, SpeechRecognition, News, Places, Loader} from '../../Components';
import Styles from './poes.scss';

export default class PoesPage extends Component {
    processInput(event) {
        if (event.target.value !== '') {
            this.setState({
                component: AI.getTheme(event.target.value.toLowerCase()),
                command: event.target.value,
            });

            event.target.value = '';
        }
    }

    processSpeechInput(sentence) {
        this.setState({
            component: AI.getTheme(sentence.transcript.toLowerCase()),
            command: sentence.transcript,
            speechRegnitionInProcess: false,
        });
    }

    startSpeech() {
        this.setState({speechRegnitionInProcess: true});
    }

    speakLocation(location) {
        Speech.speak(location);
    }

    speakWeather(weather) {
        Speech.speak(weather);
    }

    renderHelp() {
        return (
            <ul className={Styles.help}>
                <li>Remind me in 1 minute about something important!</li>
                <li>What's my battery status?</li>
                <li>What's the weather for today?</li>
                <li>Where am I?</li>
                <li>What's new on Hacker News?</li>
                <li>Let's do something fun.</li>
            </ul>
        );
    }

    renderComponent() {
        if (!this.state.component) {
            return null;
        }

        if (this.state.component.type === 'hello') {
            Speech.speak('I\'m great, thanks!');

            return <Bubble>I'm great, thanks!</Bubble>;
        } else if (this.state.component.type === 'battery') {
            Speech.speak('Here is your battery information!');

            return <Bubble><Battery /></Bubble>;
        } else if (this.state.component.type === 'location') {
            return <LocationBubble onLocation={::this.speakLocation} />;
        } else if (this.state.component.type === 'weather') {
            return <Weather onWeather={::this.speakWeather} />;
        } else if (this.state.component.type === 'reminder') {
            Speech.speak('I\'ll remind you in a minute!');

            return <Reminder />;
        } else if (this.state.component.type === 'bonus') {
            Speech.speak('Hey look, now you\'re a cat as well!');

            return <Bubble><HeadTracking /></Bubble>;
        } else if (this.state.component.type === 'news') {
            Speech.speak('Here is some fresh news for you!');

            return <News />;
        } else if (this.state.component.type === 'help') {
            Speech.speak('These are the tricks I got up my sleeve!');

            return <Bubble>{this.renderHelp()}</Bubble>;
        }

        Speech.speak('I didn\'t understand that, maybe try one of the following commands');

        return (
            <Bubble>
                I didn't understand that, maybe try one of the following commands:
                {this.renderHelp()}
            </Bubble>
        );
    }

    render() {
        return (
            <div className={Styles.poes}>
                {::this.renderComponent()}
                {this.state.command || this.state.speechRegnitionInProcess ? <Bubble me>{this.state.speechRegnitionInProcess ? <Loader /> : this.state.command}</Bubble> : null}
                <footer className={Styles.footer}>
                    <input type="text" onChange={::this.processInput} className={Styles.input}/>
                    <SpeechRecognition onSpeechRecognitionStart={::this.startSpeech} onSpeechRecognized={::this.processSpeechInput} small></SpeechRecognition>
                </footer>
            </div>
        );
    }
};
