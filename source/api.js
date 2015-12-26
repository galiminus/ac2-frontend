import createToken from "api/createToken";
import createUser from "api/createUser";
import findUsers from "api/findUsers";
import getMe from "api/getMe";
import createPost from "api/createPost";
import findPosts from "api/findPosts";
import updatePost from "api/updatePost";
import getPage from "api/getPage";
import updatePage from "api/updatePage";
import createComment from "api/createComment";
import findComments from "api/findComments";

export default {
    tokens: {
        create: createToken
    },

    users: {
        create: createUser,
        find: findUsers,
        me: getMe
    },

    posts: {
        create: createPost,
        find: findPosts,
        update: updatePost
    },

    pages: {
        get: getPage,
        update: updatePage
    },

    comments: {
        create: createComment,
        find: findComments
    }
};
