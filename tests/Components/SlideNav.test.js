import render from 'preact-render-to-string';
import {h, render as PreactRender} from 'preact';
import {SlideNav} from '../../src/js/Components';

describe('Icon', () => {
    const to = '/link';

    it('should render correctly', () => {
        const slideNav = render(
            <SlideNav direction="left" to={to} />
        );

        expect(slideNav).toMatchSnapshot();
    });

    it('should be a left button', () => {
        const slideNav = PreactRender(
            <SlideNav direction="left" to={to} />
        );

        expect(slideNav.classList.contains('slide-nav--left')).toBeTruthy();
        expect(slideNav.classList.contains('slide-nav--right')).toBeFalsy();
        expect(slideNav.getAttribute('href')).toBe(to);
    });

    it('should be a right button', () => {
        const slideNav = PreactRender(
            <SlideNav direction="right" to={to} />
        );

        expect(slideNav.classList.contains('slide-nav--left')).toBeFalsy();
        expect(slideNav.classList.contains('slide-nav--right')).toBeTruthy();
        expect(slideNav.getAttribute('href')).toBe(to);
    });
});
