import {h, render, Component} from 'preact';
import {string, element, object, func} from 'proptypes';
import classnames from 'classnames';
import {Icon} from '../';
import styles from './button.scss';

const aliases = {};

const Button = ({children, type, onClick, href, icon, className}) => {
    if (aliases.hasOwnProperty(name)) {
        name = aliases[name];
    }

    const props = {
        className: classnames(styles.button, styles[`button--${type}`], styles[className]),
        onClick,
    };

    if (href) {
        props.href = href;
    }

    if (href) {
        return (
            <a {...props}>
                {icon && <Icon name={icon} className={styles['button__icon']} />}
                <span className={styles['button__inner']}>{children}</span>
            </a>
        );
    }

    return (
        <button {...props}>
            {icon && <Icon name={icon} className={styles['button__icon']} />}
            <span className={styles['button__inner']}>{children}</span>
        </button>
    );
};

Button.propTypes = {
    children: element.isRequired,
    className: string,
    icon: string,
    onClick: func,
    href: string,
    style: object,
    type: string,
};

Button.defaultProps = {
    type: 'primary',
};

export default Button;
