import ABVHelper from './abv-helper';

export default class SortingHelper {

    static abv(a, b) {

        const abvA = parseFloat(ABVHelper.calculate(a.og, a.fg));
        const abvB = parseFloat(ABVHelper.calculate(b.og, b.fg));

        if(abvA < abvB) {

            return -1;
        }

        if(abvA > abvB) {

            return 1;
        }
        
        return 0;
    }

    static lastEdited(a, b) {

        if(a.last_edited.date < b.last_edited.date) {

            return -1;
        }

        if(a.last_edited.date > b.last_edited.date) {

            return 1;
        }
        
        return 0;
    }

    static name(a, b) {

        if(a.name < b.name) {

            return -1;
        }

        if(a.name > b.name) {

            return 1;
        }
        
        return 0;
    }

    static style(a, b) {

        if(a.style < b.style) {

            return -1;
        }

        if(a.style > b.style) {

            return 1;
        }
        
        return 0;
    }

    static created(a, b) {

        if(a.created < b.created) {

            return -1;
        }

        if(a.created > b.created) {

            return 1;
        }
        
        return 0;
    }
}