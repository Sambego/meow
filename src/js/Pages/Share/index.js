import { h, render, Component } from 'preact';
import { BubbleSlide, Bubble } from '../../Components';
import Config from '../../Config';
import Image1 from '../../../img/share.png';

export default class SharePage extends Component {
    render() {
        return (
            <BubbleSlide previous="/share" next="/share-code">
                <Bubble onShow={this.share}>
                    Wouldn't it be nice to use the native share tray when
                    sharing a page on a mobile device?
                </Bubble>
                <Bubble>
                    <img
                        style={{ width: '100%' }}
                        src={Image1}
                        alt="Preview of the native share tray opened by a website."
                    />
                </Bubble>
            </BubbleSlide>
        );
    }
}
