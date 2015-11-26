export default (value) => {
  if (!value) {
    return 'required'
  }
  else if (value.length < 6) {
    return 'invalid'
  }
}
