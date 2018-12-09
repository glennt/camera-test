import React from 'react';
import Webcam from "react-webcam";
import autoBind from "react-autobind";
import RecordRTC from "recordrtc";
import FontAwesome from "react-fontawesome";
import {
	Button
} from "react-bootstrap";
import _ from "lodash";
import ModeButtons from "./modeButtons";

class Camera extends React.PureComponent {

	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			mode: this.props.mode ? this.props.mode : "video",
			preview: false,
			video: {
				recording: false
			},
			image: {
			}
		}
	}

	handleChangeMode(mode) {

		if (this.state.mode === "video" && mode !== "video") {
			this.clearRecorderData();
		}

		this.setState({
			mode: mode,
			preview: false
		});
	}

	takeScreenshot() {
		const imageSrc = this.webcam.getScreenshot();

		this.setState({
			preview: true,
			image: {
				imagePreviewSrc: imageSrc
			}
		});
	}

	startRecording() {
		let stream = this.webcam.stream;

		let recorder = new RecordRTC(stream, { type: 'video' });
		recorder.startRecording();

		this.setState({
			video: {
				recorder: recorder,
				recording: true
			}
		});
	}

	stopRecording() {
		let recorder = this.state.video.recorder;

		recorder.stopRecording(() => {

			this.setState({
				preview: true,
				video: {
					recording: false,
					videoPreviewUrl: recorder.toURL()
				}
			});
		});
	}

	handleAcceptVideo() {
		let recorder = this.state.recorder;

		if (this.props.onAccept) {
			this.props.onAccept({
				type: "video",
				blob: recorder.getBlob()
			});
		}
	}

	handleRetakeVideo() {
		this.clearRecorderData();
		this.setState({
			preview: false,
			video: {
				recording: false,
				recorder: undefined
			}
		});
	}

	handleAcceptImage() {
		if (this.props.onAccept) {
			this.props.onAccept({
				type: "image",
				data: this.state.imagePreviewSrc
			})
		}
	}

	handleRetakeImage() {
		this.setState({
			preview: false,
			image: {
				imagePreviewSrc: undefined
			}
		})
	}

	clearRecorderData() {
		let recorder = _.get(this.state, "video.recorder");
		if (!_.isUndefined(recorder)) {
			recorder.stopRecording(() => {
				recorder.clearRecordedData();
			});
		}
		this.setState({
			video: {
				recording: false
			}
		})
	}

	render() {
		if (this.state.preview) {
			return this.renderPreview();
		} else {
			return this.renderCapture();
		}
	}


	renderCapture() {
		let modeButtons = <ModeButtons mode={this.state.mode} onChangeMode={this.handleChangeMode} />;

		let controls = (this.state.mode === "video") ? this.renderVideoCaptureControls() : this.renderImageCaptureControls();

		return (
			<div className="camera-container">
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div>
						<Webcam ref={e => this.webcam = e} />
					</div>
					{modeButtons}
					{controls}
				</div>
			</div>
		);
	}

	renderVideoCaptureControls() {
		let { video } = this.state;

		if (video.recording) {
			return <div style={{ color: "#a3a3a3", fontSize: "48px" }}><FontAwesome onClick={this.stopRecording} name="stop-circle" style={{ cursor: "pointer" }} /></div>;
		} else {
			return <div style={{ color: "red", fontSize: "48px" }}><FontAwesome name="circle" onClick={this.startRecording} style={{ cursor: "pointer" }} /></div>
		}
	}

	renderImageCaptureControls() {
		return <div style={{ color: "#a3a3a3", fontSize: "48px" }}><FontAwesome name="camera" onClick={this.takeScreenshot} style={{ cursor: "pointer" }} /></div>;
	}

	renderPreview() {
		if (this.state.mode === "video") {
			return this.renderVideoPreview();
		} else {
			return this.renderImagePreview();
		}
	}

	renderVideoPreview() {
		return (<div className="camera-container">
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div>
					<video src={this.state.video.videoPreviewUrl} controls />
				</div>
				<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
					<Button onClick={this.handleRetakeVideo}>Retake</Button>
					<Button onClick={this.handleAcceptVideo} bsStyle="primary">Accept</Button>
				</div>
			</div>
		</div>)
	}

	renderImagePreview() {
		return (<div className="camera-container">
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div>
					<img alt="" src={this.state.image.imagePreviewSrc} />
				</div>
				<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
					<Button onClick={this.handleRetakeImage}>Retake</Button>
					<Button onClick={this.handleAcceptImage} bsStyle="primary">Accept</Button>
				</div>
			</div>
		</div>);
	}

}

export default Camera;