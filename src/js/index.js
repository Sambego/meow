import '../scss/styles.scss';

import {h, render} from 'preact';
import Router from 'preact-router';
import {Container, Footer} from './Components';
import {
    StartPage,
    AboutPage,
    SpeechTitlePage,
    SpeechPage,
    SpeechCodePage,
    SpeechRecognitionTitlePage,
    SpeechRecognitionPage,
    SpeechRecognitionCodePage,
    LocationTitlePage,
    LocationPage,
    LocationCodePage,
    NotificationTitlePage,
    NotificationPage,
    NotificationPushTitlePage,
    NotificationPushPage,
    NotificationPushCodePage,
    BatteryTitlePage,
    BatteryPage,
    BatteryCodePage,
    MediaRecorderTitlePage,
    MediaRecorderPage,
    MediaRecorderCodePage,
    AudioTitlePage,
    AudioPage,
    AudioCodePage,
    VibrationTitlePage,
    VibrationPage,
    VibrationCodePage,
    HeadTrackingBonusPage,
    HeadTrackingPage,
    AcknowledgementPage,
    ThanksPage,
    PoesPage,
} from './Pages';

render((
    <div>
        <Container>
            <Router>
                <StartPage default path="/" />
                <AboutPage path="/about" />
                <SpeechTitlePage path="/speech" />
                <SpeechPage path="/speech-example" />
                <SpeechCodePage path="/speech-code" />
                <SpeechRecognitionTitlePage path="/speech-recognition" />
                <SpeechRecognitionPage path="/speech-recognition-example" />
                <SpeechRecognitionCodePage path="/speech-recognition-code" />
                <LocationTitlePage path="/location" />
                <LocationPage path="/location-example" />
                <LocationCodePage path="/location-code" />
                <NotificationTitlePage path="/notifications" />
                <NotificationPage path="/notifications-example" />
                <NotificationPushTitlePage path="/notifications-push" />
                <NotificationPushPage path="/notifications-push-example" />
                <NotificationPushCodePage path="/notifications-push-code" />
                <BatteryTitlePage path="/battery" />
                <BatteryPage path="/battery-example" />
                <BatteryCodePage path="/battery-code" />
                <MediaRecorderTitlePage path="/media-recoder" />
                <MediaRecorderPage path="/media-recoder-example" />
                <MediaRecorderCodePage path="/media-recoder-code" />
                <AudioTitlePage path="/audio" />
                <AudioPage path="/audio-example" />
                <AudioCodePage path="/audio-code" />
                <VibrationTitlePage path="/vibration" />
                <VibrationPage path="/vibration-example" />
                <VibrationCodePage path="/vibration-code" />
                <HeadTrackingBonusPage path="/bonus" />
                <HeadTrackingPage path="/head-tracking" />
                <AcknowledgementPage path="/acknowledgements" />
                <ThanksPage path="/thanks" />
                <PoesPage path="/poes" />
            </Router>
        </Container>

        <Footer />
    </div>
), document.body);
