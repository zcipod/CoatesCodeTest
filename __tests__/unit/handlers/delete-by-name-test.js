const lambda = require('../../../src/handlers/delete-by-name.js');
const dynamodb = require('aws-sdk/clients/dynamodb');


describe('Test deleteByNameHandler', () => {
    let deleteSpy;
    let getExistSpy;

    beforeAll(() => {
        deleteSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'delete');
        getExistSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'get');
    });

    afterAll(() => {
        deleteSpy.mockRestore();
        getExistSpy.mockRestore();
    });

    it('should get item by name', async () => {
        const response = {message:"Successfully Removed name1!"};

        deleteSpy.mockReturnValue({
            promise: () => Promise.resolve(response)
        });
        getExistSpy.mockReturnValue({
            promise: () => Promise.resolve({ Item: {name: 'name1'} })
        });


        const event = {
            httpMethod: 'DELETE',
            pathParameters: {
                name: 'name1'
            }
        }

        const result = await lambda.deleteByNameHandler(event);

        const expectedResult = {
            statusCode: 202,
            body: JSON.stringify(response)
        };

        expect(result).toEqual(expectedResult);
    });
});