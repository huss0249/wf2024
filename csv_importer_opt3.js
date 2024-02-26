const myForm = document.querySelector("#myForm");
const fileInput = document.querySelector("#csvFile");
const $myData = document.querySelector(".myData");
const delimiter = ",";
const newline = "\r\n";
const jsonObj = [];
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
        update_src(jsonObj)
    });
};

myForm.addEventListener("change", readCSV);

//================================================================================
//================================================================================

let zones = ["A", "B", "C", "D"];
let connectors = [];
let types = [];
let functions = [];
let phases = ["Initial", "Design", "Develop", "Deploy"];
let ranges = [2, 4, 7, 10];
let modes = ["warning", "success", "secondary", "danger", "primary"];
let steps = 8;
let spacing = 3;

//================================================================================
const $myGrid = document.querySelector("#myGrid")
$myGrid.classList.add(`p-${spacing}`, "d-flex", "flex-row", `gap-${spacing}`);

//================================================================================
// ID, Description, LINK, Next, Connector, Type, Function, Phase, ALT
//================================================================================
const makeZones = () => {


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

  for (let j = 1; j < steps + 1; j++) {
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

//================================================================================
const fragment = new DocumentFragment();

const update_src = (flag) => {
    // console.log(flag)

  // const csv_source = jsonObj
  const csv_source = flag;
  // console.log(csv_source.map((el) => el['Next'] === ''))
//   console.log(csv_source)
//   return csv_source
// }

csv_source.forEach((el) => {
  console.log("here");
    console.log(el)
  for (let [key, value] of Object.entries(el)) {
    // key === 'ID' ? console.log(`${key}: ${value}`) : ''
    // console.log(`${key}: ${value}`)

    if (key === "ID") {
      const $btn = document.createElement("button");
      $btn.id = value;
      $btn.type = "button";
      $btn.classList.add("m-2", "p-1", "bg-success");

      $btn.textContent = el["Description"];
      console.log('el["Description"] => ', el["Description"])
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

makeZones()
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