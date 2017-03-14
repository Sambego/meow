import {h, render} from 'preact';
import {BubbleSlide, Bubble, Code, Notification} from '../../Components';
import IconHoly from '../../../icons/favicon-holy.png';
import IconBigEyes from '../../../icons/favicon-robot.png';

const LocationCodePage = () => {
    const codeExample1 = 'navigator.geolocation.getCurrentPosition(position => {\n    console.log(`Your current position: ${position.coords}`);\n});';
    const codeExample2 = 'const latLng = new maps.LatLng(coordinates.coords.latitude, coordinates.coords.longitude);\nconst geocoder = new maps.Geocoder();\n\ngeocoder.geocode({latLng}, (results, status) => {\n    if (status === maps.GeocoderStatus.OK) {\n        console.logs(`You current position is: ${results.find(result => result.types.includes(\'locality\'))[\'formatted_address\'],}`)\n    }\n});';

    return (
        <BubbleSlide previous="location" next="notification">
            <Bubble>To get the current location we can call the <code>geolocation.getCurrentPosition</code> method, which will resolve the user's coordinates in a callback.</Bubble>
            <Bubble full>
                <Code code={codeExample1} />
            </Bubble>
            <Bubble>Once we have our coordinates, we can get the the name of the current location using the Google Maps API.</Bubble>
            <Bubble>
                <Code code={codeExample2} />
            </Bubble>
            <Bubble>Once we got our current position form the geolocation API, we can any map provider to do cool things with our coordinates.</Bubble>
            <div>
                <Notification message="Hey Sam, when are you comming home, I'm hungry!" />
                <Notification message="Oh, by the way, these holes in the couch were there when I got here 😇." icon={IconHoly}/>
                <Notification message="And yeah, I found out how to send notifications in the browser." icon={IconBigEyes}/>
            </div>
        </BubbleSlide>
    );
};

LocationCodePage.propTypes = {};

export default LocationCodePage;
