export interface InstrumentEngine {
    tone: number;
    decay: number;
    volume: number;
    fxAmount: number;
    setup: () => void;
    trigger: (time: number) => void;
    setTone: (tone: number) => void;
    setVolume: (vol: number) => void;
    setFXAmount: (amount: number) => void;
}