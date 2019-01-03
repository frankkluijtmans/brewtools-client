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
                        <a
                            @click="acceptInvite(invite._id)"
                            class="ActionButton Blue"
                        >
                            <i class="fa fa-check" /> Accept
                        </a>
                        <a
                            @click="declineInvite(invite._id)"
                            class="ActionButton Red"
                        >
                            <i class="fa fa-close" /> Decline
                        </a>
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
				
				this.invites = response;
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

        acceptInvite(id) {

            InviteRepository.accept(id)
                .then(() => {
                    
                    for (let i = this.invites.length - 1; i >= 0; --i) {

                        if (this.invites[i]._id == id) {
                            
                            this.invites.splice(i,1);
                        }
					}
                })
        },
        declineInvite(id) {

            InviteRepository.decline(id)
                .then(() => {
                    
                    for (let i = this.invites.length - 1; i >= 0; --i) {

                        if (this.invites[i]._id == id) {
                            
                            this.invites.splice(i,1);
                        }
					}
                })
        }
    }
}
</script>