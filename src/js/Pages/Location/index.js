import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble, BubbleCollection, Loader, Location, Map} from '../../Components';
import styles from  './location.scss';
import {Location as LocationService} from '../../Services';

export default class LocationPage extends Component {
    constructor(...props) {
        super(...props);

        LocationService.get().then(location => {
            this.setState(location);
        });
    }

    render() {
        return (
            <BubbleSlide previous="speech-recognition-code" next="location-code">
                <BubbleCollection>
                    <Bubble>Hi Sam, where are you? Why aren't you here to pet me??</Bubble>
                    <Bubble>You don't have to tell me, I have a buddy at the CIA, he'll track you down! Just kidding, the browser can get your location for me!</Bubble>
                    {!this.state.city && <Bubble><Loader /></Bubble>}
                    {this.state.city && <Bubble>Gotcha! Looks like you're in <Location>{this.state.city}</Location> !</Bubble>}
                </BubbleCollection>
                <BubbleCollection>
                    <Bubble>To be specific, looks like you're here:</Bubble>
                    <Bubble><Map lat={this.state.latitude} long={this.state.longitude} /></Bubble>
                </BubbleCollection>
            </BubbleSlide>
        );
    }
};
