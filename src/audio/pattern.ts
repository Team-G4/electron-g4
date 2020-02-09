/**
 * A schedulable pattern
 */
export interface IPattern {
    play: (ctx: AudioContext, startTime: number, offset: number) => AudioNode;
}
