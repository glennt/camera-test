import React from "react";
import autoBind from "react-autobind";

class ModeButtons extends React.PureComponent {

	constructor(props) {
		super(props);
		autoBind(this);
	}

	handleChangeMode(mode) {
		if (this.props.onChangeMode) {
			this.props.onChangeMode(mode);
		}
	}

	render() {
		let baseButtonStyle = "camera-mode-button";
		return (
			<div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
				<div className={(this.props.mode === "image") ? baseButtonStyle + " camera-mode-button-selected" : baseButtonStyle} onClick={(e) => { this.handleChangeMode("image") }}>Photo</div>
				<div className={(this.props.mode === "video") ? baseButtonStyle + " camera-mode-button-selected" : baseButtonStyle} onClick={(e) => { this.handleChangeMode("video") }}>Video</div>
			</div>
		)
	}

}


export default ModeButtons;