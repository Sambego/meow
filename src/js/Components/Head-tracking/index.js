import {h, render, Component} from 'preact';
import linkRef from 'linkref';
import Tracking from '../../Vendor/tracking';
import Face from '../../Vendor/face';
import {Cam} from '../';
import Styles from './head-tracking.scss';
import earLeft from '../../../icons/ear-left@2x.png';
import earRight from '../../../icons/ear-right@2x.png';

const LEFT_EAR_WIDTH = 84;
const LEFT_EAR_HEIGHT = 137;
const RIGHT_EAR_WIDTH = 88;
const RIGHT_EAR_HEIGHT = 124;

export default class HeadTracking extends Component {
    createImage(image, name) {
        const imageElement = new Image();

        imageElement.onload = () => {
            this[name] = imageElement;
        };

        imageElement.src = image;
    }

    setupTracking(stream, element) {
        this.tracker = new tracking.ObjectTracker('face');
        this.tracker.setInitialScale(4.4);
        this.tracker.setStepSize(1);
        this.tracker.setEdgesDensity(0.1);

        tracking.track(element, this.tracker);

        this.tracker.on('track', event => {
            this.context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);

            event.data.forEach(head => {
                this.renderLeftEar(head);
                this.renderRighttEar(head);

                // Debug: draw a rectangle around the face
                // this.context.strokeStyle = '#FF0000';
                // this.context.strokeRect(head.x, head.y, head.width, head.height);
            });
        });
    }

    renderLeftEar(head) {
        const height = (head.height / 2);
        const width = height / LEFT_EAR_HEIGHT * LEFT_EAR_WIDTH;

        this.context.drawImage(this.earLeft, (head.x + (head.width / 8)), (head.y - height + 20), width, height);
    }

    renderRighttEar(head) {
        const height = (head.height / 2);
        const width = height / RIGHT_EAR_HEIGHT * RIGHT_EAR_WIDTH;

        this.context.drawImage(this.earRight, (head.x + head.width - (head.width / 2.3)), (head.y - height + 20), width, height);
    }

    componentDidMount() {
        this.createImage(earLeft, 'earLeft');
        this.createImage(earRight, 'earRight');

        this.context = this.refs.canvas.getContext('2d');
        this.context.width = this.refs.canvas.offsetWidth;
        this.context.height = this.refs.canvas.offsetHeight;
    }

    componentWillUnmount() {
        this.tracker.removeAllListeners();
    }

    render() {
        return (
            <div className={Styles['head-tracking']}>
                <Cam ref={linkRef(this, 'cam')} onReady={::this.setupTracking} className={Styles['head-tracking__video']}/>
                <canvas width="576" height="432" ref={linkRef(this, 'canvas')} className={Styles['head-tracking__canvas']}></canvas>
            </div>
        );
    }
};
