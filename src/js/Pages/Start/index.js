import {h, render, Component} from 'preact';
import {BubbleSlide} from '../../Components';

export default class StartPage extends Component {
    render() {
        return (
            <BubbleSlide next="speech">
                <h1>I didn't know the browser could do that!</h1>
            </BubbleSlide>
        );
    }
};
