console.log(csv_source)

const myForm = document.querySelector("#myForm")
const csvFile = document.querySelector("#csvFile")
const $myData = document.querySelector(".myData")
// const $myGrid = document.querySelector("#myGrid")

//================================================================================

function CSVstring_to_Array(data, delimiter = ",") {
  // This variable will collect all the titles from the data variable ["Name", "Roll Number"]
  const titles = data.slice(0, data.indexOf("\n")).split(delimiter);
  
  // This variable will store the values from the data [ 'Rohan,01', 'Aryan,02' ]
  const titleValues = data.slice(data.indexOf("\n") + 1).split("\n");
  
  // Map function will iterate over all values of title values array and append each object at the end of the array
  const ansArray = titleValues.map(function (v) {
    // Values variable will store individual title values [ 'Rohan', '01' ]
    const values = v.split(delimiter);
    
    // storeKeyValue variable will store object containing each title with their respective values i.e { Name: 'Rohan', 'Roll Number': '01' }
    const storeKeyValue = titles.reduce(function (obj, title, index) {
      obj[title] = values[index];
      return obj;
    }, {});
    
    return storeKeyValue;
  });
  
  return ansArray;
}

//================================================================================

const CSVToArray = (data, delimiter = ",", omitFirstRow = false) =>
data
.slice(omitFirstRow ? data.indexOf("\n") + 1 : 0)
.split("\n")
.map((v) => v.split(delimiter));

//================================================================================

const readCSV = (e) => {
  e.preventDefault();
  const input = csvFile.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    
    $myData.innerText = CSVstring_to_Array(text, ",", true);
    
    console.log(CSVstring_to_Array(text, ","));
  };
  reader.readAsText(input);
};

myForm.addEventListener("submit", readCSV);