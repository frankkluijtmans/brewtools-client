<template>
    <div
        v-if="show" 
        class="BackDrop"
    >
        <div 
            class="Modal"
        >
            <span class="ModalIcon">
                !
            </span>
            <h2 class="ModalTitle">Are you sure?</h2>
            <p class="ModalText">
                <slot />
            </p>
            <button 
                @click="fireEvent('modal_confirmed')"
                class="Button Confirm"
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
            max-width: calc(100vw - 50px);
            padding: 25px;
            border-radius: 5px;

            background: $white;

            transform: translate(-50%, -50%);

            text-align: center;

            .ModalIcon {
                display: inline-block;
                width: 100px;
                height: 100px;
                margin: 0 0 15px;

                border-radius: 50%;
                border: 3px solid $red;

                font-size: 72px;
                color: $red;
            }

            .ModalTitle {
                margin: 0 0 15px;

                font-size: $XXL;
                font-weight: 300;
                color: $dark-color;
            }

            .ModalText {
                margin: 0 0 25px;

                font-size: $N;
                font-weight: 300;
                color: $semidark-color;
            }

            .Button {
                display: inline-block;
                margin-left: 10px;
                border: none;
                border-radius: 5px;
                padding: 15px 18px;
                color: $white;
                background: $semidark-color;
                text-decoration: none;
                font-size: $SN;
                cursor: pointer;

                &.Confirm {
                    margin-left: 0;
                    background: $blue;
                }
            }
        }
    }
</style>
