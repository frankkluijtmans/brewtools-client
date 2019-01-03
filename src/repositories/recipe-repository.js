import axios from 'axios';
import SortingHelper from '../helpers/sorting-helper';

export default class RecipeRepository {

    static get(id){

        return new Promise((resolve, reject) => {

            axios.get(
                process.env.VUE_APP_API_BASE_URL + '/recipe/get/' + id, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => { 

                resolve(response.data);
            }).catch(e => {

                reject('Recipe repository(get): ' + e);
            });
        })
    }

    static getAll(){

        return new Promise((resolve, reject) => {

            axios.get(
                process.env.VUE_APP_API_BASE_URL + '/recipe/get-all', {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => { 

                resolve(response.data.sort(SortingHelper.created));
            }).catch(e => {

                reject('Recipe repository(getAll): ' + e);
            });
        })
    }
    
    static create(data){

        return new Promise((resolve, reject) => {

            axios.post(
                process.env.VUE_APP_API_BASE_URL + '/recipe/create',
                data
            ).then(() => {
            
                resolve();
            }).catch(e => {

                reject('Recipe repository(create): ' + e);
            });
        });
    }

    static update(data, id){

        return new Promise((resolve, reject) => {

            axios.post(
                process.env.VUE_APP_API_BASE_URL + '/recipe/update/' + id,
                data
            ).then(() => {
            
                resolve();
            }).catch(e => {

                reject('Recipe repository(update): ' + e);
            });
        });
    }

    static delete(id){

        return new Promise((resolve, reject) => {

            axios.post(
                process.env.VUE_APP_API_BASE_URL + '/recipe/delete/' + id
            ).then(() => {

                resolve();
            }).catch(e => {

                reject('Recipe repository(delete): ' + e);
            });
        });
    }
}