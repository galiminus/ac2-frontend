import { create } from "api/http";
import generateUUID from "utils/uuid";

export default (postId, attributes) => {
    return new Promise((resolve, reject) => {
        create(`/posts/${postId}/relationships/comments`, {
            data: {
                type: "comments",
                id: generateUUID(),
                attributes
            }
        })
        .then(resolve)
        .catch((error) => {
            if (error.reponse) {
                error.response.json().then(() => {
                    reject({ _error: "unknown" });
                });
            }
        });
    });
};
