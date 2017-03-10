import {h, render, Component} from 'preact';
import {element, string} from 'proptypes';
import keycode from 'keycode';
import Router from 'preact-router';
import {SlideNav} from '../';
import styles from './slide.scss';

const Slide = ({children, previous, next}) => {
    const navigate = event => {
        const keys = {
            left: () => previous && Router.route(previous),
            right: () => next && Router.route(next),
        };

        const listener = keys[keycode(event)];
        if (typeof listener !== 'undefined') {
            listener();
        }
    };

    window.addEventListener('keyup', navigate);

    return (
        <section className={styles.slide}>
            {previous && <SlideNav direction="left" to={previous} />}
            {next && <SlideNav direction="right" to={next} />}

            {children}
        </section>
    );
};

Slide.propTypes = {
    children: element.isRequired,
    previous: string,
    next: string,
};

export default Slide;
