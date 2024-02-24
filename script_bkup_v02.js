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

// $myGrid.classList.add("d-flex", "flex-column");
$myGrid.classList.add(`p-${spacing}`, "d-flex", "flex-row", `gap-${spacing}`);
//================================================================================




//================================================================================

// ID, Description, LINK, Next, Connector, Type, Function, Phase, ALT

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









const fragment = new DocumentFragment();

csv_source.forEach((el) => {
  for (let [key, value] of Object.entries(el)) {

    if (key === "ID") {
      const $btn = document.createElement("button");
      $btn.id = value;
      $btn.type = "button";
      $btn.classList.add("m-3", "p-2", "bg-success");

      $btn.textContent = el["Description"];

      el["Next"] ? ($btn.dataset.next = el["Next"]) : "";
      el["Type"] ? ($btn.dataset.type = el["Type"]) : "";
      el["Function"] ? ($btn.dataset.function = el["Function"]) : "";
      el["Phase"] ? ($btn.dataset.phase = el["Phase"]) : "";
      el["Connector"] ? ($btn.dataset.connector = el["Connector"]) : "";
      el["Link"] ? ($btn.dataset.link = el["Link"]) : "";
      fragment.append($btn);
    }
  }
  $myGrid.append(fragment);

});



let $btns = document.querySelectorAll('button')

$btns.forEach((el, index) => {

  let fromm = `#${$btns[index].id}`;
  let too = `#${$btns[index].dataset.next}`;
  console.log(fromm, too)
  

  let $arrows = {}
  fromm != undefined && too != undefined ? $arrows['m'+index] = new LeaderLine(
    document.querySelector(fromm),
    document.querySelector(too)
  ) : ''
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
  $myGrid,
  {
    color: "red",
    size: 4,
    path: "grid",
    startLabel: "START",
    middleLabel: "MIDDLE",
    endLabel: "END"
  }
  );

  /*================================================================================
  ==================================================================================
  END LEADER-LINE
  ================================================================================*/

  // let mm = new LeaderLine(
  //   document.querySelector("#P100"),
  //   document.querySelector("#P200")
  // );