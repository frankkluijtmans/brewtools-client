<template>
    <div
        v-if="show"
        class="DismissableMessage"
    >
        <slot></slot>
        <footer class="Footer">
            <button
                @click="dismiss()"
                class="ActionButton"
            >
                Dismiss
            </button>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'DismissableMessage',
    props: {
        identifier: {
            type: String,
            default: ''
        }
    },
    data() {

        return {
            show: false
        }
    },
    mounted() {

        const shouldShow = localStorage.getItem('dismissableMessage/' + this.identifier);

        if(shouldShow === null) {

            localStorage.setItem('dismissableMessage/' + this.identifier, true);
            this.show = true;
            return;
        }

        return shouldShow;
    },
    methods: {

        dismiss() {

            localStorage.setItem('dismissableMessage/' + this.identifier, false);
            this.show = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../styles/_variables';
    @import '../../styles/_mixins';

    .DismissableMessage {
        position: relative;

        margin-bottom: 20px;
        padding: 15px;

        border-radius: 5px;
        @include shadow();

        background: $white;

        font-size: $SN;

        &:before {
            position: absolute;
            top: -5px;
            left: -5px;

            display: flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            @include shadow();

            @include gradient(#e00000, #ad0000);

            color: $white;
            font-size: $S;

            content: "!";
        }

        .Footer {
            display: flex;
            justify-content: flex-end;

            padding-top: 5px;

            .ActionButton {
                background: none;
                color: $semidark-color;

                &:hover {
                    color: $dark-color;
                }
            }
        }
    }
</style>