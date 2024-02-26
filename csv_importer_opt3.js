const myForm = document.querySelector("#myForm");
const fileInput = document.querySelector("#csvFile");
const $myData = document.querySelector(".myData");
const delimiter = ",";
const newline = "\r\n";
//================================================================================
const CSVToArray = (data, delimiter, omitFirstRow = false) =>
  data
    .slice(omitFirstRow ? data.indexOf(newline) + 1 : 0)
    .split(newline)
    .map((v) => {
      return v.split(delimiter);
    });
//================================================================================
//================================================================================
const readCSV = (e) => {
  const fr = new FileReader();
  fr.readAsText(fileInput.files[0]);

  fr.addEventListener("load", (e) => {
    // const text = e.target.result;

    // const arr = text.toString().split(newline);
    const arr = e.target.result.toString().split(newline);
    // console.log(arr)

    const jsonObj = [];
    const headers = arr[0].split(delimiter);
    // console.log(headers);

    arr.forEach((el, index) => {
      if (index > 0) {
        const data = el.split(delimiter);
        const object = {};

        data.forEach((el, index) => {
          object[headers[index].trim()] = el.trim();
        });
        jsonObj.push(object);
      }
    });
    console.log(jsonObj);

    // $myData.textContent = CSVToArray(text, ",", true);
    // $myData.textContent = text;
    $myData.textContent = jsonObj;
  });
};

myForm.addEventListener("change", readCSV);
