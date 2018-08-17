import * as React from 'react';
import { Instrument } from './instrument';
import { InstrumentHack } from './instrument-hack';
import { Transport } from 'tone';
import { PlayPause } from './play-pause';
import { Steps } from './steps';
import { Slider, Knob } from './slider';

export class TransportComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            steps: [false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false],
            selected: null,
            kickTone: 130,
            snareTone: 130,
            hatTone: 130,
            kickVolume: 1,
            snareVolume: 1,
            hatVolume: 1,
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

    private handleKickTone = (kickTone: number) => {
        this.setState({
            kickTone
        })
    }

    private handleSnareTone = (snareTone: number) => {
        this.setState({
            snareTone
        })
    }

    private handleHatTone = (hatTone: number) => {
        this.setState({
            hatTone
        })
    }

    private handleKickVolume = (kickVolume: number) => {
        this.setState({
            kickVolume
        })
    }

    private handleSnareVolume = (snareVolume: number) => {
        this.setState({
            snareVolume
        })
    }

    private handleHatVolume = (hatVolume: number) => {
        this.setState({
            hatVolume
        })
    }

    render() {
        return (
            <div>
                <h1 style={{color: 'white', fontFamily:"'Roboto', sans-serif;"}}>ARA web</h1>
                <PlayPause play={this.play} pause={this.pause} />
                <InstrumentHack steps={this.state.steps} selectedInstrument={this.state.selected}>
                    <Instrument engine='Kick' key='Kick' handleClick={this.selectInstrument} />
                    <Instrument engine='Snare' key='Snare' handleClick={this.selectInstrument} />
                    <Instrument engine='HiHat' key='HiHat' handleClick={this.selectInstrument} />
                </InstrumentHack>
                <Steps handleStepChange={this.handleStepChange} steps={this.state.steps} />
            </div>
        )
    }
}