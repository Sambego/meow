import {h, render, Component} from 'preact';
import {Slide} from '../../Components';
import styles from  './start.scss';

const StartPage = ({children}) => {
    return (
        <Slide next="speech">
            <h1 className={styles['start__title']}>I didn't know the browser could do that!</h1>
        </Slide>
    );
};

StartPage.propTypes = {};

export default StartPage;
