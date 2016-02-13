import React, { PropTypes } from "react";
import { connect } from "react-redux";

import {
    Tabs,
    Tab,
    List
} from "material-ui";

import api from "api";
import actionCreators from "action-creators";
import Field from "components/field";

function mapStateToProps(state, props) {
    return {
        pageType: state.pageTypes.get("user"),
        page: state.pages.get(props.params.pageId)
    };
}

const Profile = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        pageType: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    getDefaultProps() {
        return {
            page: { data: {} },
            pageType: { data_schema: { properties: {} } }
        };
    },

    render() {
        const style = {
            fontFamily: "Roboto, sans-serif",
            zIndex: 2,
            background: "white",
            height: "100%"
        };

        const generateChangeHandler = (category, field) => {
            return (value) => {
                const data = Object.assign({}, this.props.page.data);
                data[category][field] = value;

                api.pages.update(this.props.page.id, { data }).then(this.props.addResource);
            };
        };

        const tabs = [];
        for (const category of Object.keys(this.props.pageType.data_schema.properties)) {
            const fields = [];

            for (const field of Object.keys(this.props.pageType.data_schema.properties[category].properties)) {
                fields.push(
                    <Field
                        label={`labels.userPageFields.${field}`}
                        initialValues={{ value: this.props.page.data[category][field] }}
                        type={this.props.pageType.data_schema.properties[category].properties[field].type}
                        key={field}
                        formKey={field}
                        onChange={generateChangeHandler(category, field)}
                    />
                );
            }

            tabs.push(
                <Tab key={`titles.userPageFields.${category}`} label={this.context.translation.t(`titles.userPageFields.${category}`)}>
                    <List>
                        {fields}
                    </List>
                </Tab>
            );
        }
        return (
            <div style={style}>
                <Tabs className="col-xs-12 col-sm-12 col-md-6 col-md-offset-3" style={{ padding: 0 }}>{tabs}</Tabs>
            </div>
        );
    }
});

export default connect(mapStateToProps, actionCreators)(Profile);
