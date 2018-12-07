import React, { Component } from 'react';
import Webcam from "react-webcam";
import autoBind from "react-autobind";


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
            imagePreview: imageSrc
        })
    }



    render() {

        let imagePreview;
        if (this.state.imagePreview) {
            imagePreview = <img src={this.state.imagePreview}></img>;
        }

        return(
            <div>
                <div>
                    <Webcam ref={e => this.webcam = e} />
                </div>
                <button onClick={this.takeScreenshot}>Take Screenshot</button>
            </div>
        )
    }
}

export default CameraImage;
