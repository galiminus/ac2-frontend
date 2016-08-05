import React from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import NotFoundIcon from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import LoaderIcon from 'components/loader-icon';

const NotFoundPage = React.createClass({
    mixins: [PureRenderMixin],

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

export default NotFoundPage;
