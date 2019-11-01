import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class UrlInput extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            url: ''
        }
    }

    //  https://petstore.swagger.io/v2/swagger.json

    loadApi = () => {
        axios.create({
            baseURL: '',
            responseType: 'json'
        });


        axios.get(this.state.url)
            .then((data: any) => {
                this.props.gotNewApi(data.data)
            })
            .catch(error => {
                console.log(error)
            })

    };

    handleChange = (e: any) => {
        this.setState({
            url: e.target.value
        })
    };

    render() {
        return(
            <div>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="https://petstore.swagger.io/v2/swagger.json"
                        aria-label="Open API Url"
                        aria-describedby="basic-addon2"
                        value={this.state.url}
                        onChange={this.handleChange.bind(this)}
                    />
                    <InputGroup.Append>
                        <Button onClick={this.loadApi} variant="outline-secondary">Load</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        )
    }
}
