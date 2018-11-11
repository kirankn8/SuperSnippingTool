import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import './app.css'
import { takeScreenShot } from './screenshot-action';

class VideoRecording extends React.Component {

    render() {
        return (
            <div>
                <Card>
                    <CardContent>
                        <Button variant="outlined">
                            <span className="record-style">
                                <i class="material-icons">fiber_manual_record</i>
                            </span>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
}


class CameraSnapshot extends React.Component {

    handleClick() {
        takeScreenShot();
    }

    render() {
        return (
            <div>
                <Card>
                    <CardContent className="centered">
                        <Typography>
                            <Button variant="outlined" onClick={() => this.handleClick()}>
                                <span className="camera-style">
                                    <i class="material-icons">camera_alt</i>
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
                    <i class="material-icons">
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

    handleClick(currentAction) {
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
                    onClick={() => this.handleClick(action.toolId)}
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
    return (
        <div>
            <ActionToolBar />
        </div>
    );
}