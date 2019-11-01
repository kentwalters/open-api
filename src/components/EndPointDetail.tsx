import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class EndPointDetail extends React.Component<any, any> {
    render() {
        console.log(this.props.request.parameters)
        return (
            <div className='end-point-detail'>

                <h5>Parameters</h5><hr></hr>
                <div className='request-form-container'>
                    <Form>
                        {this.props.request.parameters.map((param:any) => {
                            return (
                                <Form.Group controlId={`formControl${param.name}`}>
                                    <Form.Label>{param.name}</Form.Label>
                                    <Form.Control
                                        type=""
                                        placeholder={param.name} />
                                    <Form.Text className="text-muted">
                                        {param.required? 'Required' : 'Optional'}
                                    </Form.Text>
                                </Form.Group>
                            )
                        })}

                        <Button variant="primary" type="submit">
                            Test
                        </Button>
                    </Form>
                </div>


                <h5>Responses</h5><hr></hr>
                {Object.keys(this.props.request.responses).map((response:any) => {
                    return (
                        <p>{response}: {this.props.request.responses[response].description}</p>
                    )
                })}
            </div>
        )
    }
}

{/*<p>{param}: {this.props.request.parameters[param].name}</p>*/}

// ete":{
// "tags":[
//     "pet"
// ],
//     "summary":"Deletes a pet",
//     "description":"",
//     "operationId":"deletePet",
//     "produces":[
//     "application/json",
//     "application/xml"
// ],
//     "parameters":[
//     {
//         "name":"api_key",
//         "in":"header",
//         "required":false,
//         "type":"string"
//     },
//     {
//         "name":"petId",
//         "in":"path",
//         "description":"Pet id to delete",
//         "required":true,
//         "type":"integer",
//         "format":"int64"
//     }
// ],
//     "responses":{
//     "400":{
//         "description":"Invalid ID supplied"
//     },
//     "404":{
//         "description":"Pet not found"
//     }
// },
// "security":[
//     {
//         "petstore_auth":[
//             "write:pets",
//             "read:pets"
//         ]
//     }
// ]
