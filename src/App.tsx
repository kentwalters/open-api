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
    api: any = sampleJson;

    render() {
        return (
            <div className='width-wrapper'>
                <Row>
                    <Col>
                        <UrlInput></UrlInput>
                        <ApiInfo info={this.api.info}/>
                        {this.api.tags.map((tag: any) => {
                            return(<EndPointBlock tag={tag} paths={this.api.paths}/>)
                        })}

                    </Col>
                </Row>
            </div>

        );
    }
}
