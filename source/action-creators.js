import currentUser from 'action-creators/current-user';
import currentToken from 'action-creators/current-token';
import currentPage from 'action-creators/current-page';
import tokens from 'action-creators/tokens';
import leftNav from 'action-creators/leftnav';
import notifications from 'action-creators/notifications';
import resources from 'action-creators/resources';
import translations from 'action-creators/translations';
import messages from 'action-creators/messages';

export default {
    ...currentUser,
    ...currentToken,
    ...currentPage,
    ...tokens,
    ...leftNav,
    ...notifications,
    translations,
    ...resources,
    ...messages
};
