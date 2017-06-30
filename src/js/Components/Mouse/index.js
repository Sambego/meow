import {h, render, Component} from 'preact';
import linkRef from 'linkref';
import {Icon} from '../';
import styles from './mouse.scss';
import mouse from '../../../icons/mouse.svg';

const step = 5;

export default class Mouse extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            beta: 0,
            gamma: 0,
            maxX: 0,
            maxY: 0,
            currentX: 50,
            currentY: 50,
        };

        window.addEventListener('deviceorientation', ::this.move);
    }

    componentDidMount() {
        this.setState({
            maxX: window.innerWidth - 223,
            maxY: window.innerHeight - 221,
        });
    }

    calcBeta(beta) {
        console.log('beta', beta);

        if (beta) {
            switch (true) {
                case beta < 0 && this.state.currentX - step >= 0:
                    this.setState({currentX: this.state.currentX - step});
                    break;
                case beta < 0 && this.state.currentX - step < 0:
                    this.setState({currentX: 0});
                    break;
                case beta > 0 && this.state.currentX + step <= this.state.maxX:
                    this.setState({currentX: this.state.currentX + step});
                    break;
                case beta > 0 && this.state.currentX + step > this.state.maxX:
                    this.setState({currentX: this.state.maxX});
                    break;
            }
        }
    }

    calcGamma(gamma) {
        console.log('gamma:', gamma);

        if (gamma) {
            switch (true) {
                case gamma < 0 && this.state.currentY - step >= 0:
                    this.setState({currentY: this.state.currentY - step});
                    break;
                case gamma < 0 && this.state.currentY - step < 0:
                    this.setState({currentY: 0});
                    break;
                case gamma > 0 && this.state.currentY + step <= this.state.maxY:
                    this.setState({currentY: this.state.currentY + step});
                    break;
                case gamma > 0 && this.state.currentY + step > this.state.maxY:
                    this.setState({currentY: this.state.maxY});
                    break;
            }
        }
    }

    move(event) {
        this.setState({
            beta: this.calcBeta(event.beta),
            gamma: this.calcGamma(event.gamma),
        });
    }

    render() {
        return (
            <div ref={linkRef(this, 'container')}>
                <div dangerouslySetInnerHTML={{__html: mouse}} className={styles.mouse} style={{transform: `translate3d(${this.state.currentX}px, ${this.state.currentY}px, 0px)`}}></div>
            </div>
        );
    }
};
