import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import yaml from 'js-yaml';

export default class UrlInput extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            url: ''
        }
    }

    loadApi = () => {
        let type = this.state.url.slice(-4);

        axios.create({
            baseURL: '',
            responseType: type === 'json' ? 'json' : 'text'
        });

        axios.get(this.state.url)
            .then((response: any) => {
                let data = response.data;

                if (type === 'json') {
                    this.props.gotNewApi(data)
                }

                if (type === 'yaml') {
                    this.props.gotNewApi(yaml.safeLoad(data))
                }

            })
            .catch(error => {
                console.log(error)
            });

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
                        aria-label="Open API Url Input"
                        aria-describedby="basic-addon2"
                        value={this.state.url}
                        onChange={this.handleChange}
                    />
                    <InputGroup.Append>
                        <Button onClick={this.loadApi} variant="outline-secondary">Load</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        )
    }
}
