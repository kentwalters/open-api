import React from 'react';
import './App.css';
import UrlInput from './components/UrlInput';
import ApiInfo from "./components/ApiInfo";
import EndPointBlock from "./components/EndpointBlock";
import SwaggerParser from 'swagger-parser';
import ApiParser from "./lib/ApiParser";

const sampleJson = require('./swagger.json');
// const sampleJson = require('./uber.json');
// const sampleJson = require('./swagger.yaml');

export default class App extends React.Component<any, any>{
    api: any = sampleJson;
    parser: ApiParser = new ApiParser();

    constructor(props: any, context: any) {
        super(props, context);
        this.state = this.generateState(this.api);
    }

    generateState(fromApi: any) {
        return {
            tags: fromApi.tags,
            info: fromApi.info,
            paths: this.parser.getPathsForMethod(fromApi),
            api: fromApi
        }
    }

    gotNewApi = (api: any) => {
        this.setState(this.generateState(api))
    };

    render() {
        return (
            <div className='width-wrapper'>
                <UrlInput gotNewApi={this.gotNewApi}/>
                <ApiInfo info={this.state.info}/>

                {this.parser.getTags(this.state).map((tag: any) => {
                    return (<EndPointBlock api={this.state.api} key={tag.name} tag={tag} paths={this.state.paths}/>)
                })}
            </div>

        );
    }
}

// The subset of the OpenAPI spec that this application currently supports
interface ParsedApi {
    info: {
        "description": string,
        "version": string,
        "title": string,
        "termsOfService": string,
        "contact":{
            "email": string
        },
        "license":{
            "name": string,
            "url":string
        }
    }
    tags: [
        {
            "name": string,
            "description": string,
            "paths": [

                ]
        }
        ]
}
