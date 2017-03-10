import {h, render} from 'preact';
import {element, string} from 'proptypes';
import Prism from 'prismjs';
import '../../../../node_modules/prismjs/themes/prism.css';
import '../../../css/prism.css';

const Code = ({code, lang}) => {
    return (
        <pre>
            <code dangerouslySetInnerHTML={{__html: Prism.highlight(code, Prism.languages[lang])}} />
        </pre>
    );
};

Code.propTypes = {
    code: string,
    lang: string,
};

Code.defaultProps = {
    lang: 'javascript',
};

export default Code;
