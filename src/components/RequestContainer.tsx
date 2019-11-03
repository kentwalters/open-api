import React from 'react';
import Collapse from 'react-bootstrap/Collapse';

export default class RequestContainer extends React.Component<any, any> {
    render() {
        return(
            <Collapse in={this.props.open}>
                <div>
                    <p className='mb-0'><b>Request</b> config:</p>
                    <div className='response-data-block'>
                        <pre>{JSON.stringify(this.props.request, null, 2)}</pre>
                    </div>
                </div>
            </Collapse>
        )
    }
}
