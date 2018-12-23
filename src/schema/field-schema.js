const FieldSchema = {
    fermentableSchema: {
        name: 'Fermentables',
        singular_label: 'grain',
        fields: [
            {
                name: 'name',
                header: 'Name',
                placeholder: 'Name',
                type: 'text'
            },
            {
                name: 'color',
                header: 'Color',
                placeholder: '',
                type: 'number',
                unit_label: 'EBC'
            },
            {
                name: 'volume',
                header: 'Volume',
                placeholder: '',
                type: 'number',
                unit_label: 'grams'
            }
        ]
    },
    hopSchema: {
        name: 'Hops',
        singular_label: 'hop',
        fields: [
            {
                name: 'name',
                header: 'Name',
                placeholder: 'Name',
                type: 'text'
            },
            {
                name: 'bitterness',
                header: 'Bitterness',
                placeholder: '',
                type: 'number',
                unit_label: '%'
            },
            {
                name: 'volume',
                header: 'Volume',
                placeholder: '',
                type: 'number',
                unit_label: 'grams'
            },
            {
                name: 'boiling_time',
                header: 'Time to boil',
                placeholder: '',
                type: 'number',
                unit_label: 'minutes'
            }
        ]
    },
    mashSchema: {
        name: 'Mashing steps',
        singular_label: 'step',
        fields: [
            {
                name: 'temperature',
                header: 'Temperature',
                placeholder: '',
                type: 'number',
                unit_label: '°C'
            },
            {
                name: 'duration',
                header: 'Duration',
                placeholder: '',
                type: 'number',
                unit_label: 'minutes'
            }
        ]
    },
    otherSchema: {
        name: 'Other ingredients',
        singular_label: 'ingredient',
        fields: [
            {
                name: 'name',
                header: 'Name',
                placeholder: 'Name',
                type: 'text'
            },
            {
                name: 'volume',
                header: 'Volume',
                placeholder: '',
                type: 'number',
                unit_label: 'grams'
            }
        ]
    }
};

export default FieldSchema;