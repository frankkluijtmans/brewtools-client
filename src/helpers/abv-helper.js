export default class ABVHelper {

    static calculate(og, fg) {

        const abv = (og - fg) * 0.131 + 0.5;
        return abv.toFixed(2);
    }
}