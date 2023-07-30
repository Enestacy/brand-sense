import { ApplicationError } from '../index';

export const NoWebsiteProvided = new ApplicationError({
  status: 400,
  message: 'Provide website url',
});

export const InvalidWebsiteDomain = new ApplicationError({
  status: 400,
  message: 'Invalid website url',
});
