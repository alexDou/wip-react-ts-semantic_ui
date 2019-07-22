import React from 'react';
import { Segment } from 'semantic-ui-react';

import { ErrorProps } from "../types";

function Error(props: ErrorProps) {
    return (
        <Segment inverted color='red'>
            {props.error}
        </Segment>
    )
}

export default Error;
