import React from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";
import ReactMarkdown from 'react-markdown';

export default class ApiInfo extends React.Component<any, any> {
    render() {
        return(
            <Jumbotron>
                <h1>{this.props.info.title}</h1>
                <ReactMarkdown source={this.props.info.description}/>
                <p>Version: {this.props.info.version}</p>
            </Jumbotron>
        )
    }
}
