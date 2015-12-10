import { find } from "api/http"

export default (id, query) => {
  return new Promise((resolve, reject) => {
    find(`/pages/${id}`, query).then(resolve).catch(reject)
  })
}
