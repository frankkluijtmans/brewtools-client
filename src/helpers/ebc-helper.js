export default class EBCHelper {

    static calculate(fermentables) {

        let totalVolume = 0;
        let totalEbc = 0;

        fermentables.forEach(fermentable => {

            if(fermentable.volume !== null) {
                
                totalVolume += parseInt(fermentable.volume);
            }
        });

        fermentables.forEach(fermentable => {

            if(fermentable.volume !== null && fermentable.color !== null) {

                let percentile = Math.round(parseInt(fermentable.volume) / (totalVolume / 100));
                totalEbc += percentile * parseInt(fermentable.color);
            }
        });

        return Math.round(totalEbc / 100);
    }

    static color(ebc) {
        
        let color;

        if (ebc > 0 && ebc < 4) {
            color = '#fde851';
        }
        else if(ebc >= 4 && ebc < 8) {
            color = '#fad936';
        }
        else if(ebc >= 8 && ebc < 12) {
            color = '#fabd0d';
        }
        else if(ebc >= 12 && ebc < 16) {
            color = '#fdac03';
        }
        else if(ebc >= 16 && ebc < 20) {
            color = '#f69604';
        }
        else if(ebc >= 20 && ebc < 24) {
            color = '#e58203';
        }
        else if(ebc >= 24 && ebc < 28) {
            color = '#d06805';
        }
        else if(ebc >= 28 && ebc < 32) {
            color = '#c45a04';
        }
        else if(ebc >= 32 && ebc < 36) {
            color = '#aa4301';
        }
        else if(ebc >= 36 && ebc < 40) {
            color = '#9c3701';
        }
        else if(ebc >= 40 && ebc < 44) {
            color = '#972e01';
        }
        else if(ebc >= 44 && ebc < 48) {
            color = '#8a2304';
        }
        else if(ebc >= 48 && ebc < 54) {
            color = '#7c1d01';
        }
        else if(ebc >= 54 && ebc < 61) {
            color = '#791807';
        }
        else if(ebc >= 61 && ebc < 63) {
            color = '#6d1104';
        }
        else if(ebc >= 63 && ebc < 67) {
            color = '#5d0a04';
        }
        else if(ebc >= 67 && ebc < 71) {
            color = '#590c04';
        }
        else if(ebc >= 71 && ebc < 75) {
            color = '#470d01';
        }
        else if(ebc >= 75 && ebc < 79) {
            color = '#430f01';
        }
        else if(ebc >= 79 && ebc < 82) {
            color = '#310a00';
        }
        else {
            color = '#2b0900';
        }

        return color;
    }
}