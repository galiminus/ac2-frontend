jest.dontMock("pages/posts");

const React = require("react");
const ReactDOM = require("react-dom");
const TestUtils = require("react-addons-test-utils");

const PostsPages = require("pages/posts");
const RaisedButton = require("material-ui").RaisedButton;

describe("PostsPages", () => {
    it("should works", () => {
        const page = TestUtils.renderIntoDocument(
            <PostsPages params={{ pageId: 1 }}/>
        );
    });
});
