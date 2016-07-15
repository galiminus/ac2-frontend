import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routeReducer } from 'redux-simple-router';

import users from 'reducers/users';
import currentUser from 'reducers/current-user';

import tokens from 'reducers/tokens';
import currentToken from 'reducers/current-token';

import currentPage from 'reducers/current-page';

import groups from 'reducers/groups';
import relationships from 'reducers/relationships';
import relationshipsByProposer from 'reducers/relationships-by-proposer';
import pages from 'reducers/pages';
import pagesByType from 'reducers/pages-by-type';
import messages from 'reducers/messages';
import comments from 'reducers/comments';
import commentsByMessage from 'reducers/comments-by-message';
import likesByComment from 'reducers/likes-by-comment';
import likesByMessage from 'reducers/likes-by-message';
import messagesByPage from 'reducers/messages-by-page';
import likes from 'reducers/likes';

import notifications from 'reducers/notifications';

import translations from 'reducers/translations';
import currentLocale from 'reducers/current-locale';

import settings from 'reducers/settings';

import leftNav from 'reducers/leftnav';

const reducers = combineReducers({
    tokens,
    currentToken,
    users,
    groups,
    relationships,
    relationshipsByProposer,
    currentUser,
    currentPage,
    messages,
    messagesByPage,
    pages,
    pagesByType,
    comments,
    commentsByMessage,
    likesByComment,
    likesByMessage,
    likes,
    leftNav,
    form,
    notifications,
    translations,
    currentLocale,
    settings,
    routing: routeReducer
});

export default reducers;
