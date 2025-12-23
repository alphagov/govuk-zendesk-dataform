const {currentEnv} = require('includes/constants')
console.log(`Compiling publishing_zendesk.js. Current Environment: ${currentEnv}`);

if (currentEnv === "production") {

  publish("publishing_zendesk_dataform", {
    type: "table",
    description: "This view is only created in production",
    database: "govuk-publishing",
    schema: "zendesk_api",
    tags: ["production_only"],
    dependencies: ['publishing_output']
  })
  .query(ctx => `
SELECT 
id,
created_at,
updated_at,
type,
subject,
description,
priority,
status,
assignee_id,
requester_id,
submitter_id,
recipient,
organization_id,
due_at,
tags,
group_id,
team_name,
organization_name
  FROM ${ctx.ref("publishing_output")}
  `);
}