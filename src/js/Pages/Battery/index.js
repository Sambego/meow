import {h, render, Component} from 'preact';
import linkRef from 'linkref';
import {BubbleSlide, BubbleCollection, Bubble, Battery, Loader} from '../../Components';

export default class BatteryPage extends Component {
    constructor(...props) {
        super(...props);

        ::navigator.getBattery().then(battery => {
            this.setState({battery});
            this.state.battery.addEventListener('chargingchange', this.chargeListener);
        });
    }

    chargeListener = () => this.refs.bubbleSlide.getNextAction();

    removeBatteryListener() {
        this.state.battery.removeEventListener('chargingchange', this.chargeListener);
    }

    componentWillUnmount() {
        this.removeBatteryListener();
    }

    render() {
        return (
            <BubbleSlide previous="notification-push-code" next="battery-code"  ref={linkRef(this, 'bubbleSlide')}>
                {this.state.battery ? <BubbleCollection>
                        {this.state.battery.level > 0.5 ? <Bubble>Looks like your battery is pretty well charged, maybe you should unplug you power adapter?</Bubble>
                            : <Bubble>Your battery is not fully charged, but let's try something, ok? Go and unplug your charger if you will.</Bubble>
                        }
                        <Bubble><Battery /></Bubble>
                    </BubbleCollection> : <Bubble><Loader /></Bubble>
                }
                <Bubble>Oh, you actually listended to me for once. Don’t be stupid and plug it back in before you run out of battery power!</Bubble>
                <Bubble onShow={::this.removeBatteryListener}>Good boy, thats better!</Bubble>
            </BubbleSlide>
        );
    }
};
