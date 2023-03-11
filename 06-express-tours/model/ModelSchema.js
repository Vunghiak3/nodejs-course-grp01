class ModelSchema {
    constructor(schema, schemaName, defaulSort){
        this.schema = schema;
        this.schemaName = schemaName;
        this.defaulSort = defaulSort;
    }

    validateData(data){
        for (let fieldName in this.schema){
            let val = data[fieldName];

            let field = this.schema[fieldName];

            let {isValid, err} = field.validate(val);
            if (!isValid){
                throw new Error('Invalid data at field: ' + fieldName + '. ' + err);
            }


            if (val === undefined || val === null){
                data[fieldName] = field.default;
            }
        }

        return data;
    }
}

module.exports = ModelSchema;