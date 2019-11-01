import React from 'react';
import './App.css';
import UrlInput from './components/UrlInput';
import Row from 'react-bootstrap/row';
import Col from 'react-bootstrap/Col';
import ApiInfo from "./components/ApiInfo";
import EndPointBlock from "./components/EndPointBlock";
import SwaggerParser from 'swagger-parser';

const sampleJson = require('./swagger.json');

export default class App extends React.Component{
    constructor(props: any) {
        super(props)

        console.log(sampleJson)

        SwaggerParser.validate(sampleJson, (err, api) => {
            if (err) {
                console.error(err)
            }
            if(api) {
                console.log("API name: %s, Version: %s", api.info.title, api.info.version);
            }

        })
    }

    render() {
        return (
            <div className='width-wrapper'>
                <Row>
                    <Col>
                        <UrlInput></UrlInput>
                        <ApiInfo/>
                        <EndPointBlock/>
                    </Col>
                </Row>
            </div>

        );
    }
}
