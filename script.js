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

    // console.log($step.dataset);
    bFragment.append($step);
  }
  $zone.append(bFragment);

  zFragment.append($zone);
});
$myGrid.append(zFragment);

//================================================================================



let check_data = (flag) => {
  let mark = ''
  // flag != '' ? console.log('flag  = ', flag) : console.log('ffffff === ', flag)
  flag != '' ? mark = 'filled' : ''
  flag.includes(' | ') ? mark = 'double' : ''

  console.log(mark)
  // string.includes(substring)
  // string.indexOf(substring) !== -1
  return true
}

//================================================================================
const fragment = new DocumentFragment();

csv_source.forEach((el) => {
  // console.log("here");
  //   console.log(el)
  for (let [key, value] of Object.entries(el)) {
    // key === 'ID' ? console.log(`${key}: ${value}`) : ''
    // console.log(`${key}: ${value}`)

    if (key === "ID") {
      const $btn = document.createElement("button");
      $btn.id = value;
      $btn.type = "button";
      $btn.classList.add("m-2", "p-1", "bg-success");

      $btn.textContent = el["Description"];
      // ? console.log(`${key}: ${value}`) : ''
      el["Next"]
        ? ($btn.dataset.next = el["Next"])
        : ($btn.dataset.next = "none");
      el["Type"] ? ($btn.dataset.type = el["Type"]) : "";
      el["Function"] ? ($btn.dataset.function = el["Function"]) : "";
      el["Phase"] ? ($btn.dataset.phase = el["Phase"]) : "";
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

  let fromm = el["ID"];
  let too = el["Next"];

  // let m = new LeaderLine(
  //   document.querySelector(`#${fromm}`),
  //   document.querySelector(`#${too}`)
  // );
});

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
