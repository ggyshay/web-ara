import * as React from 'react';
import { Kick } from '../engines/kick';

export class Instrument extends React.Component{
    private kick: Kick;
    private ctx: AudioContext;

    constructor(props: any){
        super(props);
        this.ctx = new AudioContext;
        this.kick = new Kick(this.ctx);
    }
    public handleClick = () => {
        this.kick.trigger(this.ctx.currentTime);
    }

    render(){
        return (
            <div>
                <button onClick={this.handleClick}>
                    Instrument
                </button>
            </div>
        )
    }
}