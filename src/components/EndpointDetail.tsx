import React, {RefObject} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import RequestBuilder from "../utils/RequestBuilder";
import ResponseContainer from "./ResponseContainer";

export default class EndpointDetail extends React.Component<any, any> {
    axios: any;

    constructor(props: any) {
        super(props);

        this.state = {
            args: [],
            response: null,
            status: null,
            statusText: null
        }

    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        let rb = new RequestBuilder(this.props.api);

        rb.request(this.props.method, this.props.path)
            .then(resp => {
                console.log(resp)

                this.setState({
                    status: resp.status,
                    statusText: resp.statusText
                });
            })
            .catch(error => console.log(error))
    };

    render() {
        return (
            <div className='end-point-detail'>

                <h5>Parameters</h5><hr></hr>
                <div className='request-form-container'>
                    <Form onSubmit={this.handleSubmit}>
                        {this.props.request.parameters.map((param:any) => {
                            return (
                                <Form.Group key={param.name} controlId={`formControl${param.name}`}>
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

                        <Button
                            variant="secondary"
                            type="submit">
                            Test
                        </Button>
                    </Form>
                </div>

                <ResponseContainer open={this.state.status != null}  status={this.state.status}/>

                <h5>Responses</h5><hr></hr>
                {Object.keys(this.props.request.responses).map((response:any) => {
                    return (
                        <p key={response} className='code'>{response}: {this.props.request.responses[response].description}</p>
                    )
                })}
            </div>
        )
    }
}

