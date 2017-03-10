import {h, render} from 'preact';
import {Icon} from '../';
import styles from './cat.scss';

const Cat = () => {
    const src = require('../../../icons/poes.svg');

    return (
        <div dangerouslySetInnerHTML={{__html: src}} className={styles.cat} />
    );
};

Cat.propTypes = {};

export default Cat;
