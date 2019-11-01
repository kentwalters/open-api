import React from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";

export default class ApiInfo extends React.Component<any, any> {
    render() {
        return(
            <Jumbotron>
                <h1>{this.props.info.title}</h1>
                <p>{this.props.info.description}</p>
                <p>Version: {this.props.info.version}</p>
            </Jumbotron>
        )
    }
}
