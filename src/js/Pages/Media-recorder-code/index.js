import {h, render, Component} from 'preact';
import {BubbleSlide, Bubble, Code} from '../../Components';

export default class MediaRecorderCodePage extends Component {
    codeExample1 = 'navigator.mediaDevices.getUserMedia({\n    video: true, // We want video\n    audio: true, // We want audio\n}).then(stream => {\n    // We now have access to a video/audio stream\n});';
    codeExample2 = 'videoElement.srcObject = stream;'
    codeExample3 = 'const recorder = new MediaRecorder(stream);'
    codeExample4 = 'recording.ondataavailable = saveRecordingChunk;\nrecording.onstop = saveRecording;\nrecording.start();'
    codeExample5 = 'const chunks = [];\nconst saveRecordingChunk = event => {\n    chunks.push(event.data);\n}';
    codeExample6 = 'const chunks = [];\nconst saveRecordingChunk = event => {...};\n\nconst saveRecording = event => {\n    const recordingBlob = new Blob(chunks, {\n        type: \'video/webm\',\n    });\n    const finishedRecording =\n        URL.createObjectURL(recordingBlob);\n\n    videoElement.src = finishedRecording;\n};';

    render() {
        return (
            <BubbleSlide previous="/media-recorder-example" next="/head-tracking-bonus">
                <Bubble>First things first. We need to access the user's webcam and microphone. We'll do this by using <code>getUserMedia()</code>.</Bubble>
                <Bubble><Code code={this.codeExample1} /></Bubble>
                <Bubble>An easy way to preview your video stream is to pass it to a video element.</Bubble>
                <Bubble><Code code={this.codeExample2} /></Bubble>
                <Bubble>Now that we have access to a video stream, we can pass it to a <code>MediaRecorder</code> instance.</Bubble>
                <Bubble><Code code={this.codeExample3} /></Bubble>
                <Bubble>Once we have created a new <code>MediaRecorder</code> instance, we can setup some event handlers and start the recording.</Bubble>
                <Bubble><Code code={this.codeExample4} /></Bubble>
                <Bubble>The <code>ondataavailable</code> handler will look something like this.</Bubble>
                <Bubble><Code code={this.codeExample5} /></Bubble>
                <Bubble>When we're done recording, we can combine all chunks into a complete recording.</Bubble>
                <Bubble><Code code={this.codeExample6} /></Bubble>
            </BubbleSlide>
        );
    }
};
