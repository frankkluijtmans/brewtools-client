export default class IBUHelper {

    static calculate(og, hops, base_volume) {

        let totalIbu = 0;
        og = og !== null ? parseInt(og) : null;
        base_volume = base_volume !== null ? parseFloat(base_volume) : null;

        hops.forEach(hop => {

            if(hop.bitterness !== null 
                && hop.volume !== null 
                && hop.boiling_time !== null
                && base_volume !== null
                && og !== null) {
                
                hop.bitterness = parseFloat(hop.bitterness);
                hop.boiling_time = parseInt(hop.boiling_time);
                hop.volume = parseInt(hop.volume)

                totalIbu += this.alphaAcidUtilization(hop, og) * this.addedAlphaAcids(hop, base_volume);
            }
        });

        return Math.round(totalIbu);
    }

    static addedAlphaAcids(hop, base_volume) {

        return ( ( hop.bitterness / 100 ) * hop.volume * 1000) / base_volume;
    }

    static alphaAcidUtilization(hop, og) {

        return this.bignessFactor(og) * this.boilTimeFactor(hop.boiling_time);
    }
    
    static boilTimeFactor(boiling_time) {

        return ( 1 - Math.E ** ( -0.04 * boiling_time ) ) / 4.15;
    }

    static bignessFactor(og) {
        
        return 1.65 * 0.000125 ** ( (og / 1000) - 1);
    }
}