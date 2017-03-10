import {h, render, Component} from 'preact';
import {element, string} from 'proptypes';
import Router from 'preact-router';
import keycode from 'keycode';
import {SlideNav} from '../';
import styles from './slide.scss';

const Slide = ({children, previous, next}) => {
    const keys = {
        left: () => {
            if (previous) {
                Router.route(previous);
                window.removeEventListener('keyup', onKeyup);
            }
        },
        right: () => {
            if (next) {
                Router.route(next);
                window.removeEventListener('keyup', onKeyup);
            }
        },
    };

    const navigate = event => {
        const listener = keys[keycode(event)];

        if (typeof listener !== 'undefined') {
            listener();
        }
    };

    const onKeyup = event => navigate(event);

    window.addEventListener('keyup', onKeyup);

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
