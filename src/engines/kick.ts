import { InstrumentEngine } from './engines';

export class Kick implements InstrumentEngine{
    private ctx: AudioContext;
    public tone: number;
    public decay: number;
    private osc: OscillatorNode;
    private gain: GainNode;
    private volume: number;

    constructor(ctx: AudioContext) {
        this.ctx = ctx;
        this.tone = 167.1;
        this.decay = 0.5;
    }

    setup() {
        this.osc = this.ctx.createOscillator();
        this.osc.type = 'sine'
        this.gain = this.ctx.createGain();
        this.osc.connect(this.gain);
        this.gain.connect(this.ctx.destination);

    }
    trigger(time: number) {
        console.log('trigger kick ', time)
        this.setup();

        this.osc.frequency.setValueAtTime(this.tone, time + 0.001);
        this.gain.gain.linearRampToValueAtTime(this.volume, time + 0.1)

        this.osc.frequency.exponentialRampToValueAtTime(1, time + this.decay);
        this.gain.gain.exponentialRampToValueAtTime(0.01 * this.volume, time + this.decay);
        this.gain.gain.linearRampToValueAtTime(0, time + this.decay + 0.1)

        this.osc.start(time);

        this.osc.stop(time + this.decay + 0.1);
    }

    setTone = (tone: number) => {
        this.tone = tone;
    }

    setVolume = (vol: number)=> {
        this.volume = vol;
    }
}