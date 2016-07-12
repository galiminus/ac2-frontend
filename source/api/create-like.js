import { create } from 'api/http';
import generateUUID from 'utils/uuid';

export default (attributes) =>
    create('/likes', {
        data: {
            type: 'likes',
            id: generateUUID(),
            attributes
        }
    })
