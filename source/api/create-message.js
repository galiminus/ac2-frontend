import { create } from 'api/http';
import generateUUID from 'utils/uuid';

export default (attributes) =>
    create('/messages', {
        data: {
            type: 'messages',
            id: generateUUID(),
            attributes
        }
    });
