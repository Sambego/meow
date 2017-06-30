import {h, render, Component} from 'preact';
import GyroNorm from 'gyronorm';
import {Icon} from '../';
import styles from './mouse.scss';
import mouse from '../../../icons/mouse.svg';

export default class Mouse extends Component {
    gyro = new GyroNorm();

    constructor(...args) {
        super(...args);

        this.data = {
            beta: 0,
            gamma: 0,
        };

        window.addEventListener('deviceorientation', ::this.move);
    }

    calcBeta(beta) {
        console.log('beta', beta);
        // if (beta === this.state.beta) {
        //
        // }
    }

    calcGamma(gamma) {
        console.log('gamma:', gamma);
    }

    move(event) {
        this.setState({
            beta: this.calcBeta(event.beta),
            gamma: this.calcGamma(event.gamma),
        });
    }

    render() {
        return (
            <div dangerouslySetInnerHTML={{__html: mouse}} className={styles.mouse}></div>
        );
    }
};
