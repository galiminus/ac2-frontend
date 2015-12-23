import { create } from "api/http";
import generateUUID from "utils/uuid";

export default (attributes) => {
    return new Promise((resolve, reject) => {
        create("/posts", {
            data: {
                type: "posts",
                id: generateUUID(),
                attributes
            }
        })
        .then(resolve)
        .catch((error) => {
            error.response.json().then(() => {
                reject({ _error: "unknown" });
            });
        });
    });
};
