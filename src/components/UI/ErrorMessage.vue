<template>
    <div
        :class="{ isVisible : show }"
        class="ErrorMessage"
    >
        <div class="ErrorMessageIcon">
            <i class="fa fa-exclamation-circle" />
        </div>
        {{ message }}
    </div>
</template>

<script>
import ErrorDictionary from '../../dictionaries/error-dictionary';

export default {
    name: 'ErrorMessage',
    props: {
        name: String
    },
    data() {
        return {
            show: false,
            message: "Something went wrong, please try again later."
        }
    },
    mounted() {
        document.addEventListener('error_message', e => {

            if(e.detail.message !== '') {

                this.message = ErrorDictionary[e.detail.type];
            }

            this.show = true;
            setTimeout(() => this.show = false, 3000);
        })
    }
}
</script>

<style lang="scss" scoped>
    @import '../../styles/_variables';
    @import '../../styles/_mixins';

    .ErrorMessage {
        position: fixed;
        z-index: $PentHouse;
        bottom: 40px;
        left: 50%;
        transform: translate(-50%, 50px);
        transition: all 0.5s ease-out;
        
        max-width: calc(100vw - 50px);
        padding: 15px 20px 15px 70px;
        overflow: hidden;
    
        opacity: 0;

        border-radius: 5px;
        background: $white;
        @include shadow();

        text-align: center;

        &.isVisible {
            opacity: 1;
            transform: translate(-50%, 0);
        }

        .ErrorMessageIcon {
            position: absolute;
            left: 0;
            top: 0;

            width: 50px;
            height: 100%;

            background: $red;

            i {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);

                color: $white;
                font-size: $L;
            }
        }
    }
</style>
