import {h, render} from 'preact';
import styles from './loader.scss';

const Loader = () => {
    return (
        <div className={styles.loader}>
            <span className={styles['loader__indicator']}></span>
            <span className={styles['loader__indicator']}></span>
            <span className={styles['loader__indicator']}></span>
        </div>
    );
};

Loader.propTypes = {};

export default Loader;
