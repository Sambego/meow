import {h, render} from 'preact';
import {element, string, boolean} from 'proptypes';
import classnames from 'classnames';
import styles from './bubble.scss';

const Bubble = ({children, me, full}) => {
    const classes = classnames(styles.bubble, {
        [styles['bubble--me']]: me,
        [styles['bubble--full']]: full,
    });

    return (
        <div className={classes}>
            {children}
        </div>
    );
};

Bubble.propTypes = {
    children: element,
    full: boolean,
    me: boolean,
};

Bubble.defaultProps = {
    me: false,
};

export default Bubble;
