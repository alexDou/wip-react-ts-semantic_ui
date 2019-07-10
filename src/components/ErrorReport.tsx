import React from 'react';
import { ErrorProps } from "../types";
import { Segment } from 'semantic-ui-react';


function Error(props: ErrorProps) {
    return (
        <Segment inverted color='red'>
            {props.error}
        </Segment>
    )
}

export default Error;
