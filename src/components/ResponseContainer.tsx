import React from 'react';
import Collapse from 'react-bootstrap/Collapse';

export default class ResponseContainer extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return(
            <Collapse in={this.props.open}>
                <p>{this.props.status}</p>
            </Collapse>

        )
    }
}
