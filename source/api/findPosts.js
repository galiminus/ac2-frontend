import { find } from "api/http"

export default function(query, dispatch) {
  return new Promise((resolve, reject) => {
    find("/posts", query).then(resolve).catch(reject)
  })
}
