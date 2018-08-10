import * as React from 'react';
import { Instrument } from './components/instrument';


export class Sync extends React.Component {
    private audiocontext: AudioContext;
    constructor(props: any){
        super(props);
        this.audiocontext = new AudioContext();
    }
    public render() {
        return (
            <div>
                <Instrument audiocontext={this.audiocontext}/>
            </div>
        );
    }
}