import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { routeReducer } from "redux-simple-router";

import users from "reducers/users";
import currentUser from "reducers/current-user";

import tokens from "reducers/tokens";
import currentToken from "reducers/current-token";

import pages from "reducers/pages";
import posts from "reducers/posts";

import notifications from "reducers/notifications";

import leftNav from "reducers/leftnav";

const reducers = combineReducers({
    tokens,
    currentToken,
    users,
    currentUser,
    posts,
    pages,
    leftNav,
    form,
    notifications,
    routing: routeReducer
});

export default reducers;
