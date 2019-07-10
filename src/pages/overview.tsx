import React, { useState, useEffect } from 'react';
import { Card, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import API from '../api/endpoints';
import { renderError, renderColor } from '../utils';
import { OverviewItem } from '../types';

// API endpoint for this view
const machines_endpoint = `https://${API.url}${API.root}`;

function Overview(): JSX.Element {
    const [events, setEvents] = useState<Array<OverviewItem>>([]);
    const [error, setError] = useState<null | string>(null);

    // toDo: move to transport
    const getMachines = async () => {
        try {
            const response = await fetch(
              machines_endpoint
            );

            const json = await response.json();
            setEvents(json.data);
        } catch (e) {
            setError(e.message);
        }
    }

    /** initial fetch and
        update machines each 10 sec */
    useEffect(() => {
        setTimeout(getMachines, 0);
        const interval = setInterval(getMachines, 10000);

        return () => clearInterval(interval);
    }, []);

    /** render all machines once they available */
    // toDo: add Dimmer
    const renderMachines = () => {
        return (
        events.length && events[0].status ?
            <Card.Group centered style={{marginTop: '20px'}}>
            {events.map(ev =>
                <Card color={renderColor(ev.status)} key={ev.id}>
                    <Card.Content>
                        <Card.Header>{ev.machine_type}</Card.Header>
                        <Card.Meta>{ev.status}</Card.Meta>
                        <Card.Description>
                            Install Date: {ev.install_date}<br />
                            Last Maintenance: {`
                                ${new Date(ev.last_maintenance).toLocaleString()}
                                ${new Date(ev.last_maintenance).toLocaleTimeString()}
                            `} <br />
                            ID: {ev.id}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Link to={`/machine/${ev.id}`}>Details</Link>
                    </Card.Content>
                </Card>
            )}
            </Card.Group> :
            <>
                <Message info>
                    <Message.Header>
                        Fetching info...
                    </Message.Header>
                </Message>
            </>
        )
    }

    return (
      <>
          {renderError(error)}
          {renderMachines()}
      </>
    )
}

export default Overview;
