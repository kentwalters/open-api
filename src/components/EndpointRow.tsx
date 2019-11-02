import React from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import EndPointDetail from "./EndpointDetail";
import Badge from 'react-bootstrap/Badge';

export default class EndpointRow extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            open: false
        }
    }

    mapMethodToBadgeVariant(method: string) {
        switch (method) {
            case 'get':
                return 'success';
            case 'post':
                return 'info';
            case 'delete':
                return 'danger';
            case 'put':
                return 'warning';
            default:
                return 'secondary';
        }
    }

    render() {
        const { open } = this.state;

        return (
            <div>
                <div className='end-point-row'>
                    <Badge
                        variant={this.mapMethodToBadgeVariant(this.props.details.method)}
                    >{this.props.details.method.toUpperCase()}</Badge>
                    <p className='code'>{this.props.details.path}</p>
                    <p><b>{this.props.details.details.summary}</b></p>
                    <Button
                        variant='secondary'
                        className='end-point-row-last'
                        onClick={() => this.setState({ open: !open })}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >{this.state.open ? 'Close' : 'Try it'}</Button>
                </div>

                <Collapse in={this.state.open} >
                    <div id="example-collapse-text" >
                        <EndPointDetail
                            api={this.props.api}
                            path={this.props.details.path}
                            method={this.props.details.method}
                            request={this.props.details.details}/>
                    </div>
                </Collapse>
            </div>

        )
    }
}
