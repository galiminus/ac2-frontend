import { find } from "api/http"

export default (id, query, dispatch) => {
  return new Promise((resolve, reject) => {
    find(`/pages/${id}`, query)
    .then((data) => {
      dispatch({
        type: "ADD_PAGE",
        data: data
      })
      resolve(data)
    })
    .catch(reject)
  })
}
