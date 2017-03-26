import {h, render, Component} from 'preact';

import {BubbleSlide, Bubble, BubbleCollection, Code, Notification} from '../../Components';

export default class NotificationPage extends Component {
    codeExample1 = 'Notification.requestPermission(permission => {\n    if (permission === \'granted\') {\n        // Permission granted!\n    }\n});';
    codeExample2 = 'const notification = new Notification(\'I\'m the title of this notification!\', {\n    body: \'The body goes here.\',\n    icon: \'/path/to/a/cat/picture.png\',\n});';
    codeExample3 = 'notification.onclick = event => {\n    // Do something cool!\n}';

    render() {
        return (
            <BubbleSlide previous="location-code" next="battery">
                <BubbleCollection>
                    <Bubble>The above code will create a notification like this</Bubble>
                    <Notification title="I'm the title of this notification!" message="The body goes here."/>
                </BubbleCollection>
            </BubbleSlide>
        );
    }
};
