<template>
    <div class="root">
        <div>
            <section>
                <h2>Form with v-loading</h2>
                <form @submit.prevent="save" v-loading="loading">
                    <button class="btn" type="submit">Submit form</button>
                    <button class="btn" type="submit">Second Submit button</button>
                    <button class="btn" type="submit" name="publish">Submit button with name</button>
                </form>
            </section>
            <section>
                <h2>Form without v-loading (will reload page)</h2>
                <form>
                    <button class="btn" type="submit">Submit form</button>
                    <button class="btn" type="submit" name="exit">Submit form & exit</button>
                </form>
            </section>
        </div>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                loading: false
            }
        },
        methods: {
            save() {
                this.loading = true;
                setTimeout(() => this.loading = false, 3000);
            }
        }
    }
</script>

<style lang="scss" scoped>

    .root {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    section {
        margin-bottom: 32px;
    }

    .btn {
        padding: 16px 48px;
        background: #c9c9c9;
        border: 1px solid #ccc;
        font-size: 16px;
        cursor: pointer;
    }

    .btn.is-disabled, .btn:disabled {
        background: #d9d9d9;
        pointer-events: none;
        color: #000;
    }

    .is-loading {
        position: relative;
        transition: padding-right 0.3s ease-out;
        pointer-events: none;

        &::after {
            content: "";
            position: absolute;
            border-radius: 100%;
            right: 6px;
            top: calc(50% - 5px);
            width: 10px;
            height: 10px;
            border: 2px solid rgba(255, 255, 255, 0.5);
            border-left-color: #fff;
            border-top-color: #fff;
            animation: spin 0.6s infinite linear, grow 0.3s forwards ease-out;
        }
    }

    @keyframes spin {
        to {
            transform: rotate(359deg);
        }
    }

    @keyframes grow {
        to {
            width: 14px;
            height: 14px;
            margin-top: -8px;
            right: 13px;
        }
    }
</style>
