import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

/** top level component */
import MachineContext, { socket, channel } from './components/MachineContext';

/** views */
import Home from './pages/home';
import Overview from './pages/overview';
import Machine from './pages/machine';

/** application */
const App = () => {
    return (
        <MachineContext.Provider value={{ socket, channel }}>
            <Router>
                <Switch>
                    <Route path="/" exact component={ Home } />
                    <Route path="/overview" component={ Overview } />
                    <Route path="/machine/:id" component={ Machine } />
                    <Redirect to="/" />
                </Switch>
            </Router>
        </MachineContext.Provider>
    );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
