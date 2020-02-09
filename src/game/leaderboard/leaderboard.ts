import { IMode } from "../mode/mode"

export type LeaderboardRecord = {
    levelIndex: number;
    deathCount: number;

    recordDate: Date;
}

/**
 * Represents an abstract system that provides leaderboard services for the game
 */
export interface ILeaderboardProvider {
    getRecord: (mode: IMode) => Promise<LeaderboardRecord>;

    recordDeath: (mode: IMode, lvIndex: number) => Promise<boolean>;
    recordSuccess: (mode: IMode, lvIndex: number) => Promise<boolean>;
    recordReset: (mode: IMode, lvIndex: number) => Promise<boolean>;
    recordNewLevel: (mode: IMode, lvIndex: number) => Promise<boolean>;
}
