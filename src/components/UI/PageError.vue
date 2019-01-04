<template>
    <div
        class="PageError"
    >
        <template 
            v-if="type === 'not_found'"
        >
            <img
                class="PageErrorIcon" 
                src="../../assets/page_404.svg" 
            />
            <h2>
                This page could not be found
            </h2>
            <router-link
                to="/"
                tag="button"
                class="Button Blue"
            >
                Back to dashboard
            </router-link>
        </template>
        <template v-else>
            <img
                class="PageErrorIcon" 
                src="../../assets/page_error.svg" 
            />
            <h2>
                This page could not be loaded
            </h2>
            <button 
                @click="reloadView()"
                class="Button Blue"
            >
                Try again
            </button>
        </template>
    </div>
</template>

<script>
export default {
    name: 'PageError',
    props: {
        type: {
            type: String,
            default: ''
        }
    },
    methods: {
        reloadView() {

            this.$router.go(this.$router.currentRoute);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../styles/_buttons';

    .PageError {
        position: absolute;
        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%);

        text-align: center;

        .PageErrorIcon {
            width: 120px;
        }
    }
</style>
