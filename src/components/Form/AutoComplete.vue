<template>
    <div 
        :class="classPrefix"
        @mousedown="mousefocus = true"
        @mouseout="mousefocus = false"
    >
        <input 
            type="text"
            @blur="focused = false"
            @focus="focused = true"
            v-model="search"
            :placeholder="placeholder"
            @keydown.down.prevent.stop="moveDown()"
            @keydown.up.prevent.stop="moveUp()"
            @keydown.enter.prevent.stop="select(selectedIndex)"
            @keydown.tab="mousefocus = false"
            ref="input"
            :required="required"
        >
        <div 
            v-if="showSuggestions"
            :class="classPrefix + '__suggestions'"
        >
            <div v-for="(entry, index) in filteredEntries"
                @click="select(index)"
                :key="index"
                :class="[classPrefix + '__entry', selectedClass(index)]">
                {{ entry[property] }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AutoComplete',
        data() {
            return {
                entries: [],
                search: "",
                focused: false,
                mousefocus: false,
                selectedIndex: 0
            };
        },
        computed: {
            filteredEntries() {

                if (this.search.length <= this.threshold) {

                    return [];
                } else {

                    return this.entries.filter(entry => {

                        if (this.ignoreCase) {

                            return (
                                entry[this.property]
                                    .toLowerCase()
                                    .indexOf(this.search.toLowerCase()) > -1
                            );
                        }
                        
                        return entry[this.property].indexOf(this.search) > -1;
                    });
                }
            },
            hasSuggestions() {

                if (this.search.length <= this.threshold) {

                    return false;
                }

                return this.filteredEntries.length > 0;
            },
            showSuggestions() {

                if (!this.hasSuggestions) {

                    return false;
                }

                if (this.focused || this.mousefocus) {

                    return true;
                }

                return false;
            }
        },
        created() {
            console.log(this.value)
            this.search = this.value;

            if (this.list !== undefined) {
                this.setEntries(this.list);
            }
        },
        methods: {

            select(index) {

                if (this.hasSuggestions) {

                    this.search = this.filteredEntries[index][this.property];
                    this.$emit("selected", this.search);

                    if (this.autoHide) {

                        this.mousefocus = false;
                        this.focused = false;
                        this.$refs.input.blur();
                    } else {

                        this.$nextTick(() => {
                            this.$refs.input.focus();
                        });
                    }
                }
            },
            setEntries(list) {

                this.entries = list;
            },
            moveUp() {

                if (this.selectedIndex - 1 < 0) {

                    this.selectedIndex = this.filteredEntries.length - 1;
                } else {

                    this.selectedIndex -= 1;
                }
            },
            moveDown() {

                if (this.selectedIndex + 1 > this.filteredEntries.length - 1) {

                    this.selectedIndex = 0;
                } else {

                    this.selectedIndex += 1;
                }
            },
            selectedClass(index) {

                if (index === this.selectedIndex) {

                    return this.classPrefix + "__selected";
                }

                return "";
            }
        },
        props: {
            classPrefix: {
                type: String,
                required: false,
                default: "autocomplete"
            },
            list: {
                type: Array,
                required: false
            },
            placeholder: {
                type: String,
                required: false
            },
            property: {
                type: String,
                required: false,
                default: "name"
            },
            required: {
                type: Boolean,
                required: false,
                default: false
            },
            ignoreCase: {
                type: Boolean,
                required: false,
                default: true
            },
            threshold: {
                type: Number,
                required: false,
                default: 0
            },
            value: {
                required: false,
                default: ""
            },
            autoHide: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        watch: {
            filteredEntries(value) {

                if (this.selectedIndex > value.length - 1) {

                    this.selectedIndex = 0;
                }
            },
            search(value) {

                this.$emit("input", value);
            },
            value(newValue) {

                this.search = newValue;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '../../styles/_variables';
    @import '../../styles/_mixins';

    .autocomplete {
        position: relative;

        input {
            width: 100%;
        }
    }

    .autocomplete__suggestions {
        position: absolute;
        top: 100%;
        z-index: $SecondFloor;

        width: 100%;
        min-width: 200px;
        max-height: 250px;
        overflow-y: scroll;
        overflow-x: hidden;

        border-radius: 5px;
        @include shadow();
        background-color: #fff;
    }

    .autocomplete__entry {
        padding: 5px 7px;

        &:hover {
            background-color: #f7f7f9;
            cursor: default;
        }
    }

    .autocomplete__selected {
        background-color: darken(#f7f7f9, 5%);
    }
</style>