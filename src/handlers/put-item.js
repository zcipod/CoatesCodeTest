const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

const tableName = process.env.SAMPLE_TABLE;


exports.putItemHandler = async (event) => {
    if (event.httpMethod !== 'PUT') {
        throw new Error(`This function only accepts PUT method, you tried: ${event.httpMethod} method.`);
    }
    console.info('received:', event);

    const body = JSON.parse(event.body)
    const name = body.name;
    const email = body.email;
    const age = body.age;
    const dateOfBirth = body.dateOfBirth;

    let params = {
        TableName : tableName,
        Item: { name : name, email: email, age: age, dateOfBirth:  dateOfBirth }
    };

    const result = await docClient.put(params).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify(body)
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
