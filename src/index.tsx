import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

/** top level component */
import HealthCheck from './components/HealthCheck';

/** views */
import Home from './pages/home';
import Overview from './pages/overview';
import Machine from './pages/machine';

/** application */
const App = () => {
    return (
        <>
            {/* health check info available across the app */}
            <HealthCheck />
            {/*router*/}
            <Router>
                <Switch>
                    <Route path="/" exact component={ Home } />
                    <Route path="/overview" component={ Overview } />
                    <Route path="/machine/:id" component={ Machine } />
                    <Redirect to="/" />
                </Switch>
            </Router>
        </>
    )
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

