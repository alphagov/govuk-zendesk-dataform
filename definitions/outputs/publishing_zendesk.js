const {currentEnv} = require('includes/constants')
console.log(`Compiling publishing_zendesk.js. Current Environment: ${currentEnv}`);


if (currentEnv === "production") {

  publish("publishing_zendesk_dataform", {
    type: "view",
    description: "This view is only created in production",
    database: "govuk-publishing",
    schema: "zendesk_api",
    tags: ["production_only"]
  })
  .query(ctx => `
      SELECT * FROM ${ctx.ref("zendesk_output")}
  `);
}