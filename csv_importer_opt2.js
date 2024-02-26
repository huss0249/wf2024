const myForm = document.querySelector("#myForm")
const fileInput = document.querySelector("#csvFile")
const $myData = document.querySelector(".myData")
const delimiter = ","
const newline = "\r\n"

//================================================================================



//================================================================================

// const CSVToArray = (data, delimiter = ",", omitFirstRow = false) =>
// data
// .slice(omitFirstRow ? data.indexOf("\n") + 1 : 0)
// .split("\n")
// .map((v) => v.split(delimiter));
const CSVToArray = (data, delimiter, omitFirstRow = false) =>
data
// .slice(omitFirstRow ? data.indexOf(newline) + 1 : 0)
.split(newline)
.map((v) => {
  return v.split(delimiter)
});

//================================================================================


const abc = (arr1, arr2) => {
  const map = new Map([
    arr1,
    arr2,
  ]);

  const obj = Object.fromEntries(map);
  
  console.log(obj);
}

const readCSV = (e) => {
 
  const fr = new FileReader();
  
  fr.readAsText(fileInput.files[0]);

  fr.addEventListener('load', (e) => {
    const text = e.target.result;

    // $myData.textContent = CSVToArray(text, ",", true);
    $myData.textContent = text
    const txtArr = CSVToArray(text, ",", true);
    // console.log(txtArr)
    txtArr.forEach((element, index, txtArr) => {
      let a = abc(txtArr[0], element)
      // console.log(a)
    });

    // console.log(text.includes('\n'));
    // console.log(Object.assign({}, txtArr));
    
    // const obArr = Object.assign({}, txtArr);
    // console.log(obArr)
  }
)};

myForm.addEventListener("change", readCSV);