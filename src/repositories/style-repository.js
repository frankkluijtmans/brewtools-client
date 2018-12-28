import StyleCollection from './collections/style-collection';
import SortingHelper from '../helpers/sorting-helper';

export default class StyleRepository {

    static getAll() {

        return StyleCollection.sort(SortingHelper.name);
    }
}