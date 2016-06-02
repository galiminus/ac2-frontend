
import createToken from 'api/create-token';
import createUser from 'api/create-user';
import findUsers from 'api/find-users';
import getMe from 'api/get-me';
import getPage from 'api/get-page';
import updatePage from 'api/update-page';
import createComment from 'api/create-comment';
import destroyComment from 'api/destroy-comment';
import findComments from 'api/find-comments';
import findPageTypes from 'api/find-page-type';
import createPost from 'api/create-post';
import findPosts from 'api/find-posts';
import updatePost from 'api/update-post';
import destroyPost from 'api/destroy-post';
import createLike from 'api/create-like';
import destroyLike from 'api/destroy-like';

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
        update: updatePost,
        destroy: destroyPost
    },

    pages: {
        get: getPage,
        update: updatePage
    },

    comments: {
        create: createComment,
        find: findComments,
        destroy: destroyComment
    },

    pageTypes: {
        find: findPageTypes
    },

    likes: {
        create: createLike,
        destroy: destroyLike
    }
};
