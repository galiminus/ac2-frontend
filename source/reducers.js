import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { routeReducer } from "redux-simple-router";

import users from "reducers/users";
import currentUser from "reducers/current-user";

import tokens from "reducers/tokens";
import currentToken from "reducers/current-token";

import pages from "reducers/pages";
import pageTypes from "reducers/page_types";
import posts from "reducers/posts";
import comments from "reducers/comments";
import likes from "reducers/likes";

import notifications from "reducers/notifications";

import translations from "reducers/translations";

import leftNav from "reducers/leftnav";

const reducers = combineReducers({
    tokens,
    currentToken,
    users,
    currentUser,
    posts,
    pages,
    pageTypes,
    comments,
    likes,
    leftNav,
    form,
    notifications,
    translations,
    routing: routeReducer
});

export default reducers;
