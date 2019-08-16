<template>
    <div
        v-if="show" 
        class="BackDrop"
    >
        <div 
            class="Modal"
        >
            <i class="fa fa-exclamation-circle ModalIcon" />
            <h2 class="ModalTitle">Are you sure?</h2>
            <p class="ModalText">
                <slot />
            </p>
            <button 
                @click="fireEvent('modal_confirmed')"
                class="Button Blue"
            >Confirm</button>
            <button 
                @click="fireEvent('modal_canceled')"
                class="Button"
            >Cancel</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ConfirmModal',
    data() {
        return {
            show: false
        }
    },
    methods: {
        fireEvent: function(name) {

            document.dispatchEvent(
                new Event(name)
            );
        },
        showModal: function() {

            this.show = true;

            return new Promise((resolve, reject) => {
                
                document.addEventListener('modal_confirmed', () => {
                    
                    this.show = false;
                    resolve();
                })

                document.addEventListener('modal_canceled', () => {
                    
                    this.show = false;
                    reject();
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../styles/_modal';

    .BackDrop {

        .Modal {

            .Button.Blue {
                margin-right: 10px;
            }
        }
    }
</style>
