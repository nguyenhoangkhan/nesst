import { v2 } from 'cloudinary';
import { CLOUDINARY } from '../../share/constants/cloudinary.const';

export const Cloudinary = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'dh5674gvh',
      api_key: '475181825851155',
      api_secret: 'sZE3C3KreNc6XjFgdlQXpwS9MgA',
    });
  },
};
