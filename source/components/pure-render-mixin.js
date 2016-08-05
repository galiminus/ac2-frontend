import shallowEqual from 'fbjs/lib/shallowEqual';
import { PropTypes } from 'react';

function shallowCompare(instance, nextProps, nextState, nextContext) {
    return !shallowEqual(instance.props, nextProps) ||
        !shallowEqual(instance.state, nextState) ||
        !shallowEqual(instance.context, nextContext);
}

const ReactComponentWithPureRenderMixin = {
    contextTypes: {
        muiTheme: PropTypes.object,
        settings: PropTypes.object,
        currentUserPage: PropTypes.object,
        currentUser: PropTypes.object,
        translation: PropTypes.object
    },

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return shallowCompare(this, nextProps, nextState, nextContext);
    }
};

export default ReactComponentWithPureRenderMixin;
