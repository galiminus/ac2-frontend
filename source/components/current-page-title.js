import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { ToolbarTitle } from "material-ui";

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

const style = {
    fontFamily: "Roboto, sans-serif",
    fontWeight: 400,
    letterSpacing: 3,
    color: '#ffffff'
};

const CurrentPageTitle = React.createClass({
    propTypes: {
        owner: PropTypes.object,
        main: PropTypes.bool
    },

    contextTypes: {
        translation: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired
    },

    render() {
        let ownerInfos;

        // if (this.props.owner) {
        //     switch (this.props.owner.type) {
        //     case "users":
        //         ownerInfos = <h1>{this.props.page.data.personal_informations.full_name}</h1>;
        //         break;
        //     default:
        //         break;
        //     }
        // } else if (this.props.main) {
        //     ownerInfos = <h1>{this.context.translation.t("links.mainFeed")}</h1>;
        // }

        ownerInfos = this.context.translation.t("links.mainFeed");
        return (
            <ToolbarTitle style={style} text={ownerInfos} />
        );
    }
});

export default connect(mapStateToProps)(CurrentPageTitle);
