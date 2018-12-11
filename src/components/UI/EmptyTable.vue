<template>
	<div id="empty-table">
        <img
            class="TumbleweedIcon" 
            src="../../assets/tumbleweed.svg" 
        />
        <h3
            class="EmptyTableHeader"
        >
            Nothing to see here..
        </h3>
        <p
            class="EmptyTableText"
        >
            Start creating some recipes to fill up this overview.
        </p>
    </div>
</template>

<script>
export default {
    name: 'EmptyTable'
}
</script>

<style scoped lang="scss">
    @import '../../styles/_variables';

    #empty-table {
        padding: 50px 25px;
        text-align: center;

        .TumbleweedIcon {
            width: 80px;
            height: 80px;
            margin-bottom: 15px;
        }

        .EmptyTableHeader {
            font-size: 21px;
            margin: 0;
        }

        .EmptyTableText {
            font-size: 14px;
            margin: 10px 0 0;
        }
    }
</style>
