import '../scss/styles.scss';

import {h, render} from 'preact';
import Router from 'preact-router';
import {Container, Footer} from './Components';
import {
    StartPage,
    SpeechPage,
    SpeechCodePage,
    SpeechRecognitionPage,
    SpeechRecognitionCodePage,
    LocationPage,
    LocationCodePage,
    NotificationPage,
    NotificationPushPage,
    NotificationPushCodePage,
    BatteryPage,
    AcknowledgementPage,
    ThanksPage,
} from './Pages';

render((
    <div>
        <Container>
            <Router>
                <StartPage path="/" />
                <SpeechPage path="/speech" />
                <SpeechCodePage path="/speech-code" />
                <SpeechRecognitionPage path="/speech-recognition" />
                <SpeechRecognitionCodePage path="/speech-recognition-code" />
                <LocationPage path="/location" />
                <LocationCodePage path="/location-code" />
                <NotificationPage path="/notification" />
                <NotificationPushPage path="/notification-push" />
                <NotificationPushCodePage path="/notification-push-code" />
                <BatteryPage path="/battery" />
                <AcknowledgementPage path="/acknowledgements" />
                <ThanksPage path="/thanks" />
            </Router>
        </Container>

        <Footer />
    </div>
), document.body);
