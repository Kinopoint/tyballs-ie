import * as migration_20260810_224416_cms_initial from './20260810_224416_cms_initial';
import * as migration_20260810_225506_home_experience_content from './20260810_225506_home_experience_content';

export const migrations = [
  {
    up: migration_20260810_224416_cms_initial.up,
    down: migration_20260810_224416_cms_initial.down,
    name: '20260810_224416_cms_initial',
  },
  {
    up: migration_20260810_225506_home_experience_content.up,
    down: migration_20260810_225506_home_experience_content.down,
    name: '20260810_225506_home_experience_content'
  },
];
