import React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { windowResize } from '../services/actions.service';
import Typography from '@material-ui/core/Typography';
import './settings.component.css'
import packageJson from '../../../package.json';

class BottomNav extends React.Component {
    render() {
        return (
            <AppBar position="static" className="bottom-navbar">
                <Toolbar variant="dense">
                    <Link to="/">
                        <i className="material-icons">
                            keyboard_backspace
                        </i>
                    </Link>
                    <div className="version-number">v{packageJson.version}</div>
                </Toolbar>
            </AppBar>

        );
    }
}

export class Settings extends React.Component {

    componentDidMount() {
        const w = this.refs.theSettings.clientWidth;
        const h = this.refs.theSettings.clientHeight;
        windowResize(w, h + 80);
    }

    render() {
        return (
            <div ref="theSettings">
                <Card className="settings-card">
                    <CardContent>
                        <Typography variant="h6">Settings</Typography>
                    </CardContent>
                </Card>
                <BottomNav />
            </div>
        );
    }
}