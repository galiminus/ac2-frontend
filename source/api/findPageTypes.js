import { find } from "api/http";

export default function (pageTypeId, query) {
    return new Promise((resolve, reject) => {
        find(`/page_types/${pageTypeId}`, query).then(resolve).catch(reject);
    });
}
