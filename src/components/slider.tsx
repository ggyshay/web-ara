import * as React from 'react';

export interface SliderProps {
    label: string;
    onValueChange: (value: number) => void;
    value: number;
    min: number;
    max: number;
}

export class Slider extends React.Component<SliderProps> {
    handleInput = (e) => {
        this.props.onValueChange(e.target.value);
    }

    render() {
        return (
            <div style={{display: 'inline-block'}}>
                <h4>{this.props.label + " " + this.props.value}</h4>
                <input
                    type='range'
                    onInput={this.handleInput}
                    value={this.props.value}
                    min={this.props.min}
                    max={this.props.max}
                    step={0.1}
                />
            </div>
        );
    }
}