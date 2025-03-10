import React from 'react';
import Collapse from 'react-bootstrap/Collapse';

export default class ResponseContainer extends React.Component<any, any> {

    render() {
        return(
            <Collapse in={this.props.open}>
                <div>
                    <p className='mb-0'><b>Response</b>: {this.props.response.status} {this.props.response.statusText} </p>
                    <div className='response-data-block'>
                        <pre>{JSON.stringify(this.props.response.data, null, 2)}</pre>
                    </div>
                </div>
            </Collapse>
        )
    }
}
