import { create } from "api/http"

export default (record, query, dispatch) => {
    return new Promise((resolve, reject) => {
        create("/users", {
            user: record
        }, query)
        .then(resolve)
        .catch((error) => {
            error.response.json().then((response) => {
                if (response.email == "has already been taken") {
                    reject({_error: "email_already_in_use"})
                }
                else {
                    reject({_error: "unknown"})
                }
            })
        })
    })
}
