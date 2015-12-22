import { create } from "api/http"
import generateUUID from "utils/uuid"

export default (record, dispatch) => {
    return new Promise((resolve, reject) => {
        create("/posts", {
            post: { uuid: generateUUID(), ...record }
        })
        .then(resolve)
        .catch((error) => {
            error.response.json().then((response) => {
                reject({_error: "unknown"})
            })
        })
    })
}
