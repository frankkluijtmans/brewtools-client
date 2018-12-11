import axios from 'axios';

export default class RecipeRepository {

    static get(id){

        return new Promise((resolve) => {

            axios.get('http://localhost:3000/recipe/get/' + id, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => { 

                resolve(response.data);
            }).catch(e => {

                console.warn('Recipe repository(get): ' + e);
            });
        })
    }

    static getAll(){

        return new Promise((resolve) => {

            axios.get('http://localhost:3000/recipe/get-all', {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => { 

                resolve(response.data);
            }).catch(e => {

                console.warn('Recipe repository(getCollection): ' + e);
            });
        })
    }
    
    static create(data){

        return new Promise((resolve) => {

            axios.post(
                'http://localhost:3000/recipe/create',
                data
            ).then(() => {
            
                resolve();
            }).catch(e => {

                console.warn('Recipe repository(create): ' + e);
            });
        });
    }

    static update(data){

        return new Promise((resolve) => {

            axios.post(
                'http://localhost:3000/recipe/update',
                data
            ).then(() => {
            
                resolve();
            }).catch(e => {

                console.warn('Recipe repository(update): ' + e);
            });
        });
    }

    static delete(id){

        return new Promise((resolve) => {

            axios.get(
                'http://localhost:3000/recipe/delete/' + id
            ).then(() => {
            
                resolve();
            }).catch(e => {

                console.warn('Recipe repository(delete): ' + e);
            });
        });
    }
}