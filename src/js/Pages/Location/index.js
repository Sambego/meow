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
            <BubbleSlide previous="/location" next="/location-code">
                <BubbleCollection>
                    <Bubble>Hey Sam, where are you? Why aren't you here to pet me??</Bubble>
                    <Bubble>You don't have to tell me, I have a buddy at the CIA, he'll track you down! Just kidding, the browser can get your location for me!</Bubble>
                    {!this.state.city && <Bubble><Loader /></Bubble>}
                    {this.state.city && <Bubble>Gotcha! Looks like you're in <Location>{this.state.city}</Location> !</Bubble>}
                </BubbleCollection>
                <BubbleCollection>
                    <Bubble>Don't be scared, but this location API is very precise!</Bubble>
                    <Bubble><Map lat={this.state.latitude} long={this.state.longitude} /></Bubble>
                    <Bubble>Is that another cat I see there??!</Bubble>
                </BubbleCollection>
            </BubbleSlide>
        );
    }
};
