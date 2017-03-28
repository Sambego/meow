import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble, BubbleCollection, Code, CodeCaption} from '../../Components';

export default class NotificationPushCodePage extends Component {
    codeExample1 = 'if (\'serviceWorker\ in navigator) {\n    navigator.serviceWorker.register(\'/service-worker.js\')\n        .then(() => {\n            // Do something with you service-worker\n        });\n}';
    codeExample2 = 'navigator.serviceWorker.ready.then(serviceWorkerRegistration => {\n    serviceWorkerRegistration.pushManager.getSubscription()\n        .then(subscription => {\n            if (!subscription) { \n                return;\n            }\n\n            sendSubscriptionToPushServer(subscription);\n    });\n});';
    codeExample3 = 'self.addEventListener(\'push\', event => {\n    const title = \'Hey look, a push message!\';\n    const body = \'Ah push it, push it real good!\';\n\n    event.waitUntil(\n        self.registration.showNotification(title, {\n            body,\n        });\n    );\n});';

    render() {
        return (
            <BubbleSlide previous="notification-push" next="battery">
                <Bubble>To start listening to push events, we first need to create a service-worker, and register it.</Bubble>
                <BubbleCollection>
                    <CodeCaption>main.js</CodeCaption>
                    <Bubble full>
                        <Code code={this.codeExample1} />
                    </Bubble>
                </BubbleCollection>
                <Bubble>Once the service-worker is registered, you can subscribe to the <code>pushManager</code>, and send the subscription to your push server.</Bubble>
                <BubbleCollection>
                    <CodeCaption>main.js</CodeCaption>
                    <Bubble full>
                        <Code code={this.codeExample2} />
                    </Bubble>
                </BubbleCollection>
                <Bubble>Once subscribed to a push server, you can use the service-worker to listen to push events. With every push event you can do a whole bunch of things, but for this example we'll show a notification.</Bubble>
                <BubbleCollection>
                    <CodeCaption>service-worker.js</CodeCaption>
                    <Bubble full>
                        <Code code={this.codeExample3} />
                    </Bubble>
                </BubbleCollection>
            </BubbleSlide>
        );
    }
};
