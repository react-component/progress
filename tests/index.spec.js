var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Simulate = TestUtils.Simulate;

var expect = require('expect.js');
var Progress = require('../');
describe('progress', function () {
  it('works', function () {
    var div = document.createElement(div);
    document.body.appendChild(div);
    var progress = React.render(<Progress title="a" />, div);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(progress, 'rc-progress-title')[0].props.children).to.be('a');
    React.unmountComponentAtNode(div);
  });
});
