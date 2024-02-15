const csv_source = [
  {
    'ID': "P100",
    'Description': "Get course requirements",
    'LINK': "http://google.com'",
    'Next': "P200",
    'Connector': "",
    'Type': "Start",
    'Function': "CLIENT",
    'Phase': "init",
    'ALT': "1"
  },
  {
    'ID': "P200",
    'Description': "Create course module",
    'LINK': "http://canada.ca",
    'Next': "P300",
    'Connector': "",
    'Type': "Document",
    'Function': "PDC",
    'Phase': "DESIGN",
    'ALT': "2"
  },
  {
    'ID': "P300",
    'Description': "Module passes review?",
    'LINK': "",
    'Next': "P400 | P500",
    'Connector': "Yes | No",
    'Type': "Decision",
    'Function': "PDC",
    'Phase': "DEVELOP",
    'ALT': "3"
  },
  {
    'ID': "P400",
    'Description': "Publish course",
    'LINK': "",
    'Next': "",
    'Connector': "",
    'Type': "Process",
    'Function': "DEV",
    'Phase': "IMPLEMENT",
    'ALT': "4"
  },
  {
    'ID': "P500",
    'Description': "Address feedback",
    'LINK': "",
    'Next': "P400",
    'Connector': "",
    'Type': "Subprocess",
    'Function': "DEV",
    'Phase': "EVAL",
    'ALT': "5"
  }
];
