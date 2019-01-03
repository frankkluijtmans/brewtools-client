import axios from 'axios';

export default class InviteRepository {

    static getAll(){

        return new Promise((resolve, reject) => {

            axios.get(
                process.env.VUE_APP_API_BASE_URL + '/invite/get-all', {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => { 

                resolve(response.data);
            }).catch(e => {

                reject('Invite repository(getAll): ' + e);
            });
        })
    }

    static accept(id){

        return new Promise((resolve, reject) => {

            axios.post(
                process.env.VUE_APP_API_BASE_URL + '/invite/accept/' + id
            ).then(() => {
            
                resolve();
            }).catch(e => {

                reject('Invite repository(accept): ' + e);
            });
        });
    }

    static decline(id){

        return new Promise((resolve, reject) => {

            axios.post(
                process.env.VUE_APP_API_BASE_URL + '/invite/decline/' + id
            ).then(() => {
            
                resolve();
            }).catch(e => {

                reject('Invite repository(decline): ' + e);
            });
        });
    }
}