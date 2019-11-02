import React, {RefObject} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import RequestBuilder from "../lib/RequestBuilder";
import ResponseContainer from "./ResponseContainer";

export default class EndpointDetail extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            args: {},
            response: {
                status: null,
                statusText: null,
                data: null
            },
            openPanel: false,
        }

    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        let rb = new RequestBuilder(this.props.api);

        rb.request(this.props.method, this.props.path, this.state.args)
            .then(resp => {
                console.log(resp)

                this.setState({
                    response: {
                        status: resp.status,
                        statusText: resp.statusText,
                        data: resp.data
                    },
                    openPanel: true
                });
            })
            .catch(error => {
                console.log(error.response)
                this.setState({
                    response: {
                        status: error.response.status,
                        statusText: error.response.statusText,
                        data: error.response.data
                    },
                    openPanel: true
                })
            })
    };

    getParameterString(param: any) {
        let str = '';

        str += param.required? 'Required' : 'Optional';

        str += param.type ? ' | ' + param.type : '';

        str += param.format ? ': ' + param.format : '';

        return str
    }

    handleChange = (event: any) => {
        const value = event.target.value;
        const param = event.target.id;

        let ob: any = {};
        ob[param] = value;

        console.log(value)
        console.log(param)

        this.setState((prevState: any)=> ({
            args: ob
        }));
    };

    render() {
        return (
            <div className='end-point-detail'>

                <h5>Parameters</h5><hr></hr>
                <div className='request-form-container'>
                    <Form onSubmit={this.handleSubmit}>
                        {this.props.request.parameters.map((param:any) => {
                            return (
                                <Form.Group key={param.name} controlId={param.name}>
                                    <Form.Label>{param.name}</Form.Label>
                                    <Form.Control
                                        onChange={this.handleChange}
                                        type=""
                                        placeholder={param.name} />
                                    <Form.Text className="text-muted">
                                        {this.getParameterString(param)}
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

                <ResponseContainer open={this.state.openPanel} response={this.state.response}/>

                <h5>Responses</h5><hr></hr>
                {Object.keys(this.props.request.responses).map((response:any) => {
                    return (
                        <p
                            key={response}
                            className='code'
                        >{response}: {this.props.request.responses[response].description}</p>
                    )
                })}
            </div>
        )
    }
}

