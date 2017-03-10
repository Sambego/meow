import render from 'preact-render-to-string';
import {h, render as PreactRender} from 'preact';
import {Icon} from '../../src/js/Components';

describe('Icon', () => {
    const icon = 'browser';
    const color = 'tomato';

    it('should render correctly', () => {
        const iconElement = render(
            <Icon icon={icon} color={color} />
        );

        expect(iconElement).toMatchSnapshot();
    });

    it('should add an icon class', () => {
        const iconElement = PreactRender(
            <Icon name={icon }/>
        );

        expect(iconElement.classList.contains(`icon--${icon}`)).toBeTruthy();
    });

    it('should add an icon size class', () => {
        const iconElement = PreactRender(
            <Icon name={icon} size="small" />
        );

        expect(iconElement.classList.contains('icon--small')).toBeTruthy();
    });
});
