import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from "react-router-dom";
import './app.component.css';
import {
    takeScreenshot,
    startScreenRecordScreen,
    stopScreenRecordScreen,
    windowResize,
} from '../services/actions.service';
import listeners from '../services/listeners.service';
import packageJson from '../../../package.json';

class VideoRecording extends React.Component {

    render() {
        return (
            <Card className="card-style">
                <CardContent className="centered">
                    {
                        this.props.recordingScreen === false &&
                        <Typography>
                            <Button variant="outlined" onClick={() => this.props.onRecordClick()}>
                                <span className="record-style">
                                    <i className="material-icons">fiber_manual_record</i>
                                </span>
                            </Button> or <b className="record-style">&nbsp;(Alt + R)</b>
                        </Typography>
                    }
                    {
                        this.props.recordingScreen === true &&
                        <Typography>
                            <Button variant="outlined" onClick={() => this.props.onRecordClick()}>
                                <span className="record-style">
                                    <i className="material-icons">stop</i>
                                </span>
                            </Button> or <b className="record-style">&nbsp;(Alt + R)</b>
                        </Typography>
                    }
                </CardContent>
            </Card>
        );
    }
}

class CameraSnapshot extends React.Component {

    componentDidMount() {
        if (typeof window !== 'undefined') {
            window.addEventListener('screenClick', this.handleCameraClick)
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('screenClick', this.handleCameraClick)
        }
    }

    handleCameraClick() {
        takeScreenshot().then((filename) => {
            console.log(filename);
        });
    }

    render() {
        return (
            <Card className="card-style">
                <CardContent className="centered">
                    <Typography>
                        <Button variant="outlined" onClick={() => this.handleCameraClick()}>
                            <span className="camera-style">
                                <i className="material-icons">camera_alt</i>
                            </span>
                        </Button> or <b className="camera-style">&nbsp;(Alt + C)</b>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

class ToolHeading extends React.Component {

    render() {
        return (
            <div
                className={this.props.currentAction === this.props.toolId ? "tool-active" : "tool"}
                onClick={() => this.props.onClick(this.props.toolId)}>
                <Typography variant="h6" color="inherit">
                    {this.props.toolName}
                    <br />
                    <i className="material-icons">
                        {this.props.iconName}
                    </i>
                </Typography>
            </div>
        );
    }
}

class ActionToolBar extends React.Component {

    constructor(props) {
        super(props);
        this.toggleRecording = this.toggleRecording.bind(this);
        localStorage.setItem('recordingScreen', false);
        this.state = {
            currentAction: 1,
            recordingScreen: false,
            actions: [
                {
                    toolId: 1,
                    toolName: 'Screenshot',
                    iconName: 'fullscreen',
                },
                {
                    toolId: 2,
                    toolName: 'Record',
                    iconName: 'videocam',
                },
            ]
        };

        listeners(); // listen to keyboard events
    }

    handleTabClick(currentAction) {
        this.setState({
            currentAction: currentAction,
        });
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            this.setState({
                recordingScreen: localStorage.getItem('recordingScreen') === 'true'
            })

            window.addEventListener('screenRecord', this.toggleRecording)
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('screenRecord', this.toggleRecording)
        }
    }

    updateState(value) {
        this.setState({ recordingScreen: value });
    }

    async toggleRecording() {
        const recordStatus = localStorage.getItem('recordingScreen') === 'true';
        if (recordStatus === false) {
            await startScreenRecordScreen();
            this.updateState(true);
            localStorage.setItem('recordingScreen', true);
        } else {
            const filename = await stopScreenRecordScreen();
            console.log(filename);
            this.updateState(false);
            localStorage.setItem('recordingScreen', false);
        }
    }

    render() {
        const actions = this.state.actions.map((action) => {
            return (
                <ToolHeading
                    key={action.toolId}
                    currentAction={this.state.currentAction}
                    toolId={action.toolId}
                    toolName={action.toolName}
                    iconName={action.iconName}
                    onClick={() => this.handleTabClick(action.toolId)}
                />
            );
        });

        return (
            <div>
                <AppBar position="static" color="default">
                    <Toolbar className="tool-bar">
                        {actions}
                    </Toolbar>
                </AppBar>
                {this.state.currentAction === 1 && <CameraSnapshot></CameraSnapshot>}
                {this.state.currentAction === 2 &&
                    <VideoRecording
                        recordingScreen={this.state.recordingScreen}
                        onRecordClick={() => this.toggleRecording()}
                    />
                }
            </div>

        );
    }
}

class BottomNav extends React.Component {
    render() {
        return (
            <AppBar position="static" className="bottom-navbar">
                <Toolbar variant="dense">
                    <Link to="/settings/">
                        <i className="material-icons">
                            settings
                        </i>
                    </Link>
                    <div className="version-number">v{packageJson.version}</div>
                </Toolbar>
            </AppBar>

        );
    }
}


export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fileName: null,
        }
    }

    screenCaptureorRecord(filename) {
        this.setState({
            fileName: filename
        });
    }

    componentDidMount() {
        const w = this.refs.theApp.clientWidth;
        const h = this.refs.theApp.clientHeight;
        windowResize(w, h + 80);
    }

    render() {
        return (
            <div ref="theApp">
                <ActionToolBar />
                <BottomNav />
            </div>
        );
    }
}