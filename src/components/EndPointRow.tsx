import React from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import EndPointDetail from "./EndPointDetail";

export default class EndPointRow extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context)
        this.state = {
            open: false
        }
    }



    render() {
        const { open } = this.state;

        return (
            <div>
                <div className='end-point-row'>
                    <Button>{this.props.details.method.toUpperCase()}</Button>
                    <p className='code'>{this.props.details.path}</p>
                    <p><b>{this.props.details.details.summary}</b></p>
                    <Button
                        variant='secondary'
                        className='end-point-row-last'
                        onClick={() => this.setState({ open: !open })}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >Try it</Button>
                </div>

                <Collapse in={this.state.open} >
                    <div id="example-collapse-text" >
                        <EndPointDetail request={this.props.details.details}/>
                    </div>
                </Collapse>
            </div>

        )
    }
}
