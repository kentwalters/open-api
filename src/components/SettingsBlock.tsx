import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class SettingsBlock extends React.Component<any, any> {

    handleSelect = (e: any) => {
        this.props.set(e.target.value)
    };

    render() {
        return(
            <div>
                <Row>
                    <Col lg={2}>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Control onChange={this.handleSelect} as="select">
                                    {this.props.schemes.map((scheme:any) => {
                                        return (<option>{scheme.toUpperCase()}</option>)
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}
