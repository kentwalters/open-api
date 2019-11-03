import React from 'react';
import './App.css';
import UrlInput from './components/UrlInput';
import ApiInfo from "./components/ApiInfo";
import EndPointBlock from "./components/EndpointBlock";
import ApiParser from "./lib/ApiParser";
import SettingsBlock from "./components/SettingsBlock";

// const defaultApiSpec = require('./swagger.json');
const defaultApiSpec = require('./uber.json');

export default class App extends React.Component<any, any>{
    api: any = defaultApiSpec;
    parser: ApiParser = new ApiParser();

    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            api: this.api,
            scheme: this.api.schemes[0]
        }
    }

    gotNewApi = (api: any) => {
        this.setState({
            api: api
        })
    };

    changeScheme = (scheme: string) => {
        this.setState({
            scheme: scheme
        });
    };

    render() {
        return (
            <div className='width-wrapper'>
                <UrlInput gotNewApi={this.gotNewApi}/>
                <ApiInfo info={this.state.api.info}/>
                <SettingsBlock set={this.changeScheme} schemes={this.state.api.schemes}/>
                <EndPointBlock
                    scheme={this.state.scheme}
                    baseUrl={this.parser.getBaseUrl(this.state.api)}
                    paths={this.parser.getPathsForMethod(this.state.api)}
                />
            </div>
        );
    }
}
