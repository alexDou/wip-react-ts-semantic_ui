import React, { useState, useEffect, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Header, Card, Segment, Button } from 'semantic-ui-react';

import API from '../api/endpoints';
import { renderError, renderColor } from '../utils';
import { MachineProps, OverviewItem } from '../types';
import MachineContext, {channel} from "../components/MachineContext";

// API endpoint for this view
const machine_details_endpoint = `https://${API.url}${API.machine}`;

function Machine(props: RouteComponentProps<MachineProps>): JSX.Element {
    const { channel } = useContext(MachineContext);
    const [machine, setMachine] = useState<OverviewItem | undefined>(undefined);
    const [error, setError] = useState<null | string>(null);

    const getMachineDetails = async () => {
        try {
            const response = await fetch(
              machine_details_endpoint.replace(/\{[^\}]+\}/, props.match.params.id)
            );

            return await response.json();
        } catch (e) {
            setError(e.message);
        }
    }

    /** initial fetch */
    useEffect(() => {
        getMachineDetails()
          .then(res => setMachine(res.data))
          .catch(e => {
              setError(e.message);
          });
    });

    useEffect(() => {
        channel.on('new', (event: OverviewItem): void => {
            if (machine && machine.id === event.id) {
                machine.status = event.status;
                machine.last_maintenance = event.last_maintenance;
            }
            setMachine(event)
        });
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
