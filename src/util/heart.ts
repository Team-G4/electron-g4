/**
 * The BeatingHeart class provides a simple ability to turn timestamps into time intervals represented as a fraction of the "beat" time
 */
export class BeatingHeart {
    public lastTimestamp: number

    public currentTime = 0
    public startTimestamp: number

    /**
     * Creates an instance of the BeatingHeart class.
     * @param bpm - the number of beats per minute
     * @param defaultInterval - the default interval returned by BeatingHeart.beat() in seconds
     * @param signature - number of beats in a bar
     */
    constructor(
        public bpm = 16.25,
        public defaultInterval = 1 / 60,
        public ensureDefaultInterval = true,
        public signature = 4
    ) {}

    /**
     * Resets the current time to 0.
     * @param timestamp - the reference timestamp
     */
    start(timestamp: number) {
        this.currentTime = 0
        this.startTimestamp = timestamp
    }

    /**
     * Returns the current bar index in reference to the last call to start()
     */
    get bar() {
        return Math.floor(this.currentTime / this.signature)
    }

    /**
     * Returns the current time in bar time
     */
    get barTime() {
        return this.currentTime / this.signature - this.bar
    }

    get barStartTime() {
        return this.localTimeToTimestamp(
            this.currentTime - this.bar * this.signature
        )
    }
    
    localTimeToTimestamp(time: number): number {
        return this.startTimestamp + time * (60 / this.bpm)
    }

    /**
     * Makes the heart beat.
     * @param timestamp - a timestamp in seconds
     * @returns the interval between timestamps represented as a fraction of the beat time
     */
    beat(timestamp: number): number {
        const correctedLastTimestamp = this.lastTimestamp ?? (timestamp - this.defaultInterval)
        const interval = timestamp - correctedLastTimestamp

        this.lastTimestamp = timestamp

        const dTime = interval / (60 / this.bpm)
        this.currentTime += dTime

        return dTime
    }
}
