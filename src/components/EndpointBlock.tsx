import React from 'react';
import EndPointHeader from "./EndpointHeader";
import EndPointRow from "./EndpointRow";

export default class EndpointBlock extends React.Component<any, any> {

    render() {
        return(
            <div>
                <EndPointHeader tag={this.props.tag}/>
                {
                    this.props.paths.filter((path: any) => path.tag === this.props.tag.name).map((path: any) => {
                        return (
                            <EndPointRow api={this.props.api} key={path.path+path.method} details={path}/>
                        )
                    })
                }

            </div>
        )
    }
}
