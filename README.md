## Coates Engineering Team Coding Task

This is a solution of a simple RESTful backend API with NodeJS based on AWS serverless Framework including Lambda, DynamoDB, API Gateway and Cloud Watch.

#### Example of deployment

Here is a [practise of this project](https://q43x4l8ige.execute-api.ap-southeast-2.amazonaws.com/Prod/), deployed on aws.

#### API

For more details, please see ['postman doc'](./doc/CoatesTestAPI.json).

path: "/"

| method | description|
| ----|----|
| get | get all the users in the database|
| post | create a new user with the information in the body of the query|

path: "/{name}"

| method | description|
| ----|----|
| get | get the information of the user with the name of "name"|
| put | update the user with the name of "name". If the user is not exist, a new user will be create|
| delete | delete the user with the name of "name". if the user with the name is not exist, it will raise an error|

#### Deployment

This project is based on SAM.

To deploy by the following steps:

1. make sure you have correctly installed the SAM-cli tools and the aws credential.
2. execute ```sam build``` to build the project.
3. execute ```sam deploy --guided``` to start deployment.
4. follow the guide, complete the review with all "yes" to response the questions.

#### ToDo

1. CI/CD using CodePipeline
2. enable the CORS
3. authentication
4. character validation