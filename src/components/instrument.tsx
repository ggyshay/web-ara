import * as React from 'react';
import { Kick } from '../engines/kick';
import { Transport, Time } from 'tone';
import { Instruments } from './instrument-hack';
import { areEqual } from '../utils/array-comparator';

export interface InstrumentProps{
    engine: Instruments;
    steps?: boolean[];
}

export class Instrument extends React.Component<InstrumentProps, any> {
    private kick: Kick;
    private ctx: AudioContext;
    private loopId: number;

    constructor(props: any) {
        super(props);
        this.ctx = new AudioContext;
        this.kick = new Kick(this.ctx);

        this.state = {
            steps: [],
        };

        this.loopId = 0;
        Transport.bpm.value = 120;
        
    }

    componentDidUpdate(prevProps){
        if(this.props.steps && !areEqual(this.props.steps, this.state.steps)){
            this.setState({
                steps: this.props.steps.slice(0),
            });
            this.createLoop();
        }
    }

    // static getDerivedStateFromProps(props, state){
    //     if(props.steps && props.steps !== state.steps){
    //         return {steps: props.steps.slice(0)};
    //     }
    //     return null;
    // }

    createLoop = () => {
        if(!this.props.steps){ return ; }
        Transport.clear(this.loopId);
        const loop = (time: number) => {
            console.log('loop', time);
            this.state.steps.forEach((s, i) => {
                if (s) {
                    this.kick.trigger(time + i * Time('16n').toSeconds())
                }
            });
        }
        this.loopId = Transport.schedule(loop, "0");
    }

    render() {
        return (
            <div>
                <p>Just to know there's an instrument here</p>
            </div >
        )
    }
}