import init from './init';
import factory from './factory';
import MyModule from './components/module';
import Alertifier from './components/alertifier';

window.app = {
    start(config) {
        init(MyModule, document.querySelector('.main h1'));
        this.alertifiers = factory(Alertifier, document.querySelectorAll('.btn'));
    }
};
