<template>
    <div class="TableContainer Blue">
        <header>
            <i class="fa fa-user-plus"></i>
            Pending invites
        </header>
        <EmptyTable v-if="invites.length === 0">
            If another user invites you to collaborate on their recipes invites will show up here.
        </EmptyTable>
        <table v-else>
            <tbody>
                <tr class="TableRow TableHeader">
                    <td>
                        Invite
                    </td>
                    <td>
                        Actions
                    </td>
                </tr>
                <tr
                    v-for="(invite, index) in invites"
                    :key="index"
                    class="TableRow"
                >
                    <td>
                        <strong>{{ invite.owner.fullname }}</strong>
                        invited you to collaborate on his/her recipe
                        <strong>{{ invite.name }}</strong>
                    </td>
                    <td class="Buttons">
                        <div 
                            v-if="invite.action === null"
                        >
                            <a
                                @click="acceptInvite(invite)"
                                class="ActionButton Blue"
                            >
                                <i class="fa fa-check" /> Accept
                            </a>
                            <a
                                @click="declineInvite(invite)"
                                class="ActionButton Red"
                            >
                                <i class="fa fa-close" /> Decline
                            </a>
                        </div>
                        <span 
                            v-else
                            :class="invite.action"
                            class="ActionLabel"
                        > 
                            <template 
                                v-if="invite.action === 'Accepted'"
                            >
                                <i class="fa fa-check" /> 
                            </template>
                            <template 
                                v-if="invite.action === 'Declined'"
                            >
                                <i class="fa fa-close" /> 
                            </template>
                            {{ invite.action }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import InviteRepository from '../../repositories/invite-repository';
import EmptyTable from '../UI/EmptyTable';

export default {
	name: 'Invites',
	components: {
		EmptyTable
	},
	data() {
		return {
			invites: []
		}
	},
	mounted() {

		InviteRepository.getAll()
			.then(response => {
				
                this.invites = response.map(invite => {
                    
                    invite.action = null;
                    return invite;
                });
			}).catch(() => {

				document.dispatchEvent(
					new CustomEvent('error_message', {
						detail: {
							type: "DATA_RETRIEVAL_ERROR"
						}
					})
				)
			})
    },
    methods: {

        acceptInvite(invite) {

            InviteRepository.accept(invite._id)
                .then(() => {
                    
                    invite.action = 'Accepted';
                })
        },
        declineInvite(invite) {

            InviteRepository.decline(invite._id)
                .then(() => {
                    
                    invite.action = 'Declined';
                })
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../styles/_variables';
    @import '../../styles/_mixins';

    .ActionLabel {
        display: inline-block;
        padding: 5px 8px;

        border: none;
        border-radius: 5px;
        
        background: $semidark-color;

        color: $white;
        text-decoration: none;
        font-size: $SN;

        &.Accepted {
            background: $green;
        }

        &.Declined {
            background: $red;
        }
    }
</style>