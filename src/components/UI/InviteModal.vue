<template>
    <div
        v-if="show"
        class="BackDrop"
    >
        <div 
            class="Modal"
        >
            <h2 class="ModalTitle">Collaborators</h2>
            <p class="ModalText">
                Need other users to be able to edit your recipe? Add them as collaborators
                to enable them to make alterations to this recipe. Collaborators will not
                be able change collaborator settings or delete this recipe.
            </p>
            <form 
                @submit.prevent="inviteUser"
                novalidate
            >
                <table
                    class="UserTable"
                >
                    <tbody>
                        <tr
                            v-for="user in users"
                            :key="user.email"
                        >
                            <template v-if="user.status === 'confirmed'">
                                <td>
                                    <div class="UserIcon">
                                        {{ getInitials(user.fullname) }}
                                    </div>
                                    {{ user.fullname }}
                                </td>
                                <td class="Actions">
                                    <a
                                        @click="deleteUser(user.email)"
                                        class="ActionButton Red"
                                    >
                                        <i class="fa fa-user-times" /> Remove
                                    </a>
                                </td>
                            </template>
                            <template v-else>
                                <td>
                                    {{ user.email }} <i>(pending)</i>
                                </td>
                                <td class="Actions">
                                    <a
                                        @click="deleteUser(user.email)"
                                        class="ActionButton Red"
                                    >
                                        <i class="fa fa-user-times" /> Cancel
                                    </a>
                                </td>
                            </template>
                        </tr>
                        <tr class="InviteRow">
                            <td>
                                <input
                                    v-model="form.email"
                                    @change="validate"
                                    :class="{ Error: form.error }"
                                    type="email" 
                                    placeholder="E-mail address" 
                                    class="InviteInput"
                                />
                                <span
                                    v-if="form.message !== null && form.error"
                                    class="ErrorMessage"
                                >
                                    {{ this.form.message }}
                                </span>
                            </td>
                            <td class="Actions">
                                <button
                                    type="submit"
                                    class="ActionButton Blue"
                                >
                                    <i class="fa fa-user-plus" /> Invite
                                </button>
                            </td>
                    </tr>
                    </tbody>
                </table>
            </form>
            <button 
                @click="closeModal()"
                class="Button"
            >Close</button>
        </div>
    </div>
</template>

<script>
import InviteRepository from '../../repositories/invite-repository';

export default {
    name: 'InviteModal',
    props: {
        users: Array,
        recipe_id: String
    },
    data() {
        return {
            show: false,
            form: {
                email: null,
                valid: false,
                error: false,
                message: null
            }
        }
    },
    mounted() {
        
        this.users.sort((a,b) => {

            if(a.status === "confirmed" && b.status === "pending") {

                return -1;
            }

            if(a.status === "pending" && b.status === "confirmed") {
                
                return 1;
            }

            return 0;
        });
    },
    methods: {
        showModal() {

            this.show = true;
        },
        closeModal() {

            this.show = false;
        },
        inviteUser() {

            this.validate();

            if(this.form.valid) {
                
                InviteRepository.create(this.recipe_id, {
                    email: this.form.email
                })
                    .then(() => {
                        
                        this.users.push({
                            email: this.form.email,
                            fullname: null,
                            status: 'pending'
                        });

                        this.form.email = '';
                    }).catch(() => {

                        this.fireOperationForbiddenError();
                    })
            }
        },
        deleteUser(email) {
            
            InviteRepository.delete(this.recipe_id, {
                    email
                })
                    .then(() => {
                        
                        for (let i = this.users.length - 1; i >= 0; --i) {

							if (this.users[i].email == email) {
								
								this.users.splice(i,1);
							}
						}
                    }).catch(() => {

                        this.fireOperationForbiddenError();
                    })
        },
        getInitials(fullname) {

            let initials = '';
            const nameArray = fullname.split(' ');

            nameArray.forEach(word => {

                initials += word.charAt(0);
            });

            return initials.toUpperCase();
        },
        validate() {

            if(!this.validEmail(this.form.email)) {

                this.validationError('Please fill out a valid e-mail address');
                return;
            }

            if(this.isOwner(this.form.email)) {

                this.validationError('You can\'t invite yourself as a collaborator');
                return;
            }

            if(this.isCollaborator(this.form.email)) {

                this.validationError('This user was already invited');
                return;
            }

            this.form.error = false;
            this.form.message = null;
            this.form.valid = true;
        },
        validEmail(email) {

            const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            return regex.test(email);
        },
        isOwner(email) {

            if(email === this.$keycloak.userName) {
                
                return true;
            }

            return false;
        },
        isCollaborator(email) {

            let isCollaborator = false;

            this.users.forEach(user => {

                if(user.email === email) {

                    isCollaborator = true;
                }
            })

            return isCollaborator;
        },
        validationError(message) {
            
            this.form.error = true;
            this.form.message = message;
            this.form.valid = false;
        },
        fireOperationForbiddenError() {

            document.dispatchEvent(
                new CustomEvent('error_message', {
                    detail: {
                        type: "OPERATION_FORBIDDEN_ERROR"
                    }
                })
            );
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../styles/_modal';
    @import '../../styles/_variables';
    @import '../../styles/_mixins';

    .BackDrop {

        .Modal {
            width: 500px;
        }
    }

    .UserTable {
        width: 100%;
        margin-bottom: 25px;

        text-align: left;

        .InviteRow {

            td {
                padding: 15px 0 0 0;
            }
        }

        td {
            padding: 5px 0;

            font-size: $SN;

            &.Actions {
                width: 120px;
                text-align: right;
            }

            .UserIcon {
                display: inline-block;
                width: 36px;
                height: 36px;
                margin: 0 5px 0 0;
                line-height: 30px;
                
                border-radius: 50%;
                border: 3px solid $white;

                background: $green;
                @include shadow();
                
                font-size: $S;
                font-weight: bold;
                color: $white;
                text-align: center;
            }

            .InviteInput {
                width: 100%;
                height: 30px;

                border: none;
                border-bottom: 2px solid $light-color;

                font-size: $SN;

                &.Error {
                    border-color: $red;
                }
            }

            .ErrorMessage {
                display: block;
                margin-top: 5px;

                font-size: $S;
                color: $red;
            }
        }
    }
</style>
