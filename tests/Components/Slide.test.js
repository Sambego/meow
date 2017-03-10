import render from 'preact-render-to-string';
import {h, render as PreactRender} from 'preact';
import {Slide} from '../../src/js/Components';

describe('Icon', () => {
    const content = <p>content</p>;
    const previous = '/previous';
    const next = '/next';

    it('should render correctly', () => {
        const slide = render(
            <Slide previous={previous} next={next}>
                {content}
            </Slide>
        );

        expect(slide).toMatchSnapshot();
    });

    it('should add a previous slide button', () => {
        const slide = PreactRender(
            <Slide previous={previous}>
                {content}
            </Slide>
        );

        expect(slide.querySelector(`a[href="${previous}"]`)).toBeTruthy();
        expect(slide.querySelector(`a[href="${next}"]`)).toBeFalsy();
    });

    it('should add next slide button', () => {
        const slide = PreactRender(
            <Slide next={next}>
                {content}
            </Slide>
        );

        expect(slide.querySelector(`a[href="${previous}"]`)).toBeFalsy();
        expect(slide.querySelector(`a[href="${next}"]`)).toBeTruthy();
    });

    it('should add both previous and next slide buttons', () => {
        const slide = PreactRender(
            <Slide previous={previous} next={next}>
                {content}
            </Slide>
        );

        expect(slide.querySelector(`a[href="${previous}"]`)).toBeTruthy();
        expect(slide.querySelector(`a[href="${next}"]`)).toBeTruthy();
    });
});
