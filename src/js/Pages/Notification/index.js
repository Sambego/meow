import {h, render} from 'preact';
import {BubbleSlide, Bubble, BubbleCollection, Code, Notification} from '../../Components';

const NotificationPage = () => {
    const codeExample1 = 'Notification.requestPermission(permission => {\n    if (permission === \'granted\') {\n        // Permission granted!\n    }\n});';
    const codeExample2 = 'const notification = new Notification(\'I\'m the title of this notification!\', {\n    body: \'The body goes here.\',\n    icon: \'/path/to/a/cat/picture.png\',\n});';
    const codeExample3 = 'notification.onclick = event => {\n    // Do something cool!\n}';

    return (
        <BubbleSlide previous="location-code" next="battery">
            <Bubble>Showing a notification is pretty easy, but before we can do so, we need to ask for the persmission to show it.</Bubble>
            <Bubble full>
                <Code code={codeExample1} />
            </Bubble>
            <Bubble>Now that we have the permission to show notifications, all that's left to do is create the notification.</Bubble>
            <Bubble full>
                <Code code={codeExample2} />
            </Bubble>
            <BubbleCollection>
                <Bubble>The above code will create a notification like this</Bubble>
                <Notification title="I'm the title of this notification!"  message="The body goes here."/>
            </BubbleCollection>
            <Bubble>It is possible to add a click event handler to the notification to execute an action when clicking on the Notification.</Bubble>
            <Bubble full>
                <Code code={codeExample3} />
            </Bubble>
        </BubbleSlide>
    );
};

NotificationPage.propTypes = {};

export default NotificationPage;
