import React from 'react';

export default class EndpointHeader extends React.Component<any, any> {
    render() {
        return(
            <div className='end-point-header'>
                <h3>{this.props.tag.name}</h3>
                <p className='end-point-description'>{this.props.tag.description}</p>
            </div>
        )
    }
}
