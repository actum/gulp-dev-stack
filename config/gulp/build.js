/**
 * Build.
 * This is a logic responsible for creating build tasks pipeline.
 */
import gulp from 'gulp';
import runSequence from 'run-sequence';
import environment from '../environment';

/* Environments */
const API = environment.isApi;
const DEVELOPMENT = environment.is('development');

export const buildSequence = [
  [
    'svg',
    'images',
    'styles',
  ],
  'tpl',
  'styleguide',
];

if (API) buildSequence.push('api');

/**
 * Build task.
 */
gulp.task('build', ['clean'], () => {
  return runSequence(...buildSequence);
});
