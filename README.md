# Vue Form Loader Directive

[![Latest Version on NPM](https://img.shields.io/npm/v/vue-form-loader.svg?style=flat-square)](https://npmjs.com/package/vue-form-loader)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)

Use this Vue directive to add a loader on a `<form>`s submit event.

## Installation

You can install the package via yarn:

```bash
yarn add vue-form-loader
```

or npm:

```bash
npm install vue-form-loader --save
```

## Usage

Import the directive and use it:

```javascript
// Eg. in app.js
import FormLoader  from 'vue-form-loader';
Vue.use(FormLoader);
```

There are several ways to use the directive on a `<form>`.

#### Bind the directive automatically to all `<form>` elements:
```js
// Eg. in app.js
const app = new Vue({
    el: '#app',
    mounted() {
        FormLoader.autoBindToForms();
    }
});
```

#### Add the directive to a regular `<form>`:
```html
<form v-loading>
    <button type="submit">Submit form</button>
</form>
```

#### Add the directive to a Vue-component `<form>` to sync the loading state:
```html
<template>
    <form v-loading="loading">
        <button type="submit">Submit form</button>
    </form>
</template>
<script>
    export default {
        data() {
            return {
                loading: false
            }
        }
    }
</script>
```

### The loader class
You need to create the css for button loader yourself. When a form submits,
the class `is-loading` will be added to the submit button (must be of `type="submit").

To change which class the directive adds/removes:, set `FormLoader.loadingClass` in your `app.js`

### Disabling
On form submission, the submit button(s) will be `disabled` to prevent erroneous double submissions. 
Buttons with the `name` attribute will however not be disabled since that would prevent them from 
being included in the request. To make sure they are disabled, use css and target the loading class instead.

### Developing

`yarn start` will start the dev server to load the `docs/index.html` example file.

### Publish a new release:
- Build changes: `yarn build`
- Bump version: `npm version major/minor/patch`
- Publish: `npm publish` 

### Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

### Security

If you discover any security related issues, please contact Victor Eliasson instead of using the issue tracker.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

## Credits

- [Victor Eliasson](https://github.com/viirre)
- [All Contributors](../../contributors)
