import * as React from 'react';
import { Instrument } from './instrument';

export type Instruments = 'Kick'|'Snare'|'HiHat'|'Clap'

export interface InstrumentHackProps {
    steps: boolean[];
    selectedInstrument: Instruments
}

export class InstrumentHack extends React.Component<InstrumentHackProps> {
    constructor(props) {
        super(props);
    }

    // createLoops = () => {
    //     if (!this.props.children) { return; }
    //     React.Children.forEach(this.props.children, child => {
    //         if (typeof child === 'object' && child.key === this.props.selectedInstrument) {
    //     })
    //     // if (this.props.children instanceof Array) {
    //     //     this.props.children.forEach((instrument: Instrument) => {
    //     //         if (instrument instanceof Instrument) {
    //     //             instrument.createLoop(this.props.steps);
    //     //         }
    //     //     });
    //     // } else {
    //     //     console.log(Instrument, typeof this.props.children)
    //     //     if (this.props.children instanceof Instrument) {
    //     //         if (this.props.children instanceof React.Component) {
    //     //             // this.props.children.createLoop(this.props.steps);
    //     //         }
    //     //     }
    //     // }
    // }

    render() {
        const childrenWithProps = React.Children.map(this.props.children, (child) =>{
            if(typeof child === 'object'){
                if (child.key === this.props.selectedInstrument){
                    return React.cloneElement(child, {steps: this.props.steps});
                } else {
                    return React.cloneElement(child, {steps: null})   
                }
            }
            return child;
        });
        console.log(childrenWithProps)
        return (
            <div>
                <p> This is the InstrumentHack </p>
                {childrenWithProps}
            </div>
        )
    }
}