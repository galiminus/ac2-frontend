jest.dontMock("pages/posts");

const React = require("react");
const ReactDOM = require("react-dom");
const TestUtils = require("react-addons-test-utils");

const PostsPages = require("pages/posts");

function setup() {
  let props = {
    pageId: 1
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<PostsPages {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe("PostsPages", () => {
    it("should works", () => {
        { output } = setup();
    });
});
