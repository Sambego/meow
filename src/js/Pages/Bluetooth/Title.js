import {h, render, Component} from 'preact';
import {BubbleSlide} from '../../Components';

export default class BluetoothTitlePage extends Component {
    render() {
        return (
            <BubbleSlide previous="/device-orientation-code" next="/bluetooth-example">
                <h1>Web bluetooth API</h1>
            </BubbleSlide>
        );
    }
};
