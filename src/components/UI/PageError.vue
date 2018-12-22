<template>
    <div
        class="PageError"
    >
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
    </div>
</template>

<script>
export default {
    name: 'PageError',
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
