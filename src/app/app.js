import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { takeScreenshot } from './services/actions';
import './app.css';
import listeners from './services/listeners';

class VideoRecording extends React.Component {

    render() {
        return (
            <div>
                <Card>
                    <CardContent className="centered">
                        <Button variant="outlined">
                            <span className="record-style">
                                <i className="material-icons">fiber_manual_record</i>
                            </span>
                        </Button> or <b className="record-style">(Alt + R)</b>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

class CameraSnapshot extends React.Component {

    handleCameraClick() {
        takeScreenshot();
    }

    render() {
        return (
            <div>
                <Card>
                    <CardContent className="centered">
                        <Typography>
                            <Button variant="outlined" onClick={() => this.handleCameraClick()}>
                                <span className="camera-style">
                                    <i className="material-icons">camera_alt</i>
                                </span>
                            </Button> or <b className="camera-style">(Alt + C)</b>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
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
        this.state = {
            currentAction: 1,
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
    }

    handleCameraClick(currentAction) {
        this.setState({
            currentAction: currentAction,
        });
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
                    onClick={() => this.handleCameraClick(action.toolId)}
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
                {this.state.currentAction === 2 && <VideoRecording></VideoRecording>}
            </div>

        );
    }
}

export function App() {

    // listen to keyboard events
    listeners();

    return (
        <div>
            <ActionToolBar />
        </div>
    );
}