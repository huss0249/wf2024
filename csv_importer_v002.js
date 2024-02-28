const myForm = document.querySelector("#myForm");
const fileInput = document.querySelector("#csvFile");
const $myData = document.querySelector(".myData");
const delimiter = ",";
const newline = "\r\n";
const jsonObj = [];

//================================================================================

// let lanes = ["A", "B", "C", "D"];
let lanes = [];
let connectors = [];
let types = [];
let functions = [];
let phases = [];
let ranges = [2, 4, 7, 10];
let modes = ["warning", "success", "secondary", "danger", "primary"];
let steps;
let spacing = 3;


//================================================================================
const keyCount = (arr_flag, key_flag, val_flag) => {
  let result = ''
  val_flag ?
    result = arr_flag.filter(obj => { return obj[`${key_flag}`] === `${val_flag}`}) :
    result = arr_flag.filter(obj => { return obj[`${key_flag}`]});
  return result
}

const keyMap = (arr_flag, key_flag, val_flag) => {
  let result = ''
  val_flag ?
    result = arr_flag.map(obj => { return obj[`${key_flag}`] === `${val_flag}`}) :
    result = arr_flag.map(obj => { return obj[`${key_flag}`]});
  return result
}

const keyMin = (arr_flag, key_flag) => {
  
  let res = arr_flag.reduce((obj, el) => {
    obj[el[`${key_flag}`]] = (obj[el[`${key_flag}`]] || 0) + 1;
    // console.log('obj ====> ', obj)
    return obj;
  }, {})
  
  // console.log('res =======>>>>>> ', res)
  const obKeys = Object.keys(res)
  return obKeys
}

const keyMax = (arr_flag, key_flag) => {
  let res = arr_flag.reduce((obj, el) => {
    obj[el[`${key_flag}`]] = (obj[el[`${key_flag}`]] || 0) + 1;
    return obj;
  }, {})
  // console.log('RES =====>', res)

  const max = Math.max.apply(null, Object.values(res));
  // console.log(max)
  return max
}

//================================================================================
//================================================================================
//================================================================================
const readCSV = (e) => {
    const fr = new FileReader();
    fr.readAsText(fileInput.files[0]);
    
    fr.addEventListener("load", (e) => {
        const arr = e.target.result.toString().split(newline);
        // const jsonObj = [];
        const headers = arr[0].split(delimiter);        
        arr.forEach((el, index) => {
            if (index > 0) {
                const data = el.split(delimiter);
                const object = {};
                data.forEach((el, index) => { object[headers[index].trim()] = el.trim() });
                jsonObj.push(object);
            }
        });
        $myData.textContent = jsonObj;
        update_src(jsonObj)
    });
};
myForm.addEventListener("change", readCSV);
//================================================================================


//================================================================================
const $myGrid = document.querySelector("#myGrid")
$myGrid.classList.add(`p-${spacing}`, "d-flex", "flex-row", `gap-${spacing}`);
//================================================================================
//================================================================================
const makeLanes = (flag, steps_flag) => {
  // console.log('@makeLanes > csvData.length => ', flag.length)
  let zFragment = new DocumentFragment();
  let bFragment = new DocumentFragment();

  lanes.forEach((lane, index, lanes) => {
    const $lane = document.createElement("div");
    $lane.id = lane;
    $lane.classList.add(
      "flex-fill",
      "d-flex",
      "flex-column",
      `p-${spacing}`,
      `gap-${spacing}`,
      `bg-${modes[index]}`
    );

    // console.log('steps_flag => ', steps_flag)
    
    // for (let j = 1; j < steps_flag.length + 1; j++) {
    for (let j = 1; j < steps_flag + 1; j++) {
      // console.log('j = ', j)
      const $step = document.createElement("div");
      $step.id = j;

      j < modes.length + 1
      ? $step.classList.add(
        "flex-fill",
        `bg-${modes[j - 1]}`,
        "text-dark",
        "text-center",
        `p-${spacing}`
      )
      : $step.classList.add(
        "flex-fill",
        "bg-light",
        "text-dark",
        "text-center",
        `p-${spacing}`
      )

      $step.textContent = `${lane}${j}`;
      $step.dataset.address = `${lane}${j}`;
      $step.dataset.lane = lane;
      $step.dataset.step = j;
      bFragment.append($step);
    }
    $lane.append(bFragment);
    zFragment.append($lane);  
  });
  $myGrid.append(zFragment);
}
//================================================================================
const fragment = new DocumentFragment();

const update_src = (flag) => {
  const csvData = flag;

  let ress = keyCount(flag, 'Phase', 'DESIGN')
  // let ress = keyCount(flag, 'Phase')
  // console.log('ress => ', ress.length);
  // console.log('ress => ', ress);

  // let ressm = keyMap(flag, 'Phase', 'DESIGN')
  // let ressm = keyMap(flag, 'Phase')
  // console.log('ressm => ', ressm.length);
  // console.log('ressm => ', ressm);

  // lanes = keyMap(flag, 'Phase')
  lanes = keyMin(flag, 'Function')
  // console.log('lanes => ', lanes.length);
  // console.log('lanes => ', lanes);

  // steps = keyCount(flag, 'Function')
  steps = keyMax(flag, 'Function')
  // console.log('steps => ', steps.length);
  // console.log('steps => ', steps);



   


  csvData.forEach((el) => {
    for (let [key, value] of Object.entries(el)) {
      if (key === "ID") {
        const $btn = document.createElement("button");
        $btn.id = value;
        $btn.type = "button";
        $btn.classList.add("m-2", "p-1", "bg-success");

        $btn.textContent = el["Description"];
        // console.log('el["Description"] => ', el["Description"])
        // ? console.log(`${key}: ${value}`) : ''
        el["Next"]
          ? ($btn.dataset.next = el["Next"])
          : ($btn.dataset.next = "none");
        el["Type"] ? ($btn.dataset.type = el["Type"]) : "";
        el["Function"] ? ($btn.dataset.function = el["Function"]) : "";
        el["Phase"] ? ($btn.dataset.phase = el["Phase"]) : "";

        
        // console.log('connector_flag => ', connector_flag)

        let mark
        if ( el["Connector"] ) {
          // mark = 'filled'
          if ( el["Connector"].includes(' | ') ) {
            // console.log(el["Connector"].split(' | '))
            // console.log(el["Next"].split(' | '))
            el["Connector"] = el["Connector"].split(' | ')
            el["Next"] = el["Next"].split(' | ')
            mark = 'double'
          }
        } else {
            el["Connector"] = "empty"
          
        }
        // console.log('el["Connector"] => ', el)
        el["Connector"]
          ? ($btn.dataset.connector = el["Connector"])
          : ($btn.dataset.connector = "default");
        el["Link"] ? ($btn.dataset.link = el["Link"]) : "";
        // console.log($btn.dataset);
        fragment.append($btn);
      }
    }
    $myGrid.append(fragment);

    // console.log(el.['Next']);

    //   let fromm = el["ID"];
    //   let too = el["Next"];

    // let m = new LeaderLine(
    //   document.querySelector(`#${fromm}`),
    //   document.querySelector(`#${too}`)
    // );
  });  
  makeLanes(csvData, steps)
}

/*================================================================================
==================================================================================
LEADER-LINE
================================================================================*/

let a = new LeaderLine(
  LeaderLine.mouseHoverAnchor(myForm, "draw", {
    animOptions: {
      duration: 3000
    }
  }),
  $myData,
  {
    color: "red",
    size: 4,
    path: "arc",
    startLabel: "START",
    middleLabel: "MIDDLE",
    endLabel: "END"
  }
);
// a.remove();

/*================================================================================
  ==================================================================================
  END LEADER-LINE
  ================================================================================*/
  /*
let mm = new LeaderLine(
  document.querySelector("#P100"),
  document.querySelector("#P200"),
  {
    color: "red",
    size: 2,
    path: "arc",
    // startLabel: "START",
    middleLabel: document.querySelector("#P300").dataset.connector[0]
    // endLabel: "END"
  }
);

let mm2 = new LeaderLine(
  document.querySelector("#P100"),
  document.querySelector("#P300"),
  {
    color: "blue",
    size: 4,
    path: "grid",
    // startLabel: "START",
    middleLabel: document.querySelector("#P300").dataset.connector[0]
    // endLabel: "END"
  }
);
*/