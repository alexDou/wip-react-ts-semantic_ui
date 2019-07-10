import React from 'react';
import Error from '../components/ErrorReport';

export const renderColor = (sts: string) => {
    return sts === 'errored'
      ? 'red' : sts === 'running'
        ? 'green' : sts === 'finished'
          ? 'blue' : 'orange';
}

export const renderError = (err: string | null) => {
    if (err) {
        return <Error error={err} />
    }
}
