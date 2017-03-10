import render from 'preact-render-to-string';
import {h, render as PreactRender} from 'preact';
import {Container} from '../../src/js/Components';

describe('Container', () => {
    it('should render correctly', () => {
        const content = <h1>Content</h1>;
        const container = render(
            <Container>
                {content}
            </Container>
        );

        expect(container).toMatchSnapshot();
    });

    it('should render child content', () => {
        const content = PreactRender(<h1>Content</h1>);
        const container = PreactRender(
            <Container>
                {content}
            </Container>
        );

        expect(container.querySelector('h1')).toBeTruthy();
    });
});
