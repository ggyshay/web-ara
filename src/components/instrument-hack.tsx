import * as React from 'react';
import { Instrument } from './instrument';

export interface InstrumentHackProps {
    steps: boolean[];
}

export class InstrumentHack extends React.Component<InstrumentHackProps> {
    constructor(props) {
        super(props);
    }

    createLoops = () => {
        if (!this.props.children) { return; }
        console.log(this.props.children)
        React.Children.forEach(this.props.children, (child: any) => {
            if(child.type === Instrument && child.createLoop){
                child.createLoop(this.props.steps);
            }
            debugger;
        })
        // if (this.props.children instanceof Array) {
        //     this.props.children.forEach((instrument: Instrument) => {
        //         if (instrument instanceof Instrument) {
        //             instrument.createLoop(this.props.steps);
        //         }
        //     });
        // } else {
        //     console.log(Instrument, typeof this.props.children)
        //     if (this.props.children instanceof Instrument) {
        //         if (this.props.children instanceof React.Component) {
        //             // this.props.children.createLoop(this.props.steps);
        //         }
        //     }
        // }
    }

    render() {
        console.log('rendering');
        this.createLoops();
        return (
            <div>
                <p> This is the InstrumentHack </p>
                {this.props.children}
            </div>
        )
    }
}