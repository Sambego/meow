import {h, render, Component} from 'preact';
import {BubbleSlide, BubbleCollection, Bubble} from '../../Components';

export default class AcknowledgementPage extends Component {
    render() {
        return (
            <BubbleSlide previous="battery" next="/thanks">
                <BubbleCollection>
                    <Bubble>That's it, I hope you enjoyed this presentation and learned some new things you can do with a browser!</Bubble>
                    <Bubble>You can find this presentation at <a href="https://meow.sambego.be">https://meow.sambego.be</a>.</Bubble>
                    <Bubble>The cat image is based on <a href="https://dribbble.com/shots/1515855-AI-Cat">https://dribbble.com/shots/1515855-AI-Cat</a></Bubble>
                </BubbleCollection>
            </BubbleSlide>
        );
    }
};
