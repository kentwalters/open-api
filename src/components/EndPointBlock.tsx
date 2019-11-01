import React from 'react';
import EndPointHeader from "./EndPointHeader";
import EndPointList from "./EndPointList";
import EndPointRow from "./EndPointRow";

export default class EndPointBlock extends React.Component<any, any> {

    render() {
        return(
            <div>
                <EndPointHeader tag={this.props.tag}/>
                {Object.keys(this.props.paths).map((path: any) => {
                    return (
                        <EndPointRow path={this.props.paths[path]}/>
                    )
                })}

            </div>
        )
    }
}
// // "paths":{
// "/pet/{petId}":{
//     "get":{
//         "tags":[
//             "pet"
//         ],
//             "summary":"Find pet by ID",
//             "description":"Returns a single pet",
//             "operationId":"getPetById",
//             "produces":[
//             "application/json",
//             "application/xml"
//         ],
//             "parameters":[
//             {
//                 "name":"petId",
//                 "in":"path",
//                 "description":"ID of pet to return",
//                 "required":true,
//                 "type":"integer",
//                 "format":"int64"
//             }
//         ],
            // "respons
//
