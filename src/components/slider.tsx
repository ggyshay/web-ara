import * as React from 'react';
import './slider.css';

export interface SliderProps {
    label: string;
    onValueChange: (value: number) => void;
    value: number;
    min: number;
    max: number;
    step?: number;
}

export class Slider extends React.Component<SliderProps, any> {
    handleInput = (e) => {
        this.props.onValueChange(parseFloat(e.target.value));
    }

    render() {
        return (
            <div style={{ display: 'inline-block', margin: 10, width: "10em", textAlign: 'left'}}>
                <p style={{color: 'white'}}>{this.props.label + " " + this.props.value.toFixed(2)}</p>
                <input
                    type='range'
                    onChange={this.handleInput}
                    value={this.props.value}
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step || 1}
                />
            </div>
        );
    }
}