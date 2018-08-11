import * as React from 'react';
import {Instrument} from './instrument';
import Transport from 'Tone/core/Transport';

export class TransportComponent extends React.Component {
    constructor(props){
        super(props);
        Tone
    }
    render() {
        return (
            <div>
                <p> This is the transport component!! </p>
                <Instrument />
            </div>
        )
    }
}