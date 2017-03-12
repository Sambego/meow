import {h, render} from 'preact';
import {element, string} from 'proptypes';
import styles from './map.scss';
import {Icon} from '../';
import {Location} from '../../Services';

const Map = ({children, lat, long}) => {
    return (
        <div className={styles.map}>
            <img src={Location.getMap(lat, long)} />
            <Icon name="location" className={styles['map__marker']}/>
        </div>
    );
};

Map.propTypes = {
    children: element,
    lat: string,
    long: string,
};

export default Map;
