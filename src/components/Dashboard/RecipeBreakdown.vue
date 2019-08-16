<template>
    <div 
        class="ChartWrapper"
    >
        <apexchart
            type="radialBar"
            :options="chartOptions"
            :series="series"
        />
    </div>
</template>

<script>
export default {
    name: 'RecipeBreakdown',
    props: {
        recipes: {
            type: Array,
            default: () => []
        }
    },
    data() {
        
        return {
            series: this.getRecipeCounts(),
            chartOptions: {
                plotOptions: {
                    radialBar: {
                        hollow: {
                            margin: 0,
                            size: '60%',
                            background: '#fff',
                            position: 'front',
                            dropShadow: {
                                enabled: true,
                                top: 0,
                                left: 0,
                                blur: 8,
                                opacity: 0.24
                            }
                        },
                        track: {
                            background: '#fff',
                            strokeWidth: '80%',
                            margin: 2,
                            dropShadow: {
                                enabled: true,
                                top: 0,
                                left: 0,
                                blur: 0,
                                opacity: 0.35
                            }
                        },
                        dataLabels: {
                            name: {
                                fontFamily: 'Nunito Sans'
                            },
                            value: {
                                fontSize: '24px',
                                fontFamily: 'Nunito Sans'
                            },
                            total: {
                                show: true,
                                label: 'Total recipes',
                                formatter: () => {
                                    return this.recipes.length;
                                }
                            }
                        }
                    },
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        type: 'horizontal',
                        shadeIntensity: 0.2,
                        gradientToColors: ['#ABE5A1'],
                        inverseColors: true,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100]
                    }
                },
                stroke: {
                    lineCap: 'round'
                },
                labels: this.getRecipeTypes()
            }
        }
    },
    methods: {

        getRecipeTypes() {

            return this.recipes.map(recipe => {

                return recipe.style;
            })
        },
        getRecipeCounts() {

            const types = this.getRecipeTypes();
            const counts = [];

            types.forEach(type => {

                let count = 0;

                this.recipes.forEach(recipe => {

                    if(recipe.style === type) count++;
                });

                counts.push(Math.round(count / this.recipes.length * 100));
            })


            return counts;
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../styles/_variables';
    @import '../../styles/_mixins';

    .ChartWrapper {
        margin: 20px 0;
    }
</style>