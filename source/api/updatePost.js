import { update } from "api/http";

export default (id, attributes) =>
    new Promise((resolve, reject) =>
        update(`/posts/${id}`, {
            data: {
                type: "posts",
                attributes
            }
        })
        .then(resolve)
        .catch(reject)
    );
