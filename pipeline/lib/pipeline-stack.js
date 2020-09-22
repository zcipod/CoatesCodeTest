const cdk = require('@aws-cdk/core');
const s3 = require('@aws-cdk/aws-s3')
const codecommit = require('@aws-cdk/aws-codecommit')
const codepipeline = require('@aws-cdk/aws-codepipeline')
const codepipeline_actions = require('@aws-cdk/aws-codepipeline-actions')
const codebuild = require('@aws-cdk/aws-codebuild')

class PipelineStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const artifactsBucket = new s3.Bucket(this, 'ArtifactsBucket')
  }
}

module.exports = { PipelineStack }
