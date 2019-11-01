import React from 'react';
import Alert from 'react-bootstrap/Alert';
import EndPointRow from "./EndPointRow";

export default class EndPointList extends React.Component {
    render() {
        return(
            <div>
                <EndPointRow/>
                <EndPointRow/>
                <EndPointRow/>
                <EndPointRow/>
            </div>

        )
    }
}
