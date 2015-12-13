import { update } from "api/http"

export default (record, dispatch) =>
    new Promise((resolve, reject) =>
        update(`/pages/${record.id}`, {
            page: record
        })
        .then(resolve)
        .catch(reject)
    )
