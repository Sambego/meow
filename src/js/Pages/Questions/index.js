import { h, render, Component } from 'preact';
import { BubbleSlide } from '../../Components';

export default class QuestionsPage extends Component {
    render() {
        return (
            <BubbleSlide previous="/bonus" next="/acknowledgements">
                <h1>Questions?</h1>
            </BubbleSlide>
        );
    }
}
