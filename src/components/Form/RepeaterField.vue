<template>
    <div 
        :class="'TableContainer ' + this.tableClass"
    >
        <header>{{ this.schema.name }}</header>
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
                            <autocomplete-vue
                                v-if="input.name === 'name' && collections[schema.name]"
                                :list="collections[schema.name]"
                                :v-model="item[input.name]"
                                :placeholder="input.placeholder"
                            ></autocomplete-vue>
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
        <footer>
            <button
                @click="value.push({
                    name: '',
                    color: null,
                    volume: null
                })"
                type="button"
                class="ActionButton Large"
            ><i class="fa fa-plus" /> Add {{ schema.singular_label }}</button>
        </footer>
    </div>
</template>

<script>
import Vue from 'vue';
import HopRepository from '../../repositories/hop-repository';
import AutocompleteVue from 'autocomplete-vue';

Vue.component('autocomplete-vue', AutocompleteVue);

export default {
    name: 'RepeaterField',
    props: {
        value: Array,
        schema: Object
    },
    computed: {

        collections() {

            return {
                Hops: HopRepository.getAll()
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
