import { create } from 'api/http';
import generateUUID from 'utils/uuid';

export default (attributes) =>
    create('/relationships', {
        data: {
            type: 'relationships',
            id: generateUUID(),
            attributes
        }
    });
