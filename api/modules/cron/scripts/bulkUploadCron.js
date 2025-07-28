'use strict';

const cron = require('node-cron');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const updateCity = (data, city) => {
  const obj = data.reduce((acc, item) => {
    if (item.cityRef) {
      acc[item.cityRef] = (acc[item.cityRef] || 0) + 1;
    }
    return acc;
  }, {});
  Object.keys(obj).forEach((item) => {
    if (item) {
      city.updateStoryCount(item, obj[item]);
    }
  });
};

const bulkUpload = async (app) => {
  // console.log('bulk upload cron job started');
  const Story = app.models.Story;
  const FileUpload = app.models.FileUpload;
  const Language = app.models.Language;
  const city = app.module.city;
  const uploadDir = path.join(__dirname, 'public', 'uploads');
  // const uploadDir = path.join(__dirname, '../../../../public/uploads');
  // console.log('uploads directory', uploadDir);
  if (fs.existsSync(uploadDir)) {
    const files = fs.readdirSync(uploadDir);

    if (files && files.length) {
      // console.log('files found in uploads directory', files);
      const excelFiles = files.filter((file) => file.endsWith('.xlsx') || file.endsWith('.xls'));
      // console.log('excel files found in uploads directory', excelFiles);
      if (excelFiles && excelFiles.length) {
        for (const file of excelFiles) {
          // console.log('file found in uploads directory', file);
          const filePath = path.join(uploadDir, file);
          // console.log('file path', filePath);
          if (filePath) {
            // updating the status of the file to completed
            FileUpload.findOne({
              uploadedFileName: file,
            }).then((uploadedFile) => {
              if (uploadedFile) {
                // console.log('file found in database', uploadedFile);
                uploadedFile.status = app.config.fileUpload.status.completed;
                uploadedFile.save();
              }
            });

            Language.findOne({
              code: 'en',
            }).then(async (language) => {
              if (language) {
                try {
                  const workbook = xlsx.readFile(filePath);

                  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                  const rows = xlsx.utils.sheet_to_json(worksheet);
                  // console.log('rows found in excel file', rows);
                  const data = rows.map((row) => ({
                    cityRef: row.cityRef,
                    uniqueId: row.uniqueId,
                    images: row.images?.split(',').map((img) => img.trim()),

                    fullAddress: {
                      address: row['fullAddress.address'],
                      location: {
                        type: 'Point',
                        coordinates: [row['longitude'], row['latitude']],
                      },
                    },

                    languageDetails: [
                      {
                        languageRef: language._id.toString(),
                        name: row['nameForEnglish'],
                        description: row['descriptionForEnglish'] || '',
                        fullDescription: row['fullDescriptionForEnglish'] || '',
                        audioSegment: row['audioSegmentForEnglish'] || '',
                        videoSegment: row['videoSegmentForEnglish'] || '',
                      },
                    ],

                    otherDetails: {
                      openingHours: row['otherDetails.openingHours'] || '',
                      additionalInfo: row['otherDetails.additionalInfo'] || '',
                      ticketPrice: row['otherDetails.ticketPrice'] || '',
                    },

                    storySource: {
                      source: row['storySource.source'] || '',
                      photos: row['storySource.photos'] || '',
                    },

                    isNewStory: row.isNewStory === 'true',
                    timeForNew: row.timeForNew ? new Date(row.timeForNew) : new Date(),

                    categoryRefs: row.categoryRefs?.split(',').map((id) => id.trim()),

                    businessInfo: {
                      logo: row['businessInfo.logo'] || '',
                      website: row['businessInfo.website'] || '',
                      couponsDiscounts: row['businessInfo.couponsDiscounts'] || '',
                      ticketSales: row['businessInfo.ticketSales'] || '',
                      operatingHours: row['businessInfo.operatingHours'] || '',
                    },

                    savedByRefs: row.savedByRefs?.split(',').map((id) => id.trim()),

                    status: parseInt(row.status),
                    createdByBusinessUserRef: row.createdByBusinessUserRef,
                    hideFromApp: row.hideFromApp === 'true',
                  }));
                  // console.log('data found in excel file', data);
                  const insertedDocs = await Story.insertMany(data, { ordered: false });
                  // remove the file after uploading
                  if (filePath) {
                    fs.unlinkSync(filePath);
                  }
                  // // increase story count in city reference
                  updateCity(insertedDocs, city);
                  // console.log('Bulk upload completed successfully! ');
                } catch (err) {
                  // console.log('Error in bulk upload ', JSON.stringify(err));
                  if (err.insertedDocs) {
                    // remove the file after uploading
                    if (filePath) {
                      fs.unlinkSync(filePath);
                    }
                    if (err.insertedDocs.length) {
                      updateCity(err.insertedDocs, city);
                    }
                  }
                }
              }
            });
          }
        }
      }
    }
  } else {
    console.warn(`Upload directory not found: ${uploadDir}`);
  }
};

module.exports = function (app) {
  // cron will run every 1 hour, for testing make 0 as * for minute
  cron.schedule('*/1 * * * *', () => {
    console.log('cron will run every 1 minutes');
    bulkUpload(app);
  });
};
