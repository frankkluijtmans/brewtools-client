<template>
	<div id="breadcrumbs">
        <span v-for="page in currentPath" :key=page.name>
            {{ page.name }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'BreadCrumbs',
    computed: {
        currentPath: function () {
            return this.$route.matched
        }
    }
}
</script>

<style scoped lang="scss">
    @import '../styles/_variables';

    #breadcrumbs {
        margin: 15px 0;
        
        color: $semidark-color;
        font-size: $SN;
        font-weight: 600;

        span {
            position: relative;
            margin-left: 20px;

            &:before {
                position: absolute;
                left: -15px;
                top: 0;
                content: ">";
            }

            &:first-child {
                margin-left: 0;

                &:before {
                    display: none;
                }
            }
        }
    }
</style>
