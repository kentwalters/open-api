import React from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";
import EndPointHeader from "./EndPointHeader";
import EndPointList from "./EndPointList";

export default class EndPointBlock extends React.Component {

    render() {
        return(
            <div>
                <EndPointHeader/>
                <EndPointList/>
            </div>
        )
    }
}
