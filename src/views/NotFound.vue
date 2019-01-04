<template>
	<div
        class="PageNotFound"
    >
        <img
            class="PageNotFoundIcon" 
            src="../assets/page_404.svg" 
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
    </div>
</template>

<script>
export default {
	name: 'NotFound'
}
</script>

<style lang="scss" scoped>
	@import '../styles/_buttons';

    .PageNotFound {
        position: absolute;
        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%);

        text-align: center;

        .PageNotFoundIcon {
            width: 120px;
        }
    }
</style>