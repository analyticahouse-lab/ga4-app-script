# Google Analytics AppScript

This Google AppScript is designed to retrieve daily granular data from Google Analytics, including ad costs, and store it in a Google Sheet. It utilizes the Google Analytics Data API to run a report and fetch the desired data.

## Prerequisites

Before running this script, make sure you have the following:

- Access to a Google Analytics account with the desired property ID.
- Access to a Google Sheet where the data will be stored.
- The Google Analytics Data API enabled in the Google Cloud Console for your project.

## Installation

1. Open the Google Sheet where you want to store the data.
2. Click on "Extensions" in the top menu and select "Apps Script."
3. Replace the existing code in the script editor with the provided AppScript code.
4. Update the `propertyId` variable with your Google Analytics property ID.
5. Save the script by clicking on the floppy disk icon or pressing `Ctrl + S`.
6. Close the script editor.

## Usage

1. In the Google Sheet, go to "Extensions" > "Apps Script" and click on the function dropdown.
2. Select the `runReport` function and click on the play button to run the script.
3. The script will retrieve the daily granular data from Google Analytics and populate the Sheet.
4. The data will be organized with dimensions (date, session source/medium, session campaign name, and event name) in the first row, followed by the respective metric values.
5. If the Sheet named "Raw_Data" already exists, the script will clear its contents before populating it with new data. Otherwise, a new sheet with the name "Raw_Data" will be created.

## Configuration

The `query` object in the code determines the dimensions, metrics, and date range for the Google Analytics report. By modifying this object, you can customize the data you retrieve. Here's a breakdown of the key properties you can adjust:

- `dimensions`: An array of dimensions to include in the report. You can add or remove dimensions as needed.
- `metrics`: An array of metrics to include in the report. You can add or remove metrics as needed.
- `dateRanges`: Specify the desired start and end dates for the report.
- `orderBys`: Define the order of the report rows based on a particular dimension.

For more information about the available dimensions, metrics, and other parameters, refer to the [Google Analytics Data API documentation](https://developers.google.com/analytics/devguides/reporting/data/v1/rest).

## Error Handling

If the script encounters any errors, they will be logged in the script editor's log. You can access the log by going to "View" > "Logs" or pressing `Ctrl + Enter`. Review the logs to troubleshoot any issues.
