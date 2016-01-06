import React, { PropTypes } from "react";
import { connect } from "react-redux";

import DefaultRawTheme from "material-ui/lib/styles/raw-themes/light-raw-theme";

const bannerImage = "http://d.facdn.net/art/phorque/1397922715/1397922715.phorque_p51mustang_mini.jpg";

const style = {
    parallax: {
        banner: {
            width: "100%",
            background: `#000 url(${bannerImage}) no-repeat center/cover`,
            height: 0,
            paddingBottom: "30%",
            position: "relative"
        },
        infos: {
            fontFamily: DefaultRawTheme.fontFamily,
            width: "100%",
            background: DefaultRawTheme.palette.textColor,
            opacity: 0.8,
            position: "absolute",
            bottom: 0,
            color: DefaultRawTheme.palette.alternateTextColor
        }
    },
    classic: {
        infos: {
            fontFamily: DefaultRawTheme.fontFamily,
            width: "100%",
            opacity: 0.8,
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
            <div>
                <div className="hide-xs hide-sm">
                    <div style={style.parallax.banner}>
                        <aside style={style.parallax.infos}>
                            <div style={{ padding: "16px 32px" }}>{ownerInfos}</div>
                        </aside>
                    </div>
                </div>
                <div className="hide-md hide-lg">
                    <aside style={style.classic.infos}>
                        <div style={{ padding: "16px 32px" }}>{ownerInfos}</div>
                    </aside>
                </div>
            </div>
        );
    }
});

export default connect(mapStateToProps)(InfoBanner);
