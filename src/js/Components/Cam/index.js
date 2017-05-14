import {h, render, Component} from 'preact';
import linkRef from 'linkref';
import {func} from 'proptypes';
import styles from './cam.scss';

export default class Cam extends Component {
    static propTypes = {
        onReady: func,
    };

    constructor(...args) {
        super(...args);

        navigator.mediaDevices.getUserMedia({
            video: true,
        }).then(stream => {
            this.refs.video.srcObject = stream;

            if (this.props.onReady) {
                this.props.onReady(stream);
            }
        });
    };

    render() {
        return (
            <video autoPlay ref={linkRef(this, 'video')} className={styles.cam}></video>
        );
    }
};
