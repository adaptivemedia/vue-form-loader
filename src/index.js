const options = {
    loadingClass: 'is-loading'
};

const bindEventToForm = function (form) {
    form.addEventListener('submit', () => {
        const submits = form.querySelectorAll('[type="submit"]');
        submits.forEach((submit) => {
            submit.classList.add(options.loadingClass);
            submit.disabled = true;
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
        const submit = form.querySelector('[type="submit"]');
        if (binding.value) {
            submit.classList.add(options.loadingClass);
            submit.disabled = true;
        } else {
            submit.classList.remove(options.loadingClass);
            submit.disabled = false;
        }
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