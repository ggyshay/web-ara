export class Kick{
    private tone: number;
    private audiocontext: AudioContext;
    private decay: number;
    private osc: OscillatorNode;
    private gain:GainNode;

    constructor(audiocontext: AudioContext){

        this.tone = 150;
        this.audiocontext = audiocontext;
        this.decay = 0.5;

    }

    public setup() {
        this.osc = this.audiocontext.createOscillator();
        this.gain = this.audiocontext.createGain();
        this.osc.connect(this.gain);
        this.gain.connect(this.audiocontext.destination)
    }

    trigger(time:number) {
        this.setup();
        this.osc.frequency.setValueAtTime(this.tone, time);
        this.gain.gain.setValueAtTime(1, time);
    
        this.osc.frequency.exponentialRampToValueAtTime(0.01, time + this.decay);
        this.gain.gain.exponentialRampToValueAtTime(0.01, time + this.decay);
    
        this.osc.start(time);
    
        this.osc.stop(time + this.decay);
    }
}