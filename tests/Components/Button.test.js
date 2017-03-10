import render from 'preact-render-to-string';
import {h, render as PreactRender} from 'preact';
import {Button} from '../../src/js/Components';

describe('Button', () => {
    const icon = 'browser';
    const color = 'tomato';

    it('should render correctly', () => {
        const buttonElement = render(
            <Button />
        );

        expect(buttonElement).toMatchSnapshot();
    });

    it('should render as a anchor element', () => {
        const link = 'https://www.google.com';
        const buttonElement = PreactRender(
            <Button href={link}/>
        );

        expect(buttonElement.tagName).toBe('A');
    });

    it('should render as a button element', () => {
        const link = 'https://www.google.com';
        const buttonElement = PreactRender(
            <Button />
        );

        expect(buttonElement.tagName).toBe('BUTTON');
    });

    it('should render an icon', () => {
        const link = 'https://www.google.com';
        const buttonElement = PreactRender(
            <Button icon="browser"/>
        );

        expect(buttonElement.querySelector('.button__icon')).toBeTruthy();
    });
});
