<template>
	<div id="breadcrumbs">
        <span 
            v-for="page in currentPath" 
            :key="page.name"
            :class="page.name === 'Dashboard' ? 'Light' : ''"
        >
            <router-link :to=page.path>
                {{ page.name }}
            </router-link>
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
        position: relative;
        z-index: $FirstFloor;
        
        padding: 0 0 15px;
        
        color: $semidark-color;
        font-size: $SN;
        font-weight: 600;

        span {
            position: relative;
            margin-left: 20px;

            a {
                color: $semidark-color;
                text-decoration: none;
            }

            &.Light {

                a {
                    color: $light-color;
                }
            }

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
