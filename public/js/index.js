const ordersTableBody = document.getElementById('ordersTableBody');
const messagesList = document.getElementById('list');
let orders = []
let messages=[]


const checkResult = ()=> (parseInt(document.getElementById('result').value)===25) ? location.replace('/home') : alert(`Try again`)


const loadData =(array,db_data,func)=>{
  fetch(`/api/${db_data}`)
  .then(res=>res.json())
  .then(res=>array=[...res])
  .catch(err=>console.log(err.message))
  .then(()=>func(array))
}

const renderOrders = (ordersArray) =>{
  let row = ordersArray.map(order=>
    `
    <tr>
            <td>${order.buyer.name}</td>
            <td>${order.buyer.email}</td>
            <td class="accordion" id="accordionPanelsStayOpenExample" >
                <div class="accordion-item">
                  <h4 class="accordion-header" id="panelsStayOpen-headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-${order._id}" aria-expanded="false" aria-controls="panelsStayOpen-${order._id}">
                      Tickets (${order.item.length})
                    </button>
                  </h4>
                  <div id="panelsStayOpen-${order._id}" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                    <div class="accordion-body">
                      <ul>
                      ${order.item.map(item=> 
                              `
                              <li class="d-flex justify-content-around">
                                <img src="${item.item.imageUrl}" width="30px"  alt="">
                                <span>${item.item.title}</span>
                                <span>Quantity ${item.itemQty}</span>
                                <span>Date: ${item.date}</span>
                                <span>Turn: ${item.turn}</span>
                              </li>
                              `
                      )}
                      </ul>
                    </div>
                  </div>
                </div>
            </td>
            <td>${order.total}</td>
            <td onclick=deleteDocument("orders","${order._id}")>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
              </svg>
            </td>
          </tr>
    `
  )
  if (row.length === 0) {
    let emptyTable = `<div class="text-danger">No products added</div>`
    tableProd.innerHTML = emptyTable
  } else {
    let respStringAll = ''
    for (let i = 0; i < row.length; i++) {
      respStringAll = respStringAll + row[i]
    }
    ordersTableBody.innerHTML = respStringAll
}
}
const renderMessages=(messagesArray)=>{
  let messagesHtml = messagesArray.map(message =>
    `
      <li onClick="showMessages('${message._id}')">
        <h6 class="text-start">${message.email}</h6>
      </li>
          `
  )
  let respStringAll = ''
  for (let i = 0; i < messagesHtml.length; i++) {
    respStringAll = respStringAll + messagesHtml[i]
  }
  messagesList.innerHTML = respStringAll
}
const showMessages = (id) => {
  let chatHtml = document.getElementById('chat')
  console.log();
  fetch(`/api/messages/${id}`)
    .then(response => response.json())
    .then(data => {
      chatHtml.innerHTML = 
                  `
                    <h4 class="chat-user">${data.email}</h4>
                    <p>${data.message}</p>
                    <button class="btn" onClick=deleteDocument("messages","${data._id}")>Delete message</button>
                    `
    })
}

const deleteDocument = (route,id)=>{
  fetch(`/api/${route}/${id}`,{
    method: "DELETE"
  })
  .then(res=>res.json())
  .catch(error=>console.log(error))
  .then(()=>location.reload())

}