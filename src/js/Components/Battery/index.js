import {h, render, Component} from 'preact';
import classnames from 'classnames';
import {BubbleSlide, BubbleCollection, Bubble, Icon} from '../../Components';
import styles from './battery.scss';

export default class Battery extends Component {
    constructor(...props) {
        super(...props);

        this.state = {
            level: 1,
        };

        if ('getBattery' in navigator) {
            ::navigator.getBattery().then(battery => {
                this.setState({
                    battery,
                    charging: battery.charging,
                    level: battery.level,
                });

                this.state.battery.addEventListener('levelchange', this.levelListener);
                this.state.battery.addEventListener('chargingchange', this.chargingListener);
            });
        }
    }

    levelListener = () => this.setBatteryLevel();

    chargingListener = () => this.setChargingState();

    setBatteryLevel() {
        this.setState({
            level: this.state.battery.level,
        });
    }

    setChargingState() {
        this.setState({
            charging: this.state.battery.charging,
        });
    }

    componentWillUnmount() {
        this.state.battery.removeEventListener('levelchange', this.levelListener);
        this.state.battery.removeEventListener('chargingchange', this.chargingListener);
    }

    render() {
        const classes = classnames(styles['battery__inner'], {
            [styles['battery__inner--low']]: this.state.level < 0.3,
        });

        return (
            <div className={styles.battery}>
                <span className={styles['battery__text']}>
                    {this.state.charging && <Icon name="lightning" size="text" className={styles['battery__lightning']}/>} {`${this.state.level * 100}%`}</span>
                <div className={classes} style={`width: ${this.state.level * 100}%;`}></div>
            </div>
        );
    }
};
