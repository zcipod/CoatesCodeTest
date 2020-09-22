const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

const tableName = process.env.SAMPLE_TABLE;


exports.createItemHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`create function only accept POST method, you tried: ${event.httpMethod}`);
    }
    console.info('received:', event);

    const body = JSON.parse(event.body)
    const name = body.name;
    const email = body.email;
    const age = body.age;
    const dateOfBirth = body.dateOfBirth;

    let params = {
        TableName : tableName,
        Key: { name: name },
    };

    const data = await docClient.get(params).promise();
    const item = data.Item;
    let response;
    console.info(`item: ${item}`);

    if (item !== undefined){
        response = {
            statusCode: 422,
            body: JSON.stringify({
                message:`The name: ${name} is already exist!`
            })
        };
    }else {
        let params = {
            TableName : tableName,
            Item: { name : name, email: email, age: age, dateOfBirth: dateOfBirth }
        };

        await docClient.put(params).promise();
        response = {
            statusCode: 201,
            body: JSON.stringify({
                message:`Successfully Created user: ${name}!`
            })
        };
    }

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}

