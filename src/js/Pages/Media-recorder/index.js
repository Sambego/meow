import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble, Cam} from '../../Components';
import {Speech} from '../../Services';
import Styles from './video.scss';

export default class MediaRecorderPage extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            recording: null,
            recordingUrl: null,
            recordingChunks: [],
        };
    }

    saveRecordingChunk(event) {
        this.state.recordingChunks.push(event.data);
    }

    saveRecording(event) {
        this.setState({
            recordingUrl: URL.createObjectURL(new Blob(this.state.recordingChunks, {
                type: 'audio/ogg; codecs=opus',
            })),
            recordingChunks: [],
        });
    }

    setupRecording(stream) {
        this.setState({recording: new MediaRecorder(stream)});

        this.state.recording.start();
        this.state.recording.ondataavailable = ::this.saveRecordingChunk;
        this.state.recording.onstop = ::this.saveRecording;
    }

    stopRecording() {
        this.state.recording.stop();
    }

    renderSlide() {
        return (
            <BubbleSlide previous="/media-recorder" next="/media-recorder-code" >
                <Bubble>So sam, I haven't seen you in a while, why don't you send me a nice video message?</Bubble>
                <Bubble><Cam onReady={::this.setupRecording}/></Bubble>
                <Bubble onShow={::this.stopRecording}><video autoplay controls src={this.state.recordingUrl} className={Styles.video}></video></Bubble>
            </BubbleSlide>
        );
    }

    renderNoSupportMessage() {
        return (
            <BubbleSlide previous="/media-recorder" next="/media-recorder-code" >
                <Bubble>Unfortunately your browser does not support the <strong>media recorder API</strong>, try using another browser to see this example, or continue the presentation.</Bubble>
            </BubbleSlide>
        );
    }

    render() {
        if (!('MediaRecorder' in window)) {
            return this.renderNoSupportMessage();
        }

        return this.renderSlide();
    }
};
