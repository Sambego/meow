import {h, render} from 'preact';
import {element} from 'proptypes';
import Styles from './code-caption.scss';

const CodeCaption = ({children}) => {
    return (
        <p className={Styles['code-caption']}>
            {children}
        </p>
    );
};

CodeCaption.propTypes = {
    children: element,
};

export default CodeCaption;
