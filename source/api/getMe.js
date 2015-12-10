import { find } from "api/http"

export default (query) => {
  return new Promise((resolve, reject) => {
    find("/users/me", query).then(resolve).catch(reject)
  })
}
