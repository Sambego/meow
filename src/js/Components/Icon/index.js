import {h, render, Component} from 'preact';
import {string, oneOf, object} from 'proptypes';
import classnames from 'classnames';
import styles from './icon.scss';

const aliases = {};

const Icon = ({name, color, className, size, style}) => {
    if (aliases.hasOwnProperty(name)) {
        name = aliases[name];
    }

    const src = require(`../../../icons/${name}.svg`);
    const props = {
        className: classnames(styles.icon, styles[`icon--${name}`], className, styles[`icon--${size}`]),
        style,
    };

    if (color && color !== 'transparent') {
        props.style = {
            color,
        };
    }

    return (
        <div dangerouslySetInnerHTML={{__html: src}} {...props}></div>
    );
};

Icon.propTypes = {
    className: string,
    color: string,
    name: string.isRequired,
    size: oneOf(['tiny', 'text', 'small', 'medium']),
    style: object,
};

Icon.defaultProps = {
    size: 'medium',
};

export default Icon;
