import * as React from 'react'
import { Kick } from '../engines/kick';

export interface InstrumentProps {
    audiocontext: AudioContext;
}

export class Instrument extends React.Component<InstrumentProps>{
    private kick: Kick;

    constructor(props: InstrumentProps){
        super(props);
        console.log(props.audiocontext)
        this.kick = new Kick(props.audiocontext);
    }
    public handleClick = () => {
        this.kick.trigger(this.props.audiocontext.currentTime);
        console.log('tuto check');
    }

    public render(){
        return(
            <button onClick={this.handleClick}>hey, this is an instrument</button>
        );
    }
}