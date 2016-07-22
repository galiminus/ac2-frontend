import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import { Link } from 'react-router';

import SettingsIcon from 'material-ui/svg-icons/action/settings';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

function mapStateToProps(state) {
    return {
        properties: state.schemas.get(state.settings.schema_id).data.properties
    };
}

const SettingsMenu = React.createClass({
    propTypes: {
        translation: PropTypes.object.isRequired,
        properties: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <IconMenu
                iconButtonElement={
                    <IconButton style={{ height: 56 }}>
                        <SettingsIcon
                            color="#ffffff"
                        />
                    </IconButton>
                }
            >
                {
                    Object.keys(this.props.properties).map((category) => {
                        return (
                            <Link to={`/settings/${category}`} style={{ textDecoration: 'none' }} key={category}>
                                <MenuItem
                                    primaryText={this.props.translation.t(`settings.${category}`)}
                                />
                            </Link>
                        );
                    })
                }
            </IconMenu>
        );
    }
});

export default connect(mapStateToProps)(SettingsMenu);
