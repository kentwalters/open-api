import React from 'react';

export default class ResponseList extends React.Component<any, any> {
    render() {
        return(
            <div>
                <h5>Responses</h5><hr></hr>
                {Object.keys(this.props.responses).map(key => {
                    const code = key;
                    const description = this.props.responses[key].description;

                    return(
                        <p>{code}: {description}</p>
                    )
                })}
            </div>
        )
    }
}
