import React, { useState, useEffect } from 'react';
import { Socket } from 'phoenix';
import { Accordion, Icon, Grid, Segment, Message } from 'semantic-ui-react';

import API from '../api/endpoints';
import { renderColor } from '../utils';
import { HealthCheckEvent } from '../types';

/** receive updates on machines status
    for now cross-app component */
// toDo: compose with an app context, get rid of intervals
function HealthCheck() {
    const [active, setActive] = useState<boolean>(false);
    const [event, setEvent] = useState<HealthCheckEvent>({
        timestamp: '',
        status: '',
        machine_id: '',
        id: ''
    });

    useEffect(() => {
        // Open Socket connection
        const socket = new Socket(`ws://${API.url}${API.ws_events}`);
        socket.connect();

        // Join correct channel and log events
        const channel = socket.channel("events", {});
        channel.join();

        // Issue event
        channel.on("new", event => setEvent(event));

        return () => {
            // Close socket on exit
            // just in case we move it from top level
            socket.disconnect();
        };
    },
      // prevent re-render
      []);

    /** shows status update event on an individual machine or
        shows pending Message(info) */
    const renderEvent = () => {
        return (
            event && event.machine_id ?
            <>
                <Grid centered columns={2}>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Segment><strong>Machine ID:</strong></Segment>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Segment>{event.machine_id}</Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Segment><strong>ID:</strong></Segment>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Segment>{event.id}</Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Segment><strong>Status:</strong></Segment>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Segment color={renderColor(event.status)}>{event.status}</Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Segment><strong>Timestamp:</strong></Segment>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Segment>{event.timestamp}</Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </> :
            <>
                <Message info>
                    <Message.Header>
                        Pending on events...
                    </Message.Header>
                    <Segment loading />
                </Message>
            </>
        )
    }

    return (
      <Accordion fluid styled>
          <Accordion.Title active={active} onClick={() => setActive(!active)}>
              <Icon name='dropdown' />
              Health Check
          </Accordion.Title>
          <Accordion.Content active={active}>
              {renderEvent()}
          </Accordion.Content>
      </Accordion>
    );
}

export default HealthCheck;
