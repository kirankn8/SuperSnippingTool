import React from 'react';
import './snap.component.css'

class Snap extends React.Component {
    render() {
        return (
            <div>
                <span className="source-info">Source: {this.props.src}</span>
                {this.props.fileType === 'image' &&
                    <img src={this.props.src} alt={this.props.src} width={this.props.width} height={this.props.height}></img>
                }
                {this.props.fileType === 'video' &&
                    <video width={this.props.width} height={this.props.height} controls>
                        <source src={this.props.src} type="video/webm" />
                    </video>
                }
            </div>
        );
    }
}

export default Snap