import {h, render, Component} from 'preact';
import {BubbleSlide, BubbleCollection, Bubble} from '../../Components';
import {Cat} from '../../Services';
import Poes from '../../../img/poes.jpg';
import Styles from './about.scss';

export default class AboutPage extends Component {
    componentWillMount() {
        // Hacky, yeah I know!
        window.setTimeout(() => {
            Cat.me();
        });
    }

    render() {
        return (
            <BubbleSlide previous="/" next="/speech">
                <Bubble>My name is Sam Bellen.</Bubble>
                <Bubble>I'm a software engineer at <span className={Styles.mwl}>madewithlove</span>.</Bubble>
                <Bubble>I'm a co-organizer of the <span className={Styles.fronteers}>Fronteers</span> meetups.</Bubble>
                <Bubble>You can find me online as <a href="https://github.com/sambego" target="_blank">Sambego</a>.</Bubble>
                <Bubble>I like cats. 😻</Bubble>
                <Bubble><img src={Poes} alt="My cat, Poes." className={Styles.poes}/></Bubble>
            </BubbleSlide>
        );
    }
};
