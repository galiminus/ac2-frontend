import React, { PropTypes } from "react";
import { connect } from "react-redux";

import DefaultRawTheme from "material-ui/lib/styles/raw-themes/light-raw-theme";

const style = {
    classic: {
        infos: {
            fontFamily: DefaultRawTheme.fontFamily,
            position: "fixed",
            width: "100%",
            paddingRight: 16,
            zIndex: 2,
            background: DefaultRawTheme.palette.textColor,
            color: DefaultRawTheme.palette.alternateTextColor
        }
    }
};

function mapStateToProps(state, props) {
    if (props.main || !props.page) return {};

    let owner;
    switch (props.page.owner_type) {
    case "users":
        owner = state.users.get(props.page.owner_id);
        break;
    default:
        break;
    }

    return { owner };
}

const InfoBanner = React.createClass({
    propTypes: {
        owner: PropTypes.object,
        page: PropTypes.object,
        main: PropTypes.bool
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    render() {
        let ownerInfos;

        if (this.props.owner) {
            switch (this.props.owner.type) {
            case "users":
                ownerInfos = <h1>{this.props.page.data.personal_informations.full_name}</h1>;
                break;
            default:
                break;
            }
        } else if (this.props.main) {
            ownerInfos = <h1>{this.context.translation.t("links.mainFeed")}</h1>;
        }

        return (

            <aside style={style.classic.infos}>
                <div style={{ padding: "16px 32px" }}>{ownerInfos}</div>
            </aside>
        );
    }
});

export default connect(mapStateToProps)(InfoBanner);
