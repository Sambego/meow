import { h, render, Component } from 'preact';
import linkRef from 'linkref';
import { Battery, BubbleSlide, Bubble, Button, Mouse } from '../../Components';
import Bluetooth from '../../Services/Bluetooth';

export default class BluetoothPage extends Component {
    getBluetoothDeviceInfo() {
        const blueToothDevice = new Bluetooth();

        blueToothDevice.getDevice().then(device => {
            this.setState({ device });
            this.refs.bubbleSlide.getNextAction();
        });
    }

    getBluetoothDeviceBattery() {
        const blueToothDevice = new Bluetooth();
        blueToothDevice.getDevice({
            optionalServices: ['battery_service'],
        }).then(() => {
            blueToothDevice.getDeviceBatteryInfo()
                .then(battery => {
                    this.setState({ battery });
                    this.refs.bubbleSlide.getNextAction();
                });
        });
    }

    getHeartRate() {
        const blueToothDevice = new Bluetooth();
        blueToothDevice.getDevice({
            optionalServices: ['heart_rate'],
        }).then(() => {
            blueToothDevice.getHeartRate()
                .then(heartrateCharectaristic => {
                    this.setState({ heartrateCharectaristic });
                    this.refs.bubbleSlide.getNextAction();

                    this.setState({ heartbeatEvent: this.state.heartrateCharectaristic.addEventListener('characteristicvaluechanged', event => {
                        this.setState({ heartRate: Bluetooth.parseHeartrate(event.target.value)});
                    })});
                });
        });
    }

    componentWillUnmount() {
        this.state.heartrateCharectaristic.removeEventListener('characteristicvaluechanged', this.state.heartbeatEvent);
    }

    render() {
        return (
            <BubbleSlide previous="/bluetooth" next="/bluetooth-code" ref={linkRef(this, 'bubbleSlide')}>
                <Bubble>
                    The web is not constricted to the browser anymore. We can access bluetooth devices trough the web bluetooth API.
                    With this API is it quite easy to get some information of bluetooth enabled devices around you.
                </Bubble>
                <Bubble>
                    <Button onClick={::this.getBluetoothDeviceInfo}>Get device information</Button>
                </Bubble>
                <Bubble>
                    It looks like the device you just paired with has this as a name: <strong>{this.state.device && this.state.device.name}</strong>
                </Bubble>
                <Bubble>
                    {'Of course we can do a lot more than just getting the name of a device. Let\'s try to get the battery information.'}
                </Bubble>
                <Bubble>
                    <Button onClick={::this.getBluetoothDeviceBattery}>
                        Show me your battery status!
                    </Button>
                </Bubble>
                <Bubble>
                    {this.state.battery && <Battery value={this.state.battery} />}
                </Bubble>
                <Bubble>
                    {'Sam, I know you\'re wearing a heartrate monitor right now. Wouldn\'t it be cool to show the whole room how nervous you are?'}
                </Bubble>
                <Bubble>
                    <Button onClick={::this.getHeartRate}>
                        Is my heart still ticking?
                    </Button>
                </Bubble>
                <Bubble>
                    Your heartrate is <strong>{this.state.heartRate ? `${this.state.heartRate} bpm` : '0 pbm'}</strong> at the moment,
                </Bubble>
            </BubbleSlide>
        );
    }
}
