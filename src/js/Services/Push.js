import firebase from 'firebase';
import Icon from '../../icons/favicon-robot.png';

export default class Push {
    static config = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_DOMAIN,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    };

    constructor() {
        firebase.initializeApp(Push.config);
        console.log('✔️ Firebase initialized!');
    }

    messageCallbacks = [];

    requestPermission() {
        this.messaging = firebase.messaging();

        return this.messaging.requestPermission()
            .then(() => {
                console.log('✔️ Push notification permission granted');

                return this.getToken();
            })
            .catch(error => {
                console.log('❌ Unable to get permissions for push messages.', error);

                return error;
            });
    }

    getToken() {
        return this.messaging.getToken()
            .then(currentToken => {
                if (currentToken) {
                    this.token = currentToken;

                    return this.sendTokenToServer(currentToken)
                        .then(() => {
                            console.log('✔️ Push notification setup complete. Token:', currentToken);

                            this.onTokenRefresh();
                            this.setupMessageEventListener();

                            return currentToken;
                        })
                        .catch(error => {
                            console.log('❌ Something went wrong sending the toke to the server.', error);

                            return false;
                        });
                } else {
                    console.log('❌ No Instance ID token available. Request permission to generate one.');

                    return false;
                }
            })
            .catch(error => {
                console.log('❌ An error occurred while retrieving token. ', error);

                return error;
            });
    }

    sendTokenToServer(token) {
        return fetch(`https://iid.googleapis.com/iid/info/${token}?details=true&Authorization:key=${Push.config.apiKey}`);
    }

    setupMessageEventListener() {
        this.messaging.onMessage(payload => {
            console.log('✔️  push message received. ', payload);

            this.messageCallbacks.forEach(callback => callback(payload));
        });
    }

    onTokenRefresh() {
        this.messaging.onTokenRefresh(() => {
            messaging.getToken()
                .then(refreshedToken => {
                    console.log('✔️ Token refreshed.');

                    this.setTokenSentToServer(false);
                    this.sendTokenToServer(refreshedToken);
                })
                .catch(error =>  {
                    console.log('❌ Unable to retrieve refreshed token ', error);
                });
        });
    }

    onMessage(callback) {
        if (callback) {
            this.messageCallbacks.push(callback);
        }
    }

    sendPushMessage(message) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `key=${process.env.FIREBASE_MESSAGING_SERVER_KEY}`,
        });

        const body = JSON.stringify({
            data: {
                message,
            },
            to: this.token,
        });

        const params = {
            method: 'POST',
            headers,
            mode: 'cors',
            cache: 'default',
            body,
        };

        return fetch('https://fcm.googleapis.com/fcm/send', params);
    }
}
