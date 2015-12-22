import { update } from "api/http";

export default (record, dispatch) => {
    return new Promise((resolve, reject) => {
        update(`/posts/${record.id}`, {
            post: record
        })
        .then(() => {
            dispatch({
                type: "POSTS_ADD",
                data: record
            });
            resolve(record);
        })
        .catch((error) => {
            error.response.json().then(() => {
                reject({ _error: "unknown" });
            });
        });
    });
};
