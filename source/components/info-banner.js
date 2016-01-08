import React, { PropTypes } from "react";
import { connect } from "react-redux";

import DefaultRawTheme from "material-ui/lib/styles/raw-themes/light-raw-theme";

const style = {
    classic: {
        infos: {
            fontFamily: DefaultRawTheme.fontFamily,
            width: "100%",
            position: "fixed",
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
        translations: PropTypes.object.isRequired,
        main: PropTypes.bool
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
            ownerInfos = <h1>{this.props.translations.t("links.mainFeed")}</h1>;
        }

        return (
            <div className="col-xs-12">
                <aside style={style.classic.infos}>
                    <div style={{ padding: "16px 32px" }}>{ownerInfos}</div>
                </aside>
            </div>
        );
    }
});

export default connect(mapStateToProps)(InfoBanner);
