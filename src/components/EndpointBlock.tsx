import React from 'react';
import EndPointRow from "./EndpointRow";

export default class EndpointBlock extends React.Component<any, any> {
    render() {
        return(
            <div>
                {this.props.paths.map((path: any) => {
                    return(
                        <EndPointRow
                            scheme={this.props.scheme}
                            baseUrl={this.props.baseUrl}
                            key={path.path+path.method}
                            details={path}
                        />)
                })}
            </div>
        )
    }
}
