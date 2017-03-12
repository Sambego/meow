import {h, render, Component} from 'preact';
import {element, string} from 'proptypes';
import Router from 'preact-router';
import keycode from 'keycode';
import styles from './slide.scss';

export default class Slide extends Component  {
    static propTypes = {
        children: element.isRequired,
        previous: string,
        next: string,
    };

    previous() {
        if (this.props.previous) {
            Router.route(this.props.previous);
        }
    }

    next() {
        if (this.props.next) {
            Router.route(this.props.next);
        }
    }

    render() {
        return (
            <section className={styles.slide}>
                {this.props.children}
            </section>
        );
    }
};
