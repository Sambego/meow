import { h, render, Component } from 'preact';
import { func } from 'proptypes';
import { Location } from '../../Services';
import { Bubble, Loader } from '../';

export default class Weather extends Component {
    static propTypes = {
        onWeather: func,
    };

    constructor(...args) {
        super(...args);

        Location.getCoordinates().then(coordinates => {
            fetch(
                `//api.openweathermap.org/data/2.5/weather?lat=${coordinates
                    .coords.latitude}&lon=${coordinates.coords
                    .longitude}&APPID=${process.env
                    .WEATHER_API_KEY}&units=metric`
            ).then(response => {
                response.json().then(weather => {
                    this.setState({ weather });

                    if (this.props.onWeather) {
                        this.props.onWeather(
                            `Looks like ${this.state.weather.weather[0]
                                .description} with a temperature of ${this.state
                                .weather.main.temp} degrees Celcius.`
                        );
                    }
                });
            });
        });
    }

    render() {
        return (
            <Bubble noContainer>
                {this.state.weather
                    ? `Looks like ${this.state.weather.weather[0]
                          .description} with a temperature of ${this.state
                          .weather.main.temp} degrees Celcius.`
                    : <Loader />}
            </Bubble>
        );
    }
}
