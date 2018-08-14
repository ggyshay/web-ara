import * as React from 'react';
import { Instrument } from './instrument';
import { InstrumentHack } from './instrument-hack';
import { Transport } from 'tone';
import { PlayPause } from './play-pause';
import { Steps } from './steps';

export class TransportComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            steps: [false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false],
            selected: null,
        }
        Transport.loop = true;
        Transport.loopEnd = '1m'
    }

    playpause = () => {
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
            this.setState({ selected: null, steps: [false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false] })
        } else {
            this.setState({ selected, steps})
        }
    }

    render() {
        return (
            <div>
                <p> This is the transport component!! </p>
                <PlayPause onClick={this.playpause} />
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