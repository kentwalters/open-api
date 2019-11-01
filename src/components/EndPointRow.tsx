import React from 'react';
import Button from 'react-bootstrap/Button';

export default class EndPointRow extends React.Component {
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
