const {currentEnv} = require('includes/constants')
console.log(`Compiling publishing_zendesk.js. Current Environment: ${currentEnv}`);

if (currentEnv === "production") {

  publish("zendesk_dataform_2nd_and_3rd_line_view", {
    type: "table",
    description: "This table is only created in production",
    database: "gds-bq-reporting",
    schema: "zendesk_processing_publishing_exploration",
    tags: ["production_only"],
    dependencies: ['conquad_output']
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
rainbow_team,
group_id,
team_name
  FROM ${ctx.ref("conquad_output")}
  `);
}