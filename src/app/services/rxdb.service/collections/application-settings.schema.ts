import { RxJsonSchema } from 'rxdb';
import {
  ApplicationSetting,
  ApplicationSettingsDoc,
  ApplicationSettingsMethods,
} from './applicationSettings.collection';

export const applicationSettingsSchema: RxJsonSchema = {
  title: 'application settings schema',
  version: 0,
  type: 'object',
  properties: {
    applicationLanguage: {
      type: 'string',
    },
    currency: {
      type: 'string',
    },
  },
};

export const applicationSettingsMethods: ApplicationSettingsMethods = {
  getApplicationSettings: function(this: ApplicationSettingsDoc): ApplicationSetting {
    return {
      language: this.language,
      currency: this.currency,
    };
  },
};
