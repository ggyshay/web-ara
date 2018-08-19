import * as React from 'react';
import { Transport } from 'tone';
import { BPM } from './bpm-component';
import { Instrument } from './instrument';
import { InstrumentHack } from './instrument-hack';
import { PlayPause } from './play-pause';
import { Steps } from './steps';

export class TransportComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            steps: [false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false],
            selected: null,
            bpm: 120,
        }
        Transport.loop = true;
        Transport.loopEnd = '1m'
    }

    pause = () => {
        Transport.stop();
    }

    play = () => {
        Transport.start();
    }

    private handleStepChange = (id: number) => {
        const s = this.state.steps;
        s[id] = !s[id];
        this.setState({
            steps: s,
        })
    }

    private selectInstrument = (selected: string, steps: boolean[]) => {
        if (this.state.selected === selected) {
            this.setState({
                selected: null, steps: [false, false, false, false, false, false, false, false,
                    false, false, false, false, false, false, false, false]
            })
        } else {
            this.setState({ selected, steps })
        }
    }

    handleBPMChange = (bpm: number) => {
        Transport.bpm.value = bpm;
        this.setState({ bpm });
    }

    render() {
        return (
            <div>
                <h1 style={{ color: 'white', fontFamily: "'Roboto', sans-serif" }}>ARA web</h1>
                <div style={{ display: 'block' }}>
                    <BPM handleChange={this.handleBPMChange} value={this.state.bpm} />
                    <PlayPause play={this.play} pause={this.pause} />
                </div>

                <InstrumentHack steps={this.state.steps} selectedInstrument={this.state.selected}>
                    <Instrument engine='Kick' key='Kick' handleClick={this.selectInstrument} />
                    <Instrument engine='Clap' key='Clap' handleClick={this.selectInstrument} />
                    <Instrument engine='HiHat' key='HiHat' handleClick={this.selectInstrument} />
                    <Instrument engine='Cymbal' key='Cymbal' handleClick={this.selectInstrument} />
                </InstrumentHack>
                <Steps handleStepChange={this.handleStepChange} steps={this.state.steps} />
            </div>
        )
    }
}