<template>
    <div
        class="PageLoader"
    >
        <img
            class="PageLoaderIcon" 
            src="../../assets/preloader.svg" 
        />
        <h2>
            Loading this page..
        </h2>
    </div>
</template>

<script>
export default {
    name: 'PageLoader',
    methods: {
        reloadView() {

            this.$router.go(this.$router.currentRoute);
        }
    }
}
</script>

<style lang="scss" scoped>
    .PageLoader {
        position: absolute;
        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%);

        text-align: center;

        .PageLoader {
            width: 120px;
        }
    }
</style>
