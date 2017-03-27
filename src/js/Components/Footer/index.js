import {h, render, Component} from 'preact';
import styles from './footer.scss';
import Icon from '../Icon';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <a className={styles['footer__twitter']} href="https://twitter.com/sambego">
                <Icon name="twitter" size="small" className={styles['footer__icon']}/>
                <span>Sambego</span>
            </a>
        </footer>
    );
};

Footer.propTypes = {};

export default Footer;
