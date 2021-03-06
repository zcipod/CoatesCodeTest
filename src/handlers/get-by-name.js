const tableName = process.env.SAMPLE_TABLE;

const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();


exports.getByNameHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`get function only accept GET method, you tried: ${event.httpMethod}`);
  }
  console.info('received:', event);

  const name = event.pathParameters.name;

  let params = {
    TableName : tableName,
    Key: { name: name },
  };
  const data = await docClient.get(params).promise();
  const item = data.Item;
 
  let response;
  if (item === undefined){
    response = {
      statusCode: 404,
      body: JSON.stringify({
        message: `The name: ${name} is not found!`
      })
    };
  } else {
    response = {
      statusCode: 200,
      body: JSON.stringify(item)
    };
  }

  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
}
