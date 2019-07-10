import React from 'react';
import { Container, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

function App() {
    return (
      <div style={{marginTop: '80px'}}>
          <Container fluid textAlign='center'>
              <Header as='h2'>Welcome to machines dashboard</Header>
              <Link to="/overview">Machines</Link>
          </Container>
      </div>
    );
}

export default App;
