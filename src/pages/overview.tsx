import React, {useState, useEffect, useContext} from 'react';
import { Card, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import API from '../api/endpoints';
import { renderError, renderColor } from '../utils';
import { OverviewItem } from '../types';
import MachineContext from "../components/MachineContext";

// API endpoint for this view
const machines_endpoint = `https://${API.url}${API.root}`;

function Overview(): JSX.Element {
    const { channel } = useContext(MachineContext);
    const [machines, setMachines] = useState<Array<OverviewItem>>([]);
    const [error, setError] = useState<null | string>(null);

    let machinesCopy: Array<OverviewItem> = [];

    // toDo: move to transport
    const getMachines = async () => {
        try {
            const response = await fetch(
              machines_endpoint
            );

            return await response.json();
        } catch (e) {
            setError(e.message);
        }
    }

    /** initial fetch and
        update machines each 10 sec */
    useEffect(() => {
        getMachines()
          .then(res => {
              setMachines(res.data);
              machinesCopy = res.data;
          })
          .catch(e => {
              setError(e.message);
          });
    }, []);

    /** subscribe to machine state update */
    useEffect(() => {
        channel.on('new', (event: any): void => {
            // change event
            // const mach = machinesCopy.map(m => {
            //     console.log(m.id, ' === ', event.id)
            //     if (m.id === event.id) {
            //         m.status = event.status;
            //         m.last_maintenance = event.last_maintenance;
            //     }
            //
            //     return m;
            // });

            // new event
            event.machine_type = event.machine_type || 'new Machine';
            event.new = true;
            machinesCopy = [event, ...machinesCopy];
            setMachines(machinesCopy);

            // fetch again
            // getMachines()
            //   .then(res => {
            //       console.log('new', res.data)
            //       setMachines(res.data);
            //       machinesCopy = res.data;
            //   })
            //   .catch(e => {
            //       setError(e.message);
            //   });
        });
    }, []);

    /** render all machines once they available */
    // toDo: add Dimmer
    const renderMachines = () => {
        return (
        machines.length && machines[0].status ?
            <Card.Group centered style={{marginTop: '20px'}}>
            {machines.map(ev =>
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
                        {ev.new
                            ? <></>
                            : <Link to={`/machine/${ev.id}`}>Details</Link>}
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
