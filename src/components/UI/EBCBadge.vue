<template>
	<div 
        class="EBCBadge"
        :style="{ background: color }"
    />
</template>

<script>
import EBCHelper from '../../helpers/ebc-helper';

export default {
    name: 'EBCBadge',
    props: {
        ebc: Number
    },
    computed: {

        color: function() {
            console.log(this.ebc);
            return EBCHelper.color(parseInt(this.ebc));
        }
    }
}
</script>

<style lang="scss" scoped>
    .EBCBadge {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 10px;
    }
</style>
