export function modelSchemaValidator(schemaValidations: Array<any | never>): Array<any> {
    const schemaValidationResults: Array<any | never> = [];
    schemaValidations.forEach(e => {
        if (e.error) schemaValidationResults.push(e.error)
    });
    return schemaValidationResults;
}