/**
 * Represents an abstract settings manager
 */
export interface ISettingsManager {
    get: (setting: string, defaultValue: any) => Promise<any>;
    exists: (setting: string) => Promise<boolean>;
    set: (setting: string, value: any) => Promise<void>;
}