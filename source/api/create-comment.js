import { create } from 'api/http';
import generateUUID from 'utils/uuid';

export default (messageId, attributes) =>
    create(`/messages/${messageId}/relationships/comments`, {
        data: {
            type: 'comments',
            id: generateUUID(),
            attributes
        }
    })
