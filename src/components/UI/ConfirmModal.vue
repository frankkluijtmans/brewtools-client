<template>
    <div
        v-if="show" 
        class="BackDrop"
    >
        <div 
            class="Modal"
        >
            <i class="fa fa-exclamation-circle ModalIcon"></i>
            <h2 class="ModalTitle">Are you sure?</h2>
            <p class="ModalText">
                <slot />
            </p>
            <button @click="fireEvent('modal_confirmed')">Confirm</button>
            <button @click="fireEvent('modal_canceled')">Cancel</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ConfirmModal',
    props: {
        name: String
    },
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
    @import '../../styles/_variables';

    .BackDrop {
        position: fixed;
        top: 0;
        left: 0;

        display: block;
        width: 100%;
        height: 100%;

        background: rgba(0,0,0,0.5);

        .Modal {
            position: absolute;
            top: 50%;
            left: 50%;

            width: 400px;
            padding: 25px;
            border-radius: 5px;

            background: $white;

            transform: translate(-50%, -50%);

            text-align: center;

            .ModalIcon {
                margin: 0 0 15px;

                font-size: 48px;
                color: $red;
            }

            .ModalTitle {
                margin: 0 0 15px;

                font-size: $XXL;
                font-weight: 300;
                color: $dark-color;
            }

            .ModalText {
                margin: 0 0 15px;

                font-size: $N;
                font-weight: 300;
                color: $semidark-color;
            }
        }
    }
</style>
