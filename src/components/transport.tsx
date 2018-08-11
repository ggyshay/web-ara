import * as React from 'react';
import {Instrument} from './instrument';

export class Transport extends React.Component {
    render() {
        return (
            <div>
                <p> This is the transport component!! </p>
                <Instrument />
            </div>
        )
    }
}