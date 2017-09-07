import { h, render, Component } from 'preact';
import { Location } from '../../Services';
import { Bubble, Loader } from '../';
import Styles from './news.scss';

export default class News extends Component {
    constructor(...args) {
        super(...args);

        fetch(
            `//newsapi.org/v1/articles?source=hacker-news&sortBy=top&apiKey=${process
                .env.NEWS_API_KEY}`
        ).then(response => {
            response.json().then(news => this.setState({ news }));
        });
    }

    renderNews() {
        return (
            <ul className={Styles.news}>
                {this.state.news.articles.slice(0, 5).map(item =>
                    <li>
                        <a href={item.url}>
                            {item.title}
                        </a>
                    </li>
                )}
            </ul>
        );
    }

    render() {
        return (
            <Bubble noContainer>
                {this.state.news ? this.renderNews() : <Loader />}
            </Bubble>
        );
    }
}
