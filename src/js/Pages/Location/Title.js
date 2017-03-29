import {h, render, Component} from 'preact';
import {BubbleSlide} from '../../Components';

export default class LocationTitlePage extends Component {
    render() {
        return (
            <BubbleSlide previous="/speech-recognition-code" next="/location-example">
                <h1>Geolocation API</h1>
            </BubbleSlide>
        );
    }
};
