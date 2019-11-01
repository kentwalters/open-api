import React from 'react';
import Alert from 'react-bootstrap/Alert';

const TestComponent: React.FC = () => {
    return (
        <Alert key={1} variant='danger'>
            This is a danger alert—check it out!
        </Alert>
    );
}

export default TestComponent;
