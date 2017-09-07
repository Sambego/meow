import { h, render, cloneElement } from 'preact';
import { element } from 'proptypes';
import styles from './bubble-collection.scss';

const BubbleCollection = ({ children }) => {
    const renderChildren = () => {
        return children.map(child =>
            cloneElement(child, {
                noContainer: true,
            })
        );
    };

    return (
        <div className={styles['bubble-collection']}>
            <div className={styles['bubble-collection__inner']}>
                {renderChildren()}
            </div>
        </div>
    );
};

BubbleCollection.propTypes = {
    children: element,
};

export default BubbleCollection;
