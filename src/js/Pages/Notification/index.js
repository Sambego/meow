import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble, BubbleCollection, Code, Notification} from '../../Components';

export default class NotificationPage extends Component {
    codeExample1 = 'Notification.requestPermission(permission => {\n    if (permission === \'granted\') {\n        // Permission granted!\n    }\n});';
    codeExample2 = 'const notification = new Notification(\'I\'m the title of this notification!\', {\n    body: \'The body goes here.\',\n    icon: \'/path/to/a/cat/picture.png\',\n});';
    codeExample3 = 'notification.onclick = event => {\n    // Do something cool!\n}';

    render() {
        return (
            <BubbleSlide previous="location-code" next="notification-push">
                <Bubble>Showing a notification is pretty easy, but before we can do so, we need to ask for the persmission to show it.</Bubble>
                <Bubble full>
                    <Code code={this.codeExample1} />
                </Bubble>
                <Bubble>Now that we have the permission to show notifications, all that's left to do, is create the notification.</Bubble>
                <Bubble full>
                    <Code code={this.codeExample2} />
                </Bubble>
                <BubbleCollection>
                    <Bubble>The above code will create a notification like this</Bubble>
                    <Notification title="I'm the title of this notification!" message="The body goes here."/>
                </BubbleCollection>
                <Bubble>It is possible to add a click event handler to the notification, to execute an action when clicking on the notification.</Bubble>
                <Bubble full>
                    <Code code={this.codeExample3} />
                </Bubble>
            </BubbleSlide>
        );
    }
};
