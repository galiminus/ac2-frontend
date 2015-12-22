import { create } from "api/http";
import generateUUID from "utils/uuid";

export default (record) => {
    return new Promise((resolve, reject) => {
        create("/posts", {
            post: { uuid: generateUUID(), ...record }
        })
        .then(resolve)
        .catch((error) => {
            error.response.json().then(() => {
                reject({ _error: "unknown" });
            });
        });
    });
};
