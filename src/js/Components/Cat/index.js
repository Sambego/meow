import {h, render, Component} from 'preact';
import {Icon} from '../';
import styles from './cat.scss';
import {Cat as CatService} from '../../Services';

export default class Cat extends Component {
    constructor(...props) {
        super(...props);

        this.state = {
            cat: CatService.random(),
        };

        CatService.on(cat => this.setState({cat}));
    }

    render() {
        return (
            <div dangerouslySetInnerHTML={{__html: this.state.cat}} className={styles.cat} />
        );
    }
};
