import React, { Component } from 'react';
import './App.css';
import autoBind from "react-autobind";
import Camera from "./components/camera";

class App extends Component {

	constructor(props) {
		super(props);
		autoBind(this);
	}


	render() {

		return (
			<div className="App">
				<Camera/>
			</div>
		);
	}
}

export default App;
