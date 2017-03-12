import {h, render, Component} from 'preact';
import linkRef from 'linkref';
import {Slide} from '../../Components';
import styles from  './start.scss';
import {Keyboard} from '../../Services';

export default class StartPage extends Component {
    constructor(...props) {
        super(...props);

        this.KeyboardListener = Keyboard.on('right', this.goToNextPage);
    }

    goToNextPage = () => {
        this.refs.slide.next();
    }

    componentWillUnmount() {
        Keyboard.off(this.KeyboardListener);
    }

    render() {
        return (
            <Slide next="speech" ref={linkRef(this, 'slide')}>
                <h1 className={styles['start__title']}>I didn't know the browser could do that!</h1>
            </Slide>
        );
    }
};
