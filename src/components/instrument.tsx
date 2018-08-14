import * as React from 'react';
import { Kick } from '../engines/kick';
import { Transport, Time } from 'tone';

export class Instrument extends React.Component {
    private kick: Kick;
    private ctx: AudioContext;
    private loop: (time: number) => void;

    constructor(props: any) {
        super(props);
        this.ctx = new AudioContext;
        this.kick = new Kick(this.ctx);

        this.loop = (time: number) => { };
        Transport.bpm.value = 120;
        Transport.schedule(this.loop, "0");
    }

    createLoop = (steps: boolean[]) => {
        console.log('creating loop');
        this.loop = (time: number) => {
            steps.forEach((s, i) => {
                if (s) {
                    this.kick.trigger(time + i * Time('16n').toSeconds())
                }
            });
        }
    }

    render() {
        return (
            <div>
                <p>Just to know there's an instrument here</p>
            </div >
        )
    }
}