import { update } from "api/http";

export default (id, record) =>
    new Promise((resolve, reject) =>
        update(`/pages/${id}`, {
            page: record
        })
        .then(resolve)
        .catch(reject)
    );
