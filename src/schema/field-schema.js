const FieldSchema = {
    fermentableSchema: {
        name: 'Fermentables',
        singular_label: 'a fermentable',
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
        singular_label: 'a hop',
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
                type: 'float',
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
                name: 'usage',
                header: 'Usage',
                placeholder: '',
                type: 'number',
                unit_label: ['minutes/boil', 'days/dryhop']
            }
        ]
    },
    mashSchema: {
        name: 'Mashing steps',
        singular_label: 'a step',
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
        singular_label: 'an ingredient',
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
            },
            {
                name: 'usage',
                header: 'Usage',
                placeholder: '',
                type: 'number',
                unit_label: ['minutes/boil', 'days/dryhop']
            }
        ]
    }
};

export default FieldSchema;