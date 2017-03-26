// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    messagingSenderId: '636158427508',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
    console.log('✔️  Received background push message ', payload);

    const notificationTitle = 'Meow, here is a background message!';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: Icon,
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});
