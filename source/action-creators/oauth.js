import thunk from 'redux-thunk'

export function createToken(params) {
  fetch("/oauth/token", {
    method: "POST"
  }).then(function() {

  })
}
