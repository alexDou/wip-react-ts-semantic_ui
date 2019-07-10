import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Header, Card, Segment, Button } from 'semantic-ui-react';

import API from '../api/endpoints';
import { renderError, renderColor } from '../utils';
import { MachineProps, OverviewItem } from '../types';

// API endpoint for this view
const machine_details_endpoint = `https://${API.url}${API.machine}`;

function Machine(props: RouteComponentProps<MachineProps>): JSX.Element {
    const [machine, setMachine] = useState<OverviewItem | undefined>(undefined);
    const [error, setError] = useState<null | string>(null);

    // toDo: move to transport
    const getMachineDetails = async () => {
        try {
            const response = await fetch(
              machine_details_endpoint.replace(/\{[^\}]+\}/, props.match.params.id)
            );

            const json = await response.json();
            setMachine(json.data);
        } catch (e) {
            setError(e.message);
        }
    }

    /** initial fetch and
        update machine info each 10 sec */
    useEffect(() => {
        setTimeout(getMachineDetails, 0);
        const interval = setInterval(getMachineDetails, 10000);

        return () => clearInterval(interval);
    }, []);

    const renderMachine = () => {
        return (
          machine && machine.status ?
            <Segment placeholder>
                <Header>
                    Machine: <br />
                    {props.match.params.id}
                </Header>

                <Card color={renderColor(machine.status)}>
                    <Card.Content>
                        <Card.Header>{machine.machine_type}</Card.Header>
                        <Card.Meta>{machine.status}</Card.Meta>
                        <Card.Description>
                            <p>Installed at: {new Date(machine.install_date).toLocaleString()}</p>
                            <p>Last Maintenance: {new Date(machine.last_maintenance).toLocaleString()}</p>
                            <p>
                                <b>Position:</b><br />
                                Lat: {+machine.latitude.toFixed(6)}, Long: {+machine.longitude.toFixed(6)}
                            </p>
                            <p>Floor: {machine.floor}</p>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button basic color='black' size="small" style={{marginLeft: 'inherit'}} onClick={() => history.back()}>Back</Button>
                    </Card.Content>
                </Card>
            </Segment> :
            <></>
        );
    }

    return (
      <>
        {renderError(error)}
        {renderMachine()}
       </>
    )
}

export default Machine;
