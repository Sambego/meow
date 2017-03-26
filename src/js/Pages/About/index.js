import {h, render, Component} from 'preact';
import {BubbleSlide, BubbleCollection, Bubble} from '../../Components';
import {Cat} from '../../Services';

export default class AboutPage extends Component {
    componentWillMount() {
        // Hacky, yeah I know!
        window.setTimeout(() => {
            Cat.me();
        });
    }

    render() {
        return (
            <BubbleSlide previous="/" next="speech">
                <BubbleCollection>
                    <Bubble>My name is Sam Bellen.</Bubble>
                    <Bubble>I'm a software engineer at madewithlove.</Bubble>
                    <Bubble>You can find me online as <strong>Sambego</strong>.</Bubble>
                </BubbleCollection>
            </BubbleSlide>
        );
    }
};
