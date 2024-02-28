
    /*
const obj = { a: 4, b: 0.5 , c: 0.35, d: 5 };
const max = Math.max.apply(null, Object.values(obj));
console.log(max) // 5
    */



const myForm = document.querySelector("#myForm");
const fileInput = document.querySelector("#csvFile");
const $myData = document.querySelector(".myData");
const delimiter = ",";
const newline = "\r\n";
const jsonObj = [];

//================================================================================

// let zones = ["A", "B", "C", "D"];
let zones = [];
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
    result = arr_flag.filter((obj) => { return obj[`${key_flag}`] === `${val_flag}`}) :
    result = arr_flag.filter((obj) => { return obj[`${key_flag}`]});
  return result
}

const keyMap = (arr_flag, key_flag, val_flag) => {
  let result = ''
  val_flag ?
    result = arr_flag.map((obj) => { return obj[`${key_flag}`] === `${val_flag}`}) :
    result = arr_flag.map((obj) => { return obj[`${key_flag}`]});
  return result
}
//================================================================================
/*
const CSVToArray = (data, delimiter, omitFirstRow = false) =>
  data
    .slice(omitFirstRow ? data.indexOf(newline) + 1 : 0)
    .split(newline)
    .map((v) => {
      return v.split(delimiter);
    });
    */
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
                
                data.forEach((el, index) => {
                    object[headers[index].trim()] = el.trim();
                });
                jsonObj.push(object);
            }
        });
        $myData.textContent = jsonObj;
        // return jsonObj;









        
        /* jsonObj.forEach((el) => {
            let ee = el.map(m => m.key === 'Phase')
            console.log('ee = ', ee)
    })
        console.log('jsonObj ====> ', aa) */







        update_src(jsonObj)
    });
};

myForm.addEventListener("change", readCSV);

//================================================================================


//================================================================================
const $myGrid = document.querySelector("#myGrid")
$myGrid.classList.add(`p-${spacing}`, "d-flex", "flex-row", `gap-${spacing}`);

//================================================================================
// ID, Description, LINK, Next, Connector, Type, Function, Phase, ALT
//================================================================================
const makeZones = (flag, steps_flag) => {
    console.log('@makeZones > csv_source.length => ', flag.length)

    /*
const obj = { a: 4, b: 0.5 , c: 0.35, d: 5 };
const max = Math.max.apply(null, Object.values(obj));
console.log(max) // 5
    */

let zFragment = new DocumentFragment();
let bFragment = new DocumentFragment();

zones.forEach((zone, index, zones) => {
  const $zone = document.createElement("div");
  $zone.id = zone;
  $zone.classList.add(
    "flex-fill",
    "d-flex",
    "flex-column",
    `p-${spacing}`,
    `gap-${spacing}`,
    `bg-${modes[index]}`
  );
console.log('steps_flag => ', steps_flag)
  for (let j = 1; j < steps_flag.length + 1; j++) {
    console.log('j = ', j)
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
        );

    $step.textContent = `${zone}${j}`;
    $step.dataset.address = `${zone}${j}`;
    $step.dataset.zone = zone;
    $step.dataset.step = j;
    bFragment.append($step);
  }
  $zone.append(bFragment);
  zFragment.append($zone);
});
$myGrid.append(zFragment);
}



//================================================================================
const fragment = new DocumentFragment();

const update_src = (flag) => {
  const csv_source = flag;
  // console.log(csv_source.map((el) => el['Next'] === ''))
//   console.log('csv_source.length => ', csv_source.length)
//   return csv_source
// }

// const res = csv_source.reduce((obj, v) => {
//   obj[v.Function] = (obj[v.Function] || 0) + 1;
//   return obj;
// }, {})

let ress = keyCount(flag, 'Phase', 'DESIGN')
// let ress = keyCount(flag, 'Phase')
console.log('ress => ', ress.length);
console.log('ress => ', ress);

// let ressm = keyMap(flag, 'Phase', 'DESIGN')
let ressm = keyMap(flag, 'Phase')
console.log('ressm => ', ressm.length);
console.log('ressm => ', ressm);

zones = keyMap(flag, 'Phase')
console.log('zones => ', zones.length);
console.log('zones => ', zones);

steps = keyCount(flag, 'Function')
console.log('steps => ', steps.length);
console.log('steps => ', steps);


csv_source.forEach((el) => {
//   console.log("here");
    // console.log(el["Phase"])
  for (let [key, value] of Object.entries(el)) {
    // key === 'ID' ? console.log(`${key}: ${value}`) : ''
    // console.log(`${key}: ${value}`)

    // console.log(key)

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
      console.log('el["Connector"] => ', el)
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

makeZones(csv_source, steps)
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