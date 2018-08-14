import { InstrumentEngine } from "./engines";

export class HiHat implements InstrumentEngine{
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

    constructor(ctx) {
        this.ctx = ctx;
        this.ratios = [2, 3, 4.16, 5.43, 6.79, 8.21];
        this.tone = 40;
        this.decay = 0.3;
    }

    setup() {
        this.noise = this.ctx.createBufferSource();
        this.noise.buffer = this.noiseBuffer();
        this.noiseEnvelope = this.ctx.createGain();
        this.noiseFilter = this.ctx.createBiquadFilter();
        this.noiseFilter.type = 'highpass';
        this.noiseFilter.frequency.value = 2000;
        this.oscEnvelope = this.ctx.createGain();
        this.bndPass = this.ctx.createBiquadFilter();
        this.bndPass.type = 'bandpass';
        this.bndPass.frequency.value = 10000;
        this.hipass = this.ctx.createBiquadFilter();
        this.hipass.type = "highpass";
        this.hipass.frequency.value = 7000;

        this.noise.connect(this.noiseFilter);
        this.noiseFilter.connect(this.noiseEnvelope);

        this.noiseEnvelope.connect(this.ctx.destination);
        this.bndPass.connect(this.hipass);
        this.hipass.connect(this.oscEnvelope);
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
        this.noise.start(time);
        this.noise.stop(time + this.decay)

        this.noiseEnvelope.gain.setValueAtTime(0, time);
        this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.1, time +0.33 * this.decay);
        this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.00001, time + this.decay);

        this.oscEnvelope.gain.setValueAtTime(0.00001, time);
        this.oscEnvelope.gain.exponentialRampToValueAtTime(1, time + 0.067 * this.decay);
        this.oscEnvelope.gain.exponentialRampToValueAtTime(0.3, time + 0.1 * this.decay);
        this.oscEnvelope.gain.exponentialRampToValueAtTime(0.00001, time + this.decay);
    }
}