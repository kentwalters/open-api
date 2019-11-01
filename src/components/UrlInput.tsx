import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class UrlInput extends React.Component {

    loadApi() {
        axios.create({
            baseURL: '',
            responseType: 'json'
        })

        axios.get('https://petstore.swagger.io/v2/swagger.json')
            .then((data) => {
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })

    }

    render() {
        return(
            <div>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="https://petstore.swagger.io/v2/swagger.json"
                        aria-label="Open API Url"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button onClick={this.loadApi} variant="outline-secondary">Load</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        )
    }
}
