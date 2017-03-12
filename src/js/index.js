import '../scss/styles.scss';

import {h, render} from 'preact';
import Router from 'preact-router';
import {Container, Footer} from './Components';
import {
    StartPage,
    SpeechPage,
    SpeechCodePage,
    SpeechRecognitionPage,
} from './Pages';

render((
    <div>
        <Container>
            <Router>
                <StartPage path="/" />
                <SpeechPage path="/speech" />
                <SpeechCodePage path="/speech-code" />
                <SpeechRecognitionPage path="/speech-recognition" />
            </Router>
        </Container>

        <Footer />
    </div>
), document.body);
