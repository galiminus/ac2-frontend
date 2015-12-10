import { find } from "api/http"

export default function(query) {
  return new Promise((resolve, reject) => {
    find("/posts", query).then(resolve).catch(reject)
  })
}
