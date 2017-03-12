import {h, render} from 'preact';
import {element} from 'proptypes';
import styles from './location.scss';
import {Icon} from '../';

const Location = ({children}) => {
    return (
        <span className={styles.location}>
            <Icon name="location" size="small"/>
            {children}
        </span>
    );
};

Location.propTypes = {
    children: element,
};

export default Location;
