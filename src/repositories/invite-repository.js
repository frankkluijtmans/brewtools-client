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

    static create(id, data){

        return new Promise((resolve, reject) => {

            axios.post(
                process.env.VUE_APP_API_BASE_URL + '/invite/create/' + id,
                data
            ).then(() => {
            
                resolve();
            }).catch(e => {

                reject('Invite repository(create): ' + e);
            });
        });
    }

    static delete(id, data){

        return new Promise((resolve, reject) => {

            axios.post(
                process.env.VUE_APP_API_BASE_URL + '/invite/delete/' + id,
                data
            ).then(() => {
            
                resolve();
            }).catch(e => {

                reject('Invite repository(delete): ' + e);
            });
        });
    }

    static accept(id){

        return new Promise((resolve, reject) => {

            axios.get(
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

            axios.get(
                process.env.VUE_APP_API_BASE_URL + '/invite/decline/' + id
            ).then(() => {
            
                resolve();
            }).catch(e => {

                reject('Invite repository(decline): ' + e);
            });
        });
    }
}