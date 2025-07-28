const cron = require('node-cron');
module.exports = function (app) {
  const Story = app.models.Story;
  // Cron runs every minute
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();

      const result = await Story.updateMany(
        {
          isNewStory: true,
          timeForNew: { $lte: now }
        },
        { $set: { isNewStory: false } }
      );

      // console.log(`Updated ${result.modifiedCount || result.nModified} documents`);
    } catch (err) {
      console.error('Error running cron job:', err);
    }
  });
};
