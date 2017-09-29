// es6 polyfill
import 'core-js/fn/array/find';
import 'core-js/fn/array/find-index';

import Button from './components/button';
import Icon from './components/icon';
import Input from './components/input';
import LoadingBar from './components/loading-bar';
import Notice from './components/notice';
import Message from './components/message';
import locale from './locale';

const artery = {
    iButton: Button,
    Button,
    ButtonGroup: Button.Group,
    Icon,
    Input,
    iInput: Input,
    LoadingBar,
    Message,
    Notice
};

const install = function (Vue, opts = {}) {
    locale.use(opts.locale);
    locale.i18n(opts.i18n);

    Object.keys(artery).forEach((key) => {
        Vue.component(key, artery[key]);
    });

    Vue.prototype.$Loading = LoadingBar;
    Vue.prototype.$Message = Message;
    Vue.prototype.$Notice = Notice;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports = Object.assign(artery, {install});   // eslint-disable-line no-undef