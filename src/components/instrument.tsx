import * as React from 'react';
import { Time, Transport } from 'tone';
import { Snare, Kick, HiHat } from '../engines';
import { areEqual } from '../utils/array-comparator';
import { Instruments } from './instrument-hack';

export interface InstrumentProps{
    engine: Instruments;
    steps?: boolean[];
    selected?: boolean;
    handleClick?: (engine:string, steps: boolean[]) => void;
}

export class Instrument extends React.Component<InstrumentProps, any> {
    private sound: any;
    private ctx: AudioContext;
    private loopId: number;

    constructor(props: any) {
        super(props);
        this.ctx = new AudioContext;
        switch(props.engine){
            case 'Kick':
                this.sound = new Kick(this.ctx);
                break;
            case 'Snare':
                this.sound = new Snare(this.ctx);
                break;
            case 'HiHat':
                this.sound = new HiHat(this.ctx);
                break;
        }
        
        this.state = {
            steps: [false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false],
        };

        this.loopId = 0;
        Transport.bpm.value = 120;
        
    }

    componentDidUpdate(){
        if(this.props.steps && !areEqual(this.props.steps, this.state.steps)){
            this.setState({
                steps: this.props.steps.slice(0),
            });
            this.createLoop();
        }
    }

    createLoop = () => {
        if(!this.props.steps){ return ; }
        Transport.clear(this.loopId);
        const loop = (time: number) => {
            console.log('loop', time);
            this.state.steps.forEach((s, i) => {
                if (s) {
                    this.sound.trigger(time + i * Time('16n').toSeconds())
                }
            });
        }
        this.loopId = Transport.schedule(loop, "0");
    }

    handleClick = () => {
        if(this.props.handleClick) this.props.handleClick(this.props.engine, this.state.steps.slice(0));
    }

    render() {
        const InstrumentStyle = {
            width: '3em',
            height: '3em',
            margin: '0.2em',
            borderRadius: 10,
            padding: 5,
            backgroundColor: this.props.selected ? '#F863BC' : '#696969'
        }
        return (
            <div style={InstrumentStyle} onClick={this.handleClick}>
                <p>{this.props.engine}</p>
            </div >
        )
    }
}

