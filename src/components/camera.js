import React, { Component } from 'react';
import autoBind from "react-autobind";
import CameraImage from "./cameraImage";
import CameraVideo from "./cameraVideo";

class Camera extends React.PureComponent {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
        }
    }

    render() {

        let component;
        if(this.state.mode === "video") {
            component = <CameraVideo />
        } else {
            component = <CameraImage />
        }


        return(
            <div className="camera-container">
                {component}
            </div>
        )
    }
}

export default Camera;