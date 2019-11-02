import React from 'react';
import Collapse from 'react-bootstrap/Collapse';

export default class ResponseContainer extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return(
            <Collapse in={this.props.open}>
                <div>
                    <p>{this.props.response.statusText}: {this.props.response.status}</p>
                    <div className='response-data-block'>
                        <pre>{JSON.stringify(this.props.response.data, null, 2)}</pre>
                    </div>
                </div>
            </Collapse>
        )
    }
}
