import { h, render, Component } from 'preact';
import { BubbleSlide, Bubble, Code } from '../../Components';

export default class ShareCode extends Component {
    codeExample1 = 'navigator.share({\n    title: document.title,\n    text: \'Hey, look at this awesome website!\',\n    url: document.location.href,\n});';

    render() {
        return (
            <BubbleSlide previous="/share-example" next="/offline">
                <Bubble>
                    You can open the native share dialog by calling the share
                    method on the navigator object.
                </Bubble>
                <Bubble>
                    <Code code={this.codeExample1} />
                </Bubble>
            </BubbleSlide>
        );
    }
}
