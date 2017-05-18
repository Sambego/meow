import {h, render, Component} from 'preact';
import {BubbleSlide, BubbleCollection, Bubble} from '../../Components';

export default class AcknowledgementPage extends Component {
    render() {
        return (
            <BubbleSlide previous="/head-tracking" next="/thanks">
                <BubbleCollection>
                    <Bubble>That's it, I hope you enjoyed this presentation and learned some new things you can do with a browser!</Bubble>
                    <Bubble>You can find this presentation at <a href="https://meow.sambego.be">https://meow.sambego.be</a>.</Bubble>
                    <Bubble>The cat illustrations are based on <a target="_blank" href="https://www.dropbox.com/s/4osnvipl13h35dy/poes.jpg?dl=0">this</a> and <a target="_blank" href="https://dribbble.com/shots/1515855-AI-Cat">this</a> cat</Bubble>
                </BubbleCollection>
            </BubbleSlide>
        );
    }
};
