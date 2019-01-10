<template>
    <div 
        :class="'TableContainer ' + this.tableClass"
    >
        <header>{{ this.schema.name }}</header>
        <div
            class="ResponsiveTable"
        >
            <table>
                <tbody>
                    <tr class="TableRow TableHeader">
                        <td
                            v-for="(input, index) in schema.fields"
                            :key="index"
                        >
                            {{ input.header }}
                        </td>
                        <td></td>
                    </tr>
                    <template 
                        v-for="(item, index) in value"
                    >
                        <tr 
                            :key="index"
                            class="TableRow"
                        >
                            <td
                                v-for="(input, index) in schema.fields"
                                :key="index"
                            >
                                <AutoComplete
                                    v-if="input.name === 'name' && collections[schema.name]"
                                    v-model="item[input.name]"
                                    @input="item[input.name] = $event"
                                    :list="collections[schema.name]"
                                    :placeholder="input.placeholder"
                                    :required="true"
                                />
                                <div v-else>
                                    <div 
                                        v-if="input.unit_label && input.unit_label.constructor === Array"
                                    >
                                        <input
                                            min="0"
                                            type="number" 
                                            v-model="item[input.name].amount" 
                                        />
                                        <select
                                            class="InputLabel"
                                            v-model="item[input.name].unit" 
                                        >
                                            <option 
                                                v-for="(label, index) in input.unit_label"
                                                :key="index"
                                            >
                                                {{ label }}
                                            </option>
                                        </select>
                                        <i class="fa fa-caret-down SelectBoxIcon" />
                                    </div>
                                    <div v-else>
                                        <input
                                            v-if="input.type === 'number'"
                                            min="0"
                                            :type="input.type" 
                                            v-model="item[input.name]" 
                                        />
                                        <input
                                            v-else-if="input.type === 'float'"
                                            step="0.1"
                                            min="0"
                                            type="number" 
                                            v-model="item[input.name]" 
                                        />
                                        <input
                                            v-else
                                            :type="input.type" 
                                            v-model="item[input.name]" 
                                            :placeholder="input.placeholder"
                                        />
                                        <label 
                                            v-if="input.unit_label"
                                            class="InputLabel"
                                        >
                                            {{ input.unit_label }}
                                        </label>
                                    </div>
                                </div>
                            </td>
                            <td class="RemoveFields">
                                <a 
                                    @click="value.splice(index, 1)"
                                    type="button"
                                ><i class="fa fa-trash" /></a>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <footer>
            <button
                @click="value.push(newRow())"
                type="button"
                class="ActionButton Large"
            ><i class="fa fa-plus" /> Add {{ schema.singular_label }}</button>
        </footer>
    </div>
</template>

<script>
import HopRepository from '../../repositories/hop-repository';
import FermentableRepository from '../../repositories/fermentable-repository';
import AutoComplete from '../../components/Form/AutoComplete';

export default {
    name: 'RepeaterField',
    components: {
        AutoComplete
    },
    props: {
        value: Array,
        schema: Object
    },
    computed: {

        collections() {

            return {
                Hops: HopRepository.getAll(),
                Fermentables: FermentableRepository.getAll()
            }
        },
        tableClass() {

            const words = this.schema.name.split(" ");
            let className = '';

            words.forEach(word => {
                
                className += word.charAt(0).toUpperCase() + word.slice(1);
            })
            
            return className;
        }
    },
    methods: {
        
        newRow() {

            let row = {};

            this.schema.fields.forEach(property => {

                if(property.unit_label 
                    && property.unit_label.constructor === Array) {

                    row[property.name] = {
                        amount: null,
                        unit: property.unit_label[0]
                    }

                    return;
                }

                row[property.name] = (property.type === 'text') ? '' : null;
            })
            
            return row;
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../styles/_variables';
    
    .TableRow {

        .RemoveFields {
            text-align: right;
            font-size: $N;

            a {
                cursor: pointer;
            }
        }
    }
</style>
