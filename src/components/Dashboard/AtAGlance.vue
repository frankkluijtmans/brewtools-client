<template>
    <div class="TableContainer Blue">
        <header>
            <i class="fa fa-bar-chart"></i>
            Your recipes at a glance
        </header>
        <div class="ChartWrapper">
            <apexchart type=radialBar height=350 :options="chartOptions" :series="series" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'AtAGlance',
    data: () => {
        
        return {
            series: [44, 55, 67, 83],
            chartOptions: {
                plotOptions: {
                    radialBar: {
                    dataLabels: {
                        name: {
                            fontSize: '22px',
                        },
                        value: {
                            fontSize: '16px',
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: function () {

                                return 249
                            }
                        }
                    }
                    }
                },
                labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../styles/_variables';
    @import '../../styles/_mixins';

    .ChartWrapper {
        padding: 25px;
    }
</style>