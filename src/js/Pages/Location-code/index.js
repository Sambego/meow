import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble, Code, Notification} from '../../Components';
import IconHoly from '../../../icons/favicon-holy.png';
import IconRobot from '../../../icons/favicon-robot.png';

export default class LocationCodePage extends Component {
    codeExample1 = 'navigator.geolocation.getCurrentPosition(position => {\n    console.log(`Your current position: ${position.coords}`);\n});';
    codeExample2 = 'const latLng = new maps.LatLng(coordinates.coords.latitude, coordinates.coords.longitude);\nconst geocoder = new maps.Geocoder();\n\ngeocoder.geocode({latLng}, (results, status) => {\n    if (status === maps.GeocoderStatus.OK) {\n        console.logs(`You current position is: \n        ${results.find(result => \n            result.types.includes(\'locality\'))[\'formatted_address\']}`)\n    }\n});';

    render() {
        return (
            <BubbleSlide previous="location" next="notification">
                <Bubble>To get the current location we can call the <code>geolocation.getCurrentPosition</code> method, which will resolve the user's coordinates in a callback.</Bubble>
                <Bubble full>
                    <Code code={this.codeExample1} />
                </Bubble>
                <Bubble>Now that we have our coordinates, we can get the name of the current location using the Google Maps API.</Bubble>
                <Bubble>
                    <Code code={this.codeExample2} />
                </Bubble>
                <Bubble>Using the current position returned by the geolocation API, we can use a map provider like Google Maps to show where we are on a map.</Bubble>
                <Notification message="Hey Sam, when are you coming home, I'm hungry!" />
                <Notification message="Oh, by the way, these holes in the couch were already there when I got here 😇." icon={IconHoly}/>
                <Notification message="Yeah, I found out how to send notifications in the browser." icon={IconRobot}/>
            </BubbleSlide>
        );
    }
};
