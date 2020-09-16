const tableName = process.env.SAMPLE_TABLE;

const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

/**
 * A simple example includes a HTTP get method to get one item by id from a DynamoDB table.
 */
exports.getByNameHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);
 
  // Get id from pathParameters from APIGateway because of `/{name}` at template.yml
  const name = event.pathParameters.name;

  let params = {
    TableName : tableName,
    Key: { name: name },
  };
  const data = await docClient.get(params).promise();
  const item = data.Item;
 
  const response = {
    statusCode: 200,
    body: JSON.stringify(item)
  };
 
  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
}
