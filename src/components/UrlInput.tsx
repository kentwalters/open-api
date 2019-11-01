import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default class UrlInput extends React.Component {

    render() {
        return(
            <div>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary">Button</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        )
    }
}

// export default UrlInput;


// type MyContext = number
// * const Ctx = React.createContext<MyContext>(0)
//     *
//     * class Foo extends React.Component {
//         *   static contextType = Ctx
//             *   context!: React.ContextType<typeof Ctx>
//         *   render () {
//         *     return <>My context's value: {this.context}</>;
//         *   }
//     * }
