const tableName = process.env.SAMPLE_TABLE;

const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();


exports.deleteByNameHandler = async (event) => {
    if (event.httpMethod !== 'DELETE') {
        throw new Error(`delete function only accept DELETE method, you tried: ${event.httpMethod}`);
    }
    console.info('received:', event);

    const name = event.pathParameters.name;

    let params = {
        TableName : tableName,
        Key: { name: name },
    };

    const data = await docClient.get(params).promise();
    const item = data.Item;
    let response

    if (item == {}){
        response = {
            statusCode: 422,
            body: JSON.stringify({
                message:'The user is not exist!'
            })
        };

    }else {
        await docClient.delete(params).promise();
        response = {
            statusCode: 202,
            body: JSON.stringify({
                message:`Successfully Removed ${name}!`
            })
        };
    }

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
