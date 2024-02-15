console.log(csv_source.length)

// const myForm = document.querySelector("#myForm")
// const csvFile = document.querySelector("#csvFile")
// const $myData = document.querySelector(".myData")
const $myGrid = document.querySelector("#myGrid")

//================================================================================
csv_source.forEach(el => {
//   console.log(el)
  for (let [key, value] of Object.entries(el)) {
    key === 'ID' ? console.log(`${key}: ${value}`) : ''
    console.log(`${key}: ${value}`)
  }
  console.log(' ')
})



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