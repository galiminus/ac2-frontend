import { find } from 'api/http';

export default function (messageId, query) {
    return new Promise((resolve, reject) => {
        find(`/messages/${messageId}/relationships/comments`, query).then(resolve).catch(reject);
    });
}
