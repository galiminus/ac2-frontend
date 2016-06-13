export default {
    pushNotification: (message) => ({ type: 'NOTIFICATION_PUSH', data: { message } }),
    clearNotifications: () => ({ type: 'NOTIFICATIONS_CLEAR' })
};
