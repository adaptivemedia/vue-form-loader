const options = {
    loadingClass: 'is-loading'
};

const addLoaderToSubmit = function (submit) {
    submit.classList.add(options.loadingClass);
    if (! submit.hasAttribute('name')) {
        submit.disabled = true;
    }
};

const removeLoaderFromSubmit = function (submit) {
    submit.classList.remove(options.loadingClass);
    submit.disabled = false;
};

const bindEventToForm = function (form) {
    form.addEventListener('submit', () => {
        Array.from(form.querySelectorAll('[type="submit"]')).forEach(submit => {
            addLoaderToSubmit(submit);
        });
    });
};

const FormLoaderDirective = {
    // Usage: <form v-loading>
    bind: function (form, binding) {
        bindEventToForm(form);
    },
    // Usage: <form v-loading="model">
    update: function (form, binding) {
        Array.from(form.querySelectorAll('[type="submit"]')).forEach(submit => {
            if (binding.value) {
                addLoaderToSubmit(submit);
            } else {
                removeLoaderFromSubmit(submit);
            }
        });
    },
};

export function install(Vue) {
    if (install.installed) return;
    install.installed = true;

    Vue.directive('loading', FormLoaderDirective);
}

const FormLoader = {
    install,
    autoBindToForms: function() {
        Array.from(document.querySelectorAll('form')).forEach(form => {
            bindEventToForm(form);
        });
    },
    set loadingClass(value) {
        options.loadingClass = value;
    }
};

let GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(FormLoader);
}

export default FormLoader;
