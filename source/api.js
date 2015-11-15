import { baseUrl } from "config"
import reduxApi, {transformers} from "redux-api"

// export default {
//   createToken: (params) =>
//     fetch(`${baseUrl}/oauth/token`, {
//       method: "POST",
//       data: JSON.stringify({
//         username: params.email,
//         password: params.password,
//         grant_type: "password"
//       })
//     })
// }

let adapter = function(fetch) {
  return function(url, opts) {
    return fetch(url, opts).then((resp)=> resp.json());
  };
}

export default reduxApi({
  tokens: {
    url: `${baseUrl}/oauth/token`,
    options: {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    },
    helpers: {
      create(params) {
        let body = {
          body: JSON.stringify({
            username: params.email,
            password: params.password,
            grant_type: "password"
          })
        };

        return [{}, body]
      }
    }
  }
}).init(adapter(fetch))
