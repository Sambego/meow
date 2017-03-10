import render from 'preact-render-to-string';
import {h} from 'preact';
import {Header} from '../../src/js/Components';

describe('Header', () => {
    it('should render correctly', () => {
        const header = render(
            <Header />
        );

        expect(header).toMatchSnapshot();
    });
});
