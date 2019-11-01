import React from 'react';
import Button from 'react-bootstrap/Button';

export default class EndPointRow extends React.Component<any, any> {
    render() {
        return (
            <div className='end-point-row'>
                <Button>GET</Button>
                <p className='code'>path</p>
                <p>description</p>
            </div>
        )
    }
}
