import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Card, CardActions, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import PageCardTitle from 'components/page-card-title';
import PageAvatar from 'components/page-avatar';
import PageLink from 'components/page-link';

const ProfileBanner = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <Card style={{ marginTop: 32 }}>
                <CardMedia
                  overlay={<PageCardTitle page={this.props.page} />}
                >
                    <img src="http://lorempixel.com/600/337/nature/" />
                </CardMedia>
                <CardActions style={{ textAlign: 'right' }}>
                    {
                        () => {
                            if (this.props.page.permissions.update) {
                                return (<FlatButton label={this.context.translation.t('labels.editProfile')} />);
                            }
                        }()
                    }
                    <FlatButton label={this.context.translation.t('labels.about')} />
                </CardActions>
            </Card>
        );
    }
});

export default ProfileBanner;
