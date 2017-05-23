import {h, render, Component} from 'preact';
import {Location} from '../../Services';
import {Bubble, Loader} from '../';

export default class Places extends Component {
    constructor(...args) {
        super(...args);

        Location.getCoordinates()
            .then(coordinates => {
                fetch(`//maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates.coords.latitude},${coordinates.coords.longitude}&radius=500&types=food&key=${process.env.GOOGLE_MAPS_API}`)
                    .then(response => {
                        response.json()
                            .then(places => this.setState({places}));
                    });
            });
    }

    renderNews() {
        return this.state.places.map(item => <li><a href={item.url}>{item.title}</a></li>);
    }

    render() {
        return <Bubble>{this.state.news ? this.renderNews() : <Loader />}</Bubble>;
    }
};
