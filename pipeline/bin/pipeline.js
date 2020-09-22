#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { PipelineStack } = require('../lib/pipeline-stack');

const app = new cdk.App();
new PipelineStack(app, 'coatesTestCICD');
