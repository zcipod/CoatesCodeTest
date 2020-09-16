const lambda = require('../../../src/handlers/create-item.js');
const dynamodb = require('aws-sdk/clients/dynamodb');


describe('Test createItemHandler', function () {
    let putSpy;
    let getNotExistSpy;

    beforeAll(() => {
        putSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'put');
        getNotExistSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'get');
    });

    afterAll(() => {
        putSpy.mockRestore();
        getNotExistSpy.mockRestore();
    });

    it('should add id to the table', async () => {
        const returnedItem = {message:"Successfully Created user: name10!"};

        putSpy.mockReturnValue({
            promise: () => Promise.resolve(returnedItem)
        });
        getNotExistSpy.mockReturnValue({
            promise: () => Promise.resolve({"item": undefined})
        });

        const event = {
            httpMethod: 'POST',
            body: '{"name": "name10","email": "name10@email.com", "age": "10", "dateOfBirth": "16/09/2010"}'
        };

        let result = await lambda.createItemHandler(event);
        let expectedResult = {
            statusCode: 201,
            body: JSON.stringify({message:`Successfully Created user: name10!`})
        };
        expect(result).toEqual(expectedResult);
    });
});