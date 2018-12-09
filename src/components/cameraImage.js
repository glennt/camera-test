import React from 'react';
import Webcam from "react-webcam";
import autoBind from "react-autobind";
import FontAwesome from "react-fontawesome";
import {
	Button
} from "react-bootstrap";
import _ from "lodash";

class CameraImage extends React.PureComponent {

	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
		}
	}

	takeScreenshot() {
		const imageSrc = this.webcam.getScreenshot();

		this.setState({
			preview: false,
			imagePreviewSrc: imageSrc
		});
	}

	handleAccept() {
		if (this.props.onAccept) {
			this.props.onAccept({
				type: "image",
				data: this.state.imagePreviewSrc
			})
		}
	}

	handleRetake() {
		this.setState({
			preview: false,
			imagePreviewSrc: undefined
		})
	}

	renderCapture() {
		return (
			<div className="camera-container">
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div>
						<Webcam ref={e => this.webcam = e} />
					</div>
					<div style={{ color: "#a3a3a3", fontSize: "48px" }}><FontAwesome name="camera" onClick={this.takeScreenshot} style={{ cursor: "pointer" }} /></div>
				</div>
			</div>
		);
	}

	renderPreview() {
		return (<div className="camera-container">
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div>
					<image src={this.state.imagePreviewSrc} />
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

export default CameraImage;
