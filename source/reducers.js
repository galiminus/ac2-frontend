import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routeReducer } from 'redux-simple-router';

import users from 'reducers/users';
import currentUser from 'reducers/current-user';

import tokens from 'reducers/tokens';
import currentToken from 'reducers/current-token';

import currentPage from 'reducers/current-page';

import pages from 'reducers/pages';
import pageTypes from 'reducers/page_types';
import posts from 'reducers/posts';
import comments from 'reducers/comments';
import commentsByPost from 'reducers/comments-by-post';
import likesByComment from 'reducers/likes-by-comment';
import likesByPost from 'reducers/likes-by-post';
import postsByPage from 'reducers/posts-by-page';
import likes from 'reducers/likes';

import notifications from 'reducers/notifications';

import translations from 'reducers/translations';

import leftNav from 'reducers/leftnav';

const reducers = combineReducers({
    tokens,
    currentToken,
    users,
    currentUser,
    currentPage,
    posts,
    postsByPage,
    pages,
    pageTypes,
    comments,
    commentsByPost,
    likesByComment,
    likesByPost,
    likes,
    leftNav,
    form,
    notifications,
    translations,
    routing: routeReducer
});

export default reducers;
