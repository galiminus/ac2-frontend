import { find } from 'api/http';

export default function (postId, query) {
    return new Promise((resolve, reject) => {
        find(`/posts/${postId}/relationships/comments`, query).then(resolve).catch(reject);
    });
}
