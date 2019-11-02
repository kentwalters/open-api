import React, {RefObject} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import RequestBuilder, {RequestResponseState} from "../lib/RequestBuilder";
import ResponseContainer from "./ResponseContainer";
import SB from '../lib/StringBuilder';
import ResponseList from "./ResponseList";

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
        let rb = new RequestBuilder(this.props.baseUrl);
        rb.request(this.props.method, this.props.path, this.state.args, this.handleResponse, [])
    };

    handleResponse = (response: RequestResponseState ) => {
        this.setState({
            response: response,
            openPanel: true
        });
    };

    handleChange = (event: any) => {
        const value = event.target.value;
        const param = event.target.id;

        let oldArgs: any = {...this.state.args};
        oldArgs[param] = value;

        this.setState(() => ({
            args: oldArgs
        }));
    };

    render() {
        return (
            <div className='end-point-detail'>
                <p>{this.props.request.description}</p>

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
                                        {new SB().getParameterString(param)}
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


                <ResponseList responses={this.props.request.responses}/>

                {/*{Object.keys(this.props.request.responses).map((response:any) => {*/}
                    {/*return (*/}
                        {/*<p*/}
                            {/*key={response}*/}
                            {/*className='code'*/}
                        {/*>{response}: {this.props.request.responses[response].description}</p>*/}
                    {/*)*/}
                {/*})}*/}
            </div>
        )
    }
}

