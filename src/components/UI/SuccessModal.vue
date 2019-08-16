<template>
    <div
        v-if="show" 
        class="BackDrop"
    >
        <div 
            class="Modal"
        >
            <i class="fa fa-check-circle ModalIcon Success" />
            <h2 class="ModalTitle">All done!</h2>
            <p class="ModalText">
                <slot />
            </p>
            <button 
                @click="fireEvent('modal_confirmed')"
                class="Button Blue"
            >OK</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SuccessModal',
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

            return new Promise((resolve) => {
                
                document.addEventListener('modal_confirmed', () => {
                    
                    this.show = false;
                    resolve();
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
