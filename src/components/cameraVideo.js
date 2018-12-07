import React, { Component } from 'react';
import Webcam from "react-webcam";
import autoBind from "react-autobind";
import RecordRTC from "recordrtc";

const VIDEO_MODE = "video";
const IMAGE_MODE = "image";

class Camera extends React.PureComponent {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            video: {
                recording: false
            },
            image: {

            }
        }
    }

    takeScreenshot() {
        const imageSrc = this.webcam.getScreenshot();

        this.setState({
            mode: "image",
            imagePreview: imageSrc
        })
    }

    startRecording() {
        let stream = this.webcam.stream;

        let recorder = new RecordRTC(stream, { type: 'video' });
        recorder.startRecording();

        this.setState({
            mode: "video",
            recorder: recorder,
            recording: true
        })
    }

    stopRecording() {
        let recorder = this.state.recorder;

        recorder.stopRecording(() => {

            this.setState({
                recording: false,
                videoPreviewUrl: recorder.toURL()
            })

        });
    }

    render() {

        let component;
        if(this.state.mode === VIDEO_MODE) {
            component = this.renderVideoMode();
        } else {
            component = this.renderImageMode();
        }


        return(
            <div className="camera-container">
                {component}
            </div>
        )
    }


    renderModeButtons() {

    }

    renderVideoMode() {
        return <div></div>
    }





    renderImageMode() {

        let imagePreview;
        if (this.state.imagePreview && this.state.mode === "image") {
            imagePreview = <img src={this.state.imagePreview}></img>;
        }

        let videoPreview;
        if (this.state.videoPreviewUrl && this.state.mode === "video") {
            videoPreview = <video src={this.state.videoPreviewUrl} controls />;
        }

        let startRecordingButton = (this.state.recording === false) ? <button onClick={this.startRecording}>Start recording</button> : null;
        let stopRecordingButton = (this.state.recording) ? <button onClick={this.stopRecording}>Stop recording</button> : null;

        return (
            <div className="camera-container">
                <div>
                    <div>
                        <Webcam ref={e => this.webcam = e} />
                    </div>
                    <button onClick={this.takeScreenshot}>Take Screenshot</button>
                    {startRecordingButton}
                    {stopRecordingButton}
                </div>
                <div>
                    <p>Preview</p>
                    {imagePreview}
                    {videoPreview}
                </div>
            </div>

        );
    }
}

export default Camera;
