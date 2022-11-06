
function $(id){
    return document.getElementById(id)
}
function POST(apiEndpoint,data,callback){
    let postOptions = {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    }
    fetch(apiEndpoint,postOptions).then(response =>response.json()).then((data)=>{
        callback(data)
    })
}

const apiEndpoint = 'http://localhost:3000/'
$('data-form').addEventListener('submit', (e)=>{
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target).entries());
    let timestamp = new Date()
    let timeString = timestamp.toLocaleTimeString([],{hour12 : false ,hour:'2-digit',minute:'2-digit',second:'2-digit'})
    let dateString = timestamp.toLocaleDateString('en-GB',{year:'numeric',month:'2-digit',day:'2-digit'})
    let time = dateString + " | " + timeString
    data.Timestamp = time
    POST(apiEndpoint+'data',data,(data)=>{
        console.log(data)
    })
})


fetch(apiEndpoint+'data').then((res)=>res.json()).then((data)=>{
    console.log(data.data)
})

