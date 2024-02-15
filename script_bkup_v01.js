console.log(csv_source.length)

// const myForm = document.querySelector("#myForm")
// const csvFile = document.querySelector("#csvFile")
// const $myData = document.querySelector(".myData")
const $myGrid = document.querySelector("#myGrid")

$myGrid.classList.add("d-flex", "flex-column");

//================================================================================
// csv_source.forEach(el => {
// //   console.log(el)
//   for (let [key, value] of Object.entries(el)) {
//     key === 'ID' ? console.log(`${key}: ${value}`) : ''
//     console.log(`${key}: ${value}`)
//   }
//   console.log(' ')
// })


const fragment = new DocumentFragment();

csv_source.forEach((el) => {
  //   console.log(el)
  for (let [key, value] of Object.entries(el)) {
    // key === 'ID' ? console.log(`${key}: ${value}`) : ''
    // console.log(`${key}: ${value}`)

    if (key === "ID") {
      const $btn = document.createElement("button");
      $btn.id = value;
      $btn.type = "button";
      $btn.classList.add("m-3", "p-2", "bg-success");

      $btn.textContent = el["Description"];
      // ? console.log(`${key}: ${value}`) : ''
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

  // console.log(el.['Next']);

  // let fromm = `#${el["ID"]}`;
  // let too = `#${el["Next"]}`;

  // console.log(fromm, too)

  // let m = new LeaderLine(
  //   // document.querySelector(`#${fromm}`),
  //   // document.querySelector(`#${too}`)
  //   document.querySelector(fromm),
  //   document.querySelector(too)
  // );
});


// csv_source.forEach((el, index) => {
  
//   console.log(csv_source[index]['ID'])
//   let fromm = `#${csv_source[index]["ID"]}`;
//   let too = `#${csv_source[index]["Next"]}`;
//   console.log(fromm, too)
  
//   // let m = new LeaderLine(
//     //   // document.querySelector(`#${fromm}`),
//     //   // document.querySelector(`#${too}`)
//     //   document.querySelector(fromm),
//     //   document.querySelector(too)
//     // );
//     fromm != undefined && too != undefined ? window['m'+index] = new LeaderLine(
//   // let [index] = new LeaderLine(
//     // document.querySelector(`#${fromm}`),
//     // document.querySelector(`#${too}`)
//     document.querySelector(fromm),
//     document.querySelector(too)
//   ) : ''
// });


let $btns = document.querySelectorAll('button')
// console.log($btns[1].dataset.next)

$btns.forEach((el, index) => {
  
  // console.log($btns[index])
  // let fromm = `#${$btns[index]["ID"]}`;
  // let too = `#${$btns[index]["Next"]}`;
  let fromm = `#${$btns[index].id}`;
  let too = `#${$btns[index].dataset.next}`;
  console.log(fromm, too)
  
  // fromm != undefined && too != undefined ? window['m'+index] = new LeaderLine(
    
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
  // a.remove();
  
  /*================================================================================
  ==================================================================================
  END LEADER-LINE
  ================================================================================*/

  // let mm = new LeaderLine(
  //   document.querySelector("#P100"),
  //   document.querySelector("#P200")
  // );
  