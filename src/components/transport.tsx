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
                false, false, false, false, false, false, false, false]
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

    render() {
        return (
            <div>
                <p> This is the transport component!! </p>
                <PlayPause onClick={this.playpause} />
                <InstrumentHack steps={this.state.steps} selectedInstrument='Kick'>
                    <Instrument engine='Kick' key='Kick'/>
                </InstrumentHack>
                <Steps handleStepChange={this.handleStepChange} steps={this.state.steps}/>
            </div>
        )
    }
}