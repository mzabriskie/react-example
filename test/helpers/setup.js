import {jsdom} from 'jsdom';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';

chai.use(chaiEnzyme());
chai.use(sinonChai);
global.expect = chai.expect;

global.document = jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;
global.location = window.location;
