import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import currentUser from 'reducers/current-user';

import tokens from 'reducers/tokens';
import currentToken from 'reducers/current-token';

import currentPage from 'reducers/current-page';

import relationshipsByProposer from 'reducers/relationships-by-proposer';
import commentsByMessage from 'reducers/comments-by-message';
import likesByComment from 'reducers/likes-by-comment';
import likesByMessage from 'reducers/likes-by-message';
import messagesByPage from 'reducers/messages-by-page';

import notifications from 'reducers/notifications';

import translations from 'reducers/translations';
import currentLocale from 'reducers/current-locale';

import settings from 'reducers/settings';

import schemaByModel from 'reducers/schema-by-model';

import leftNav from 'reducers/leftnav';
import formFocused from 'reducers/form-focused';

import title from 'reducers/title';

import resourcesReducerFactory from 'reducer-factories/resources';

const reducers = combineReducers({
    tokens,
    currentToken,
    relationshipsByProposer,
    currentUser,
    currentPage,
    messagesByPage,
    commentsByMessage,
    likesByComment,
    likesByMessage,
    leftNav,
    form,
    notifications,
    translations,
    currentLocale,
    settings,
    schemaByModel,
    formFocused,
    title,
    users: resourcesReducerFactory('USER'),
    schemas: resourcesReducerFactory('SCHEMA'),
    relationships: resourcesReducerFactory('RELATIONSHIP'),
    comments: resourcesReducerFactory('COMMENT'),
    likes: resourcesReducerFactory('LIKE'),
    messages: resourcesReducerFactory('MESSAGE'),
    pages: resourcesReducerFactory('PAGE'),
    profiles: resourcesReducerFactory('PAGE_PROFILE'),
    events: resourcesReducerFactory('PAGE_EVENT'),
    groups: resourcesReducerFactory('PAGE_GROUP')
});

export default reducers;
