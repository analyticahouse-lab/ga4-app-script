var propertyId = '<Property ID>';
var sheetName = "<Sheet name>";
var query = {
  "dimensions": [
    {"name": "date"},
    {"name": "sessionSourceMedium"},
    {"name": "sessionCampaignName"},
    {"name": "eventName"}
  ],
  "metrics": [
    {"name": "eventCount"},
    {"name": "purchaseRevenue"},
    {"name": "sessions"},
    {"name": "advertiserAdCost"}
  ],
  "dateRanges": [
    {"startDate": "2021-01-01", "endDate": "today"}
  ],
  "orderBys": [
    {"dimension": {"orderType": "ALPHANUMERIC", "dimensionName": "date"}, "desc": true}
  ],
  "limit": 1000 // Row limit 
};

function runReport() {
  try {
    var requestData = query;
    const request = AnalyticsData.newRunReportRequest();
    request.dimensions = requestData.dimensions;
    request.metrics = requestData.metrics;
    request.dateRanges = requestData.dateRanges;
    request.metricFilter = requestData.metricFilter;
    request.dimensionFilter = requestData.dimensionFilter;
    request.orderBys = requestData.orderBys;
    request.limit = requestData.limit;
    request.metricAggregations = requestData.metricAggregations;

    const report = AnalyticsData.Properties.runReport(request, 'properties/' + propertyId);
    if (!report.rows) {
      Logger.log('No rows returned.');
      return;
    }

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(sheetName);
    if (sheet == null) {
      sheet = spreadsheet.insertSheet(sheetName);
    } else {
      sheet.clearContents();
    }

    const dimensionHeaders = report.dimensionHeaders.map((dimensionHeader) => {
      return dimensionHeader.name;
    });
    const metricHeaders = report.metricHeaders.map((metricHeader) => {
      return metricHeader.name;
    });
    const headers = [...dimensionHeaders, ...metricHeaders];

    sheet.appendRow(headers);
    const rows = report.rows.map((row) => {
      const dimensionValues = row.dimensionValues.map((dimensionValue) => {
        return dimensionValue.value;
      });
      const metricValues = row.metricValues.map((metricValue) => {
        return metricValue.value;
      });
      return [...dimensionValues, ...metricValues];
    });

    sheet.getRange(2, 1, report.rows.length, headers.length)
      .setValues(rows);

    Logger.log('Report spreadsheet created: %s', spreadsheet.getUrl());
  } catch (e) {
    Logger.log('Failed with error: %s', e.error);
  }
}
