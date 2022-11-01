const dbForm = document.getElementById('db-form');
const dataTable = document.getElementById('data-table');

function changeMode(){
    let mode = document.getElementById("mode").value
    if (mode == "receiver"){
        document.getElementBy
    }
}

dbForm.addEventListener('submit',(e)=>{
    e.preventDefault() // overrides default submission. results in error if deleted.
    const data = Object.fromEntries(new FormData(e.target).entries()); // Converts form data into key value pairs for us.
    let date = new Date()
    let timestamp = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    data.timestamp = timestamp
    let postOptions = {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    }
    fetch("http://localhost:3000/data",postOptions).then((response) => response.json())
    .then((data) => {console.log("Sent data!")})
})


fetch("http://localhost:3000/data").then((response) => response.json()).then((data) => {
    dataTable.innerHTML = ``
    let string = ''
    console.log(dataTable)
    string += '<tr>'
    for(let col in data.data[1]) {
        string += `<th>${col}</th>`
    }
    string += '</tr>'
    for(let row in data.data){
        string += `<tr>`
        for(let col in data.data[row]){
            string += `<td>${data.data[row][col]}</td>`
        }
        string += `</tr>`
    }
    dataTable.innerHTML = "<table>" + string + "</table>"
    
})