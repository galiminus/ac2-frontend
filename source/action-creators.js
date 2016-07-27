import currentUser from 'action-creators/current-user';
import currentToken from 'action-creators/current-token';
import currentPage from 'action-creators/current-page';
import tokens from 'action-creators/tokens';
import leftNav from 'action-creators/leftnav';
import notifications from 'action-creators/notifications';
import resources from 'action-creators/resources';
import translations from 'action-creators/translations';
import currentLocale from 'action-creators/current-locale';
import title from 'action-creators/title';

export default {
    ...currentUser,
    ...currentToken,
    ...currentPage,
    ...tokens,
    ...leftNav,
    ...notifications,
    ...translations,
    ...currentLocale,
    ...resources,
    ...title
};
