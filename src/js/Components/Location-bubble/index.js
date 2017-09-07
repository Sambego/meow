import { h, render, Component } from 'preact';
import { func } from 'proptypes';
import { Location } from '../../Services';
import { Bubble, Loader } from '../';

export default class LocationBubble extends Component {
    static propTypes = {
        onLocation: func,
    };

    constructor(...args) {
        super(...args);

        Location.get().then(location => {
            this.setState({ location });

            if (this.props.onLocation) {
                this.props.onLocation(
                    `Looks like you are in ${this.state.location.city}`
                );
            }
        });
    }

    render() {
        return (
            <Bubble noContainer>
                {this.state.location
                    ? `Looks like you are in ${this.state.location.city}`
                    : <Loader />}
            </Bubble>
        );
    }
}
