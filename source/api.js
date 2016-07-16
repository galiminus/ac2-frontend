import getCurrentSettings from 'api/get-current-settings';
import updateSettings from 'api/update-settings';
import createToken from 'api/create-token';
import createUser from 'api/create-user';
import findUsers from 'api/find-users';
import getMe from 'api/get-me';
import getPage from 'api/get-page';
import findPages from 'api/find-pages';
import updatePage from 'api/update-page';
import createComment from 'api/create-comment';
import updateComment from 'api/update-comment';
import destroyComment from 'api/destroy-comment';
import findComments from 'api/find-comments';
import createMessage from 'api/create-message';
import findMessages from 'api/find-messages';
import updateMessage from 'api/update-message';
import destroyMessage from 'api/destroy-message';
import createLike from 'api/create-like';
import destroyLike from 'api/destroy-like';
import createRelationship from 'api/create-relationship';
import updateRelationship from 'api/update-relationship';
import destroyRelationship from 'api/destroy-relationship';

export default {
    settings: {
        getCurrent: getCurrentSettings,
        update: updateSettings
    },

    tokens: {
        create: createToken
    },

    users: {
        create: createUser,
        find: findUsers,
        me: getMe
    },

    messages: {
        create: createMessage,
        find: findMessages,
        update: updateMessage,
        destroy: destroyMessage
    },

    pages: {
        find: findPages,
        get: getPage,
        update: updatePage
    },

    comments: {
        create: createComment,
        update: updateComment,
        find: findComments,
        destroy: destroyComment
    },

    likes: {
        create: createLike,
        destroy: destroyLike
    },

    relationships: {
        create: createRelationship,
        update: updateRelationship,
        destroy: destroyRelationship
    }
};
