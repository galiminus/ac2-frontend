import { create } from "api/http";

export default (attributes, query) => {
    return new Promise((resolve, reject) => {
        create("/users", {
            data: {
                type: "users",
                attributes
            }
        }, query)
        .then(resolve)
        .catch((error) => {
            if (error.response) {
                error.response.json().then((response) => {
                    if (response.email === "has already been taken") {
                        reject({ _error: "email_already_in_use" });
                    } else {
                        reject({ _error: "unknown" });
                    }
                });
            }
        });
    });
};
