global.requestAnimationFrame = (cb) => setTimeout(cb, 0);

const Enzyme = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

Enzyme.configure({ adapter: new Adapter() });
