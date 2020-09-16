const lambda = require('../../../src/handlers/get-by-name.js');
const dynamodb = require('aws-sdk/clients/dynamodb'); 


describe('Test getByNameHandler', () => {
    let getSpy; 

    beforeAll(() => {
        getSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'get'); 
    }); 
 
    // Clean up mocks 
    afterAll(() => { 
        getSpy.mockRestore(); 
    }); 

    it('should get item by name', async () => {
        const item = { name: 'name1' };

        getSpy.mockReturnValue({ 
            promise: () => Promise.resolve({ Item: item }) 
        }); 
 
        const event = { 
            httpMethod: 'GET', 
            pathParameters: { 
                name: 'name1'
            } 
        } 

        const result = await lambda.getByNameHandler(event);
 
        const expectedResult = { 
            statusCode: 200, 
            body: JSON.stringify(item) 
        }; 

        expect(result).toEqual(expectedResult); 
    }); 
}); 
 