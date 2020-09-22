const { expect, matchTemplate, MatchStyle } = require('@aws-cdk/assert');
const cdk = require('@aws-cdk/core');
const Pipeline = require('../lib/pipeline-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Pipeline.PipelineStack(app, 'MyTestStack');
    // THEN
    expect(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
