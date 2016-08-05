import { create } from 'api/http';
import generateUUID from 'utils/uuid';

export default (type, attributes, query) =>
    create('/messages', {
        data: {
            type,
            id: generateUUID(),
            attributes
        }
    }, query);
