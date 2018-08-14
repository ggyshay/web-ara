export interface InstrumentEngine {
    tone: number;
    decay: number;
    setup: () => void;
    trigger: (time: number) => void;
}