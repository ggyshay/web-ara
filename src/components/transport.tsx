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
                <p> This is the transport component!! </p>
                <div style={{ margin: 10 }}>
                <Knob
                    size={100}
                    numTicks={50}
                    degrees={260}
                    min={10}
                    max={1000}
                    value={130}
                    color={true}
                    onChange={this.handleKickTone}
                />
                    {/* <Knob label="Kick Tone" onValueChange={this.handleKickTone}
                    value={this.state.kickTone} min={10} max={1000} /> */}
                    <Slider label="Kick Volume" onValueChange={this.handleKickVolume}
                    value={this.state.kickVolume} min={0} max={1} />
                </div>
                <div style={{ margin: 10 }}>
                    <Slider label="Snare Tone" onValueChange={this.handleSnareTone}
                    value={this.state.snareTone} min={10} max={1000} />
                    <Slider label="Snare Volume" onValueChange={this.handleSnareVolume}
                    value={this.state.snareVolume} min={0} max={1} />
                </div>
                <div style={{ margin: 10 }}>
                    <Slider label="Hat Tone" onValueChange={this.handleHatTone} value={this.state.hatTone} min={10} max={1000} />
                    <Slider label="Hat Volume" onValueChange={this.handleHatVolume} value={this.state.hatVolume} min={0} max={1} />

                </div>
                <PlayPause play={this.play} pause={this.pause}/>
                <InstrumentHack steps={this.state.steps} selectedInstrument={this.state.selected}>
                    <Instrument engine='Kick' key='Kick' handleClick={this.selectInstrument} tone={this.state.kickTone} volume={this.state.kickVolume} />
                    <Instrument engine='Snare' key='Snare' handleClick={this.selectInstrument} tone={this.state.snareTone} volume={this.state.snareVolume} />
                    <Instrument engine='HiHat' key='HiHat' handleClick={this.selectInstrument} tone={this.state.hatTone} volume={this.state.hatVolume} />
                </InstrumentHack>
                <Steps handleStepChange={this.handleStepChange} steps={this.state.steps} />
            </div>
        )
    }
}