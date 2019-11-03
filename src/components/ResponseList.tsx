import React from 'react';

export default class ResponseList extends React.Component<any, any> {
    render() {
        return(
            <div className='mt-4'>
                <h5>Responses</h5><hr></hr>
                <div className='code'>
                {Object.keys(this.props.responses).map(key => {
                    const code = key;
                    const description = this.props.responses[key].description;

                    return(
                        <p key={code}>{code}: {description}</p>
                    )
                })}
                </div>
            </div>
        )
    }
}
