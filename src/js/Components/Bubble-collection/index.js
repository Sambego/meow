import {h, render} from 'preact';
import {element} from 'proptypes';
import styles from  './Bubble-collection.scss';

const BubbleCollection = ({children}) => {
    return (
        <div className={styles['bubble-collection']}>
            <div className={styles['bubble-collection__inner']}>
                {children}
            </div>
        </div>
    );
};

BubbleCollection.propTypes = {
    children: element,
};

export default BubbleCollection;
