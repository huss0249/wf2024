// console.log(csv_source.length)

const $myGrid = document.querySelector("#myGrid")

$myGrid.classList.add("d-flex", "flex-column");
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