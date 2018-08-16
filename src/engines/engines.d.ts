export interface InstrumentEngine {
    tone: number;
    decay: number;
    setup: () => void;
    trigger: (time: number) => void;
    setTone: (tone: number) => void;
    setVolume: (vol: number) => void;
}