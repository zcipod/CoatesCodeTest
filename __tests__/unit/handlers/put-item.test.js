const lambda = require('../../../src/handlers/put-item.js');
const dynamodb = require('aws-sdk/clients/dynamodb');
 

describe('Test putItemHandler', function () {
    let putSpy; 

    beforeAll(() => {
        putSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'put'); 
    }); 

    afterAll(() => { 
        putSpy.mockRestore(); 
    }); 

    it('should add id to the table', async () => { 
        const returnedItem = { name: 'name1', email: 'name1@email.com', age: '10', dateOfBirth: '16/09/2010' };

        putSpy.mockReturnValue({ 
            promise: () => Promise.resolve(returnedItem) 
        }); 
 
        const event = { 
            httpMethod: 'PUT',
            body: '{"name": "name1","email": "name1@email.com", "age": "10", "dateOfBirth": "16/09/2010"}'
        }; 

        const result = await lambda.putItemHandler(event); 
        const expectedResult = { 
            statusCode: 200, 
            body: JSON.stringify(returnedItem) 
        }; 
 
        // Compare the result with the expected result 
        expect(result).toEqual(expectedResult); 
    }); 
}); 
 