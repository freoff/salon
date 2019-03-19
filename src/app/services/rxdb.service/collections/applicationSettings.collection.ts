import {RxCollection, RxDocument} from 'rxdb';

export interface ApplicationSetting {
    language: string;
    currency: string;
}
export interface ApplicationSettingsMethods {
    getApplicationSettings (): ApplicationSetting;
}
export type ApplicationSettingsDoc = RxDocument<ApplicationSetting, ApplicationSettingsMethods>;

export type ApplicationSettingsCollection = RxCollection<ApplicationSetting, ApplicationSettingsMethods>;

