import React from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";

export default class ApiInfo extends React.Component {

    render() {
        return(
            <Jumbotron>
                <h1>Swagger Petstore</h1>
                <p>This is a sample server Petstore server. You can find out more about Swagger at http://swagger.io or on irc.freenode.net, #swagger. For this sample, you can use the api key special-key to test the authorization filters.</p>
                <p>Version: 1.0.3</p>
            </Jumbotron>
        )
    }
}
