import React from 'react';
import './App.css';
import UrlInput from './components/UrlInput';
import Row from 'react-bootstrap/row';
import Col from 'react-bootstrap/Col';
import ApiInfo from "./components/ApiInfo";
import EndPointBlock from "./components/EndPointBlock";
import SwaggerParser from 'swagger-parser';

const sampleJson = require('./swagger.json');
// const sampleJson = require('./uber.json');

export default class App extends React.Component<any, any>{
    api: any = sampleJson;

    constructor(props: any, context: any) {
        super(props, context);
        this.state = this.generateState(this.api);
    }

    generateState(fromApi: any) {
        return {
            tags: fromApi.tags,
            info: fromApi.info,
            paths: this.transformApiDoc(fromApi)
        }
    }

    transformApiDoc(api: any) {
        let trans: any[] = [];

        Object.keys(api.paths).forEach((path: any) => {

            Object.keys(api.paths[path]).forEach(method => {
                let ob: any = {};
                ob.method = method;
                ob.path = path;
                ob.details = api.paths[path][method];
                ob.tag = api.paths[path][method]['tags'][0];

                trans.push(ob)

            })
        });

        return trans;
    }

    gotNewApi = (api: any) => {
        this.setState(this.generateState(api))
    }

    render() {
        if (this.api) {

            return (
                <div className='width-wrapper'>
                    <Row>
                        <Col>
                            <UrlInput gotNewApi={this.gotNewApi}/>
                            <ApiInfo info={this.state.info}/>

                            {this.state.tags.map((tag: any) => {
                                return (<EndPointBlock tag={tag} paths={this.state.paths}/>)
                            })}

                        </Col>
                    </Row>
                </div>

            );
        }
    }
}
