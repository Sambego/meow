import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble, Code} from '../../Components';

export default class BluetoothCodePage extends Component {
    codeExample1 = 'navigator.bluetooth.requestDevice({\n    acceptAllDevices: true,\n}).then(device => {\n    console.log(device.name);\n});';
    codeExample2 = '...\nthis.device.gatt.connect()\n    .then(server => server.getPrimaryService(\'battery_service\'))\n    .then(service => service.getCharacteristic(\'battery_level\'))\n    .then(characteristic => characteristic.readValue())\n...';
    codeExample3 = '...\n.then(value => value.getUint8(0));\n...';
    codeExample4 = '...\n.then(server => server.getPrimaryService(\'heart_rate\'))\n.then(service => service.getCharacteristic(\'heart_rate_measurement\'))\n.then(characteristic => {\n    characteristic.startNotifications();\n    characteristic.addEventListener(\'characteristicvaluechanged\', event => {\n        console.log(event.target.value);\n    });\n});    ';

    render() {
        return (
            <BubbleSlide previous="/bluetooth" next="/media-session">
                <Bubble>{'So, let\'s find out how we can connect and communicate with bluetooth devices, shall we?'}</Bubble>
                <Bubble>{'First we need to request access to a device.'}</Bubble>
                <Bubble full>
                    <Code code={this.codeExample1} />
                </Bubble>
                <Bubble>{'This will show the device selector popup, and return some basic information, like the name.'}</Bubble>
                <Bubble>{'To access more data from the devices, we need to connect to it\'s gatt server (Generic Attribute server). Once we do this we can access one of it\'s services and characteristics.'}</Bubble>
                <Bubble full>
                    <Code code={this.codeExample2} />
                </Bubble>
                <Bubble>{'This will return a '}<code>DataView</code> {'so all that\'s left is doing something with the data.'}</Bubble>
                <Bubble full>
                    <Code code={this.codeExample3} />
                </Bubble>
                <Bubble>{'It is also possible to subscribe to events, so we can have a continous stream of updates from the device.'}</Bubble>
                <Bubble full>
                    <Code code={this.codeExample4} />
                </Bubble>
            </BubbleSlide>
        );
    }
};
