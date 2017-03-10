import {h, render, Component} from 'preact';
import {element} from 'proptypes';
import styles from './container.scss';
import Cat from '../Cat';

const Container = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
            <Cat />
        </div>
    );
};

Container.propTypes = {
    children: element.isRequired,
};

export default Container;
