const myForm = document.querySelector("#myForm")
const fileInput = document.querySelector("#csvFile")
const $myData = document.querySelector(".myData")
const delimiter = ","
const newline = "\r\n"

//================================================================================
let csvData = []
//================================================================================
const $lines = {}

let lanes = []
let connectors = []
let ts = []
let fs = []
let phases = []
let ranges = [2, 4, 7, 10]
let modes = ["warning", "success", "secondary", "danger", "primary"]
let steps = 0
let spacing = 3

let cArr = []
let nArr = []

//================================================================================
const $myGrid = document.querySelector("#myGrid")
$myGrid.classList.add(`p-${spacing}`, "d-flex", "flex-row", `gap-${spacing}`)

//================================================================================
//================================================================================
/* REUSABLE */
//================================================================================
//================================================================================
const keyCount = (arr_flag, key_flag, val_flag) => {
  let result = ''
  val_flag ?
    result = arr_flag.filter(obj => { return obj[`${key_flag}`] === `${val_flag}`}) :
    result = arr_flag.filter(obj => { return obj[`${key_flag}`]})
  return result
}

const keyMap = (arr_flag, key_flag, val_flag) => {
  let result = ''
  val_flag ?
    result = arr_flag.map(obj => { return obj[`${key_flag}`] === `${val_flag}`}) :
    result = arr_flag.map(obj => { return obj[`${key_flag}`]})
  return result
}

const keyMin = (arr_flag, key_flag) => {
  
  let res = arr_flag.reduce((obj, el) => {
    obj[el[`${key_flag}`]] = (obj[el[`${key_flag}`]] || 0) + 1
    return obj
  }, {})
  
  const obKeys = Object.keys(res)
  return obKeys
}

const keyMax = (arr_flag, key_flag) => {
  let res = arr_flag.reduce((obj, el) => {
    obj[el[`${key_flag}`]] = (obj[el[`${key_flag}`]] || 0) + 1
    return obj
  }, {})
  
  const max = Math.max.apply(null, Object.values(res))
  return max
}

//================================================================================
//================================================================================
//================================================================================
const csvRead = (e) => {
  const arr = e.target.result.toString().split(newline)
  const headers = arr[0].split(delimiter)        
  arr.forEach((el, index) => {
      if (index > 0) {
          const data = el.split(delimiter)
          const object = {}
          data.forEach((el, index) => { object[headers[index].trim()] = el.trim() })
          csvData.push(object)
      }
  })
  // $myData.textContent = JSON.stringify(csvData)
  csvExtract(csvData)
}

//================================================================================
const csvGet = (e) => {
    const fr = new FileReader()
    fr.readAsText(fileInput.files[0])
    fr.addEventListener("load", csvRead)
}
myForm.addEventListener("change", csvGet)
//================================================================================


//================================================================================
//================================================================================
const processLines = ($btn, nArr, cArr) => {

    if (nArr.length === 0) {
      let lineFrom = document.querySelector(`#${$btn.id}`)
      let lineTo = document.querySelector(`#${$btn.dataset.n}`)
      console.log(lineFrom, lineTo)

      $lines[`a${index}`] = new LeaderLine(
        lineFrom,
        lineTo,
              {
                // color: "red",
                // size: 6,
                // path: "grid",
                // middleLabel: `${$btn.dataset.f}`,
              }
      )

    } else {
      let lineFrom = document.querySelector(`#${$btn.id}`)

      nArr.forEach( (_n, index) => {

        let lineTo = document.querySelector(`#${_n}`)
        console.log(lineFrom, lineTo)
  
        $lines[`a${index}${_n}`] = new LeaderLine(
          lineFrom,
          lineTo,
                {
                  // color: "red",
                  // size: 6,
                  // path: "grid",
                  // middleLabel: `${cArr[index]}`,
                }
        )


      })
    }


    

    // nArr = []
    // cArr = []
    return
}
//================================================================================
//================================================================================
//================================================================================


const drawLines = () => {
  const $btns = document.querySelectorAll('button')
  
  $btns.forEach(($btn, index) => {
    $btn.classList.add('zIndex')
    if ($btn.dataset.n) {
      if ( $btn.dataset.n.includes(' | ') ) {
        nArr = $btn.dataset.n.split(' | ')
        console.log('nArr => ', nArr)
      } else {
        // nArr = $btn.dataset.n.push
        nArr.push($btn.dataset.n)
        console.log('nArr => ', nArr)
      }
      processLines($btn, nArr, cArr)
    }
    
    if ($btn.dataset.c) {
      if ( $btn.dataset.c.includes(' | ') ) {
        cArr = $btn.dataset.c.split(' | ')
        console.log('cArr => ', cArr)
      } else {
        cArr.push($btn.dataset.c)
        console.log('cArr => ', cArr)
      }
    }

    console.log('$btn.dataset.n => ', $btn.dataset.n)


    // let lineFrom = document.querySelector(`#${$btn.id}`)
    // let lineTo = document.querySelector(`#${$btn.dataset.n}`)
    // console.log(lineFrom, lineTo)

    /*
    // $lines[`a${index}`] = new LeaderLine(lineFrom, lineTo,
    //   {
    //     color: "red",
    //     size: 6,
    //     path: "grid",
    //     // startLabel: "START",
    //     // middleLabel: "MIDDLE",
    //     middleLabel: `${$btn.dataset.f}`,
    //     // endLabel: "END"
    //   }
    // )
    */


    // if (nArr.length === 0) {
    //   let lineFrom = document.querySelector(`#${$btn.id}`)
    //   let lineTo = document.querySelector(`#${$btn.dataset.n}`)
    //   console.log(lineFrom, lineTo)

    //   $lines[`a${index}`] = new LeaderLine(
    //     lineFrom,
    //     lineTo,
    //           {
    //             color: "red",
    //             size: 6,
    //             path: "grid",
    //             middleLabel: `${$btn.dataset.f}`,
    //           }
    //   )

    // } else {
    //   let lineFrom = document.querySelector(`#${$btn.id}`)

    //   nArr.forEach( (_n, index) => {

    //     let lineTo = document.querySelector(`#${_n}`)
    //     console.log(lineFrom, lineTo)
  
    //     $lines[`a${index}${_n}`] = new LeaderLine(
    //       lineFrom,
    //       lineTo,
    //             {
    //               color: "red",
    //               size: 6,
    //               path: "grid",
    //               middleLabel: `${cArr[index]}`,
    //             }
    //     )


    //   })
    // }


    

    nArr = []
    cArr = []
  })
}
//================================================================================
//================================================================================

//================================================================================
const makeLanes = () => {
  let zFragment = new DocumentFragment()
  let bFragment = new DocumentFragment()

  // lanes.forEach((lane, index, lanes) => {
  lanes.forEach((lane, index) => {
    const $lane = document.createElement("div")
    $lane.id = lane
    $lane.classList.add(
      "flex-fill",
      "d-flex",
      "flex-column",
      `p-${spacing}`,
      `gap-${spacing}`,
      `bg-${modes[index]}`
    )

    zFragment.append($lane)  
  })
  $myGrid.append(zFragment)
  return
}
//================================================================================
const fragment = new DocumentFragment()

const csvExtract = (csvData) => {
  lanes = keyMin(csvData, 'f')
  steps = keyMax(csvData, 'f')
  
  makeLanes()

  csvData.forEach((el) => {
    for (let [key, value] of Object.entries(el)) {
      if (key === "ID") {
        const $btn = document.createElement("button")
        $btn.id = value
        $btn.t = "button"
        // $btn.classList.add("btn", "m-2", "p-1", "bg-success")
        $btn.classList.add("btn", "m-2", "p-1", "bg-light")

        $btn.textContent = el["Description"]
  
        
        el["t"] ? ($btn.dataset.t = el["t"]) : ""
        el["f"] ? ($btn.dataset.f = el["f"]) : ""
        el["Phase"] ? ($btn.dataset.phase = el["Phase"]) : ""
        
        el["c"] ? ($btn.dataset.c = el["c"]) : ""
        el["n"] ? ($btn.dataset.n = el["n"]) : ""

        el["Link"] ? ($btn.dataset.link = el["Link"]) : ""

        let elPlace = document.querySelector(`#${el["f"]}`)

        elPlace.append($btn)
      }
    }
  })
  drawLines()
}