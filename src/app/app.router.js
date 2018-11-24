import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Settings } from './components/settings.component';
import { App } from './components/app.component';


export class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={App} />
                    <Route path="/settings/" component={Settings} />
                </div>
            </Router>
        );
    }
}