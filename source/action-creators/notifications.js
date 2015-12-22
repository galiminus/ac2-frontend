export default {
    push: (message) => ({ type: "NOTIFICATIONS_PUSH", data: { message } })
};
