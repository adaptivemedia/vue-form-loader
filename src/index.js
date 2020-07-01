const options = {
    loadingClass: 'is-loading',
    disabledClass: 'is-disabled',
};

const addLoaderToSubmit = function (submit, onlyOneSubmit) {
    // Only add a loading class to the clicked button unless it's just one
    // button. This enabled the loading class to be added to a form with
    // only one button if the user pressed enter when in a text input
    if (onlyOneSubmit || document.activeElement === submit) {
        submit.classList.add(options.loadingClass);
    }

    // A submit button with a name cannot be disabled since
    // then we can't check if the specific button was pressed server side
    if (submit.hasAttribute('name')) {
        submit.classList.add(options.disabledClass);
    } else {
        submit.disabled = true;
    }
};

const removeLoaderFromSubmit = function (submit) {
    submit.classList.remove(options.loadingClass);
    submit.classList.remove(options.disabledClass);
    submit.disabled = false;
};

const bindEventToForm = function (form) {
    form.addEventListener('submit', () => {
        const submits = form.querySelectorAll('[type="submit"]');
        const onlyOneSubmit = submits.length <= 1;
        Array.from(submits).forEach(submit => {
            addLoaderToSubmit(submit, onlyOneSubmit);
        });
    });
};

const FormLoaderDirective = {
    // Usage: <form v-loading>
    bind: function (form, binding) {
        bindEventToForm(form);
    },
    // Usage: <form v-loading="loading">
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
    },
    set disabledClass(value) {
        options.disabledClass = value;
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
