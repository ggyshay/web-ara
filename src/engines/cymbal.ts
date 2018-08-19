import { InstrumentEngine } from "./engines";

export class Cymbal implements InstrumentEngine {
    private ctx: AudioContext;
    private ratios: number[];
    public tone: number;
    public decay: number;
    private noise: AudioBufferSourceNode;
    private noiseEnvelope: GainNode;
    private noiseFilter: BiquadFilterNode;
    private oscEnvelope: GainNode;
    private bndPass: BiquadFilterNode;
    private hipass: BiquadFilterNode;
    public volume: number;
    public fxAmount: number;

    constructor(ctx) {
        this.ctx = ctx;
        this.ratios = [1, 1.3420, 1.2312, 1.6532, 1.9523, 2.1523];
        this.tone = 130.81;
        this.decay = 1.5;
        this.volume = 1;
        this.fxAmount = 0;
    }

    async setup() {
        this.noise = this.ctx.createBufferSource();
        this.noise.buffer = this.noiseBuffer();
        this.noiseEnvelope = this.ctx.createGain();
        this.noiseFilter = this.ctx.createBiquadFilter();
        this.noiseFilter.type = 'highpass';
        this.noiseFilter.frequency.value = 2000;
        this.oscEnvelope = this.ctx.createGain();
        this.bndPass = this.ctx.createBiquadFilter();
        this.bndPass.type = 'bandpass';
        this.bndPass.frequency.value = 20000;
        this.bndPass.Q.value = 0.2;
        this.hipass = this.ctx.createBiquadFilter();
        this.hipass.type = "highpass";
        this.hipass.frequency.value = 5000;
        this.noise.connect(this.noiseFilter);
        this.noiseFilter.connect(this.noiseEnvelope);

        this.bndPass.connect(this.hipass);
        this.hipass.connect(this.oscEnvelope);
        this.noiseEnvelope.connect(this.ctx.destination);
        this.oscEnvelope.connect(this.ctx.destination);
    }

    noiseBuffer() {
        var bufferSize = this.ctx.sampleRate;
        var buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        var output = buffer.getChannelData(0);

        for (var i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        return buffer;
    }

    trigger(time) {
        if (this.volume == 0) { return };
        this.setup();
        this.ratios.forEach((ratio) => {
            var osc = this.ctx.createOscillator();
            osc.type = "square";
            // Frequency is the fundamental * this oscillator's ratio
            osc.frequency.value = this.tone * ratio;
            osc.connect(this.bndPass);
            osc.start(time);
            osc.stop(time + this.decay);
        });

        this.oscEnvelope.gain.setValueAtTime(0.00001 * this.volume, time);
        this.oscEnvelope.gain.exponentialRampToValueAtTime(1 * this.volume, time + 0.01);
        this.oscEnvelope.gain.exponentialRampToValueAtTime(0.3 * this.volume, time + 0.1 * this.decay + this.fxAmount/100);
        this.oscEnvelope.gain.exponentialRampToValueAtTime(0.00001 * this.volume, time + this.decay + this.fxAmount/50);
    }

    setTone = (tone: number) => {
        this.tone = tone;
    }
    setVolume = (vol: number) => {
        this.volume = vol;
    }
    setFXAmount = (amount: any) => {
        this.fxAmount = parseFloat(amount);
    }
}