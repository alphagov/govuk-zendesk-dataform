const {currentEnv} = require('includes/constants')
console.log(`Compiling publishing_zendesk.js. Current Environment: ${currentEnv}`);

if (currentEnv === "production") {

  publish("zendesk_dataform_2nd_and_3rd_line_view", {
    type: "table",
    description: "This view is only created in production",
    database: "gds-bq-reporting",
    schema: "zendesk_processing_publishing_exploration",
    tags: ["production_only"],
    dependencies: ['conquad_output']
  })
  .query(ctx => `
SELECT 
rainbow_cte.id,
rainbow_cte.created_at,
rainbow_cte.updated_at,
rainbow_cte.type,
rainbow_cte.subject,
rainbow_cte.description,
rainbow_cte.priority,
rainbow_cte.status,
rainbow_cte.assignee_id,
rainbow_cte.requester_id,
rainbow_cte.submitter_id,
rainbow_cte.recipient,
rainbow_cte.organization_id,
rainbow_cte.due_at,
rainbow_cte.tags,
rainbow_cte.rainbow_team,
lookup_names.group_name AS group_id,
lookup_names.team_name,
  FROM ${ctx.ref("conquad_output")}
  `);
}