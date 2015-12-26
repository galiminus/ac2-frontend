import { create } from "api/http";
import { notifications } from "action-creators"

export default (record, dispatch) => {
    return new Promise((resolve, reject) => {
        create("/oauth/token", {
            username: record.email,
            password: record.password,
            grant_type: "password"
        })
        .then((data) => {
            dispatch({
                type: "TOKENS_ADD",
                data
            });
            resolve(data);
        })
        .catch((error) => {
            if (error.response !== undefined) {
                const authError = error.response.headers.get("www-authenticate");

                if (authError && authError.match("error=\"invalid_grant\"")) {
                    reject({ _error: "invalidGrant" });
                    dispatch(notifications.push({ message: "invalidGrant" }))
                }
            }
        });
    });
};
