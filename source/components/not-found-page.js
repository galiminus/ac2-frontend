import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';
import { setTitle } from 'action-creators';

import NotFoundIcon from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import LoaderIcon from 'components/loader-icon';

const NotFoundPage = React.createClass({
    propTypes: {
        setTitle: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    componentWillMount() {
        this.props.setTitle(this.context.translation.t('links.notFound'));
    },

    render() {
        return (
            <div style={{ width: '100%', textAlign: 'center', marginTop: 'calc(38% - 80px)' }}>
                <LoaderIcon
                    size={100}
                    border={20}
                    icon={<NotFoundIcon />}
                    comment={this.context.translation.t('labels.notFound')}
                />
            </div>
        );
    }
});

export default connect(undefined, { setTitle })(NotFoundPage);
