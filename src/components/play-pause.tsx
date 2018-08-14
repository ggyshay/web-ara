import * as React from 'react';

export class PlayPause extends React.Component<any, any> {
    constructor(props){
        super(props);

        this.state = {
            playing: false,
        }
    }

    public handleClick = () => {
        this.setState({
            playing: !this.state.playing // invert the playing variable
        });
        this.props.onClick();
    }
    render() {
        return (
            <div>
                <button onClick={this.handleClick}>
                    {this.state.playing ? 'Pause' : 'Play'}
                </button>
            </div>
        );
    }
}