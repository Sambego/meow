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
    BatteryPage,
} from './Pages';
import {Push} from './Services';
import serviceworker from 'file-loader!./serviceworker.js';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register(serviceworker)
        .then(() => {
            if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
                console.log('❌ Notifications aren\'t supported.');

                return;
            }

            // Check the current Notification permission.
            // If its denied, it's a permanent block until the
            // user changes the permission
            if (Notification.permission === 'denied') {
                console.log('❌ The user has blocked notifications.');

                return;
            }

              // Check if push messaging is supported
            if (!('PushManager' in window)) {
                console.log('❌ Push messaging isn\'t supported.');

                return;
            }

            // We need the service worker registration to check for a subscription
            navigator.serviceWorker.ready.then(serviceWorkerRegistration => {
                // Do we already have a push message subscription?
                serviceWorkerRegistration.pushManager.getSubscription()
                    .then(subscription => {
                        if (!subscription) {
                            const pushManager = new Push();

                            return pushManager.requestPermission();
                        }

                        // Unsubscribe ...
                    })
                    .catch(error => {
                        console.log('❌ Error during getSubscription()', error);
                    });
            });
        });
} else {
    console.log('❌ Service workers aren\'t supported in this browser.');
}

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
                <BatteryPage path="/battery" />
            </Router>
        </Container>

        <Footer />
    </div>
), document.body);
