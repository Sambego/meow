import {h, render, Component} from 'preact';
import {BubbleSlide} from '../../Components';

export default class BatteryTitlePage extends Component {
    render() {
        return (
            <BubbleSlide previous="/notifications-push-code" next="/battery-example">
                <h1>Battery Manager API</h1>
            </BubbleSlide>
        );
    }
};
