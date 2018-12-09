import React from 'react';
import Webcam from "react-webcam";
import autoBind from "react-autobind";
import RecordRTC from "recordrtc";
import FontAwesome from "react-fontawesome";
import {
	Button
} from "react-bootstrap";
import _ from "lodash";

class Camera extends React.PureComponent {

	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			recording: false,
			preview: false
		}
	}

	startRecording() {
		let stream = this.webcam.stream;

		let recorder = new RecordRTC(stream, { type: 'video' });
		recorder.startRecording();

		this.setState({
			mode: "video",
			recorder: recorder,
			recording: true
		});
	}

	stopRecording() {
		let recorder = this.state.recorder;

		recorder.stopRecording(() => {

			this.setState({
				recording: false,
				preview: true,
				videoPreviewUrl: recorder.toURL()
			});
		});
	}

	handleAccept() {
		let recorder = this.state.recorder;

		if (this.props.onAccept) {
			this.props.onAccept({
				type: "video",
				blob: recorder.getBlob()
			});
		}
	}

	handleRetake() {
		let recorder = this.state.recorder;
		if (!_.isUndefined(recorder)) {
			recorder.clearRecordedData();
		}
		this.setState({
			preview: false,
			recording: false,
			recorder: undefined
		});
	}

	renderCapture() {
		let startRecordingButton = (this.state.recording === false) ? <div style={{ color: "red", fontSize: "48px" }}><FontAwesome name="circle" onClick={this.startRecording} style={{ cursor: "pointer" }} /></div> : null;
		let stopRecordingButton = (this.state.recording) ? <div style={{ color: "#a3a3a3", fontSize: "48px" }}><FontAwesome onClick={this.stopRecording} name="stop-circle" style={{ cursor: "pointer" }} /></div> : null;

		return (
			<div className="camera-container">
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div>
						<Webcam ref={e => this.webcam = e} />
					</div>
					{startRecordingButton}
					{stopRecordingButton}
				</div>
			</div>
		);
	}

	renderPreview() {
		return (<div className="camera-container">
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div>
					<video src={this.state.videoPreviewUrl} controls />
				</div>
				<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
					<Button onClick={this.handleRetake}>Retake</Button>
					<Button onClick={this.handleAccept} bsStyle="primary">Accept</Button>
				</div>
			</div>
		</div>)
	}

	render() {
		if (this.state.preview) {
			return this.renderPreview();
		} else {
			return this.renderCapture();
		}
	}
}

export default Camera;
