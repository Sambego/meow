import {h, render, Component} from 'preact';
import {element, string} from 'proptypes';
import classnames from 'classnames';
import {Icon} from '../';
import styles from './slide-nav.scss';

const SlideNav = ({direction, to}) => {
    const classes = classnames(styles['slide-nav'], {
        [styles['slide-nav--left']]: direction === 'left',
        [styles['slide-nav--right']]: direction === 'right',
    });

    return (
        <a className={classes} href={to}>
            <Icon name={`caret-${direction}`} size="small" color="white"/>
        </a>
    );
};

SlideNav.propTypes = {
    direction: string,
    to: string,
};

SlideNav.defaultProps = {
    direction: 'left',
};

export default SlideNav;
