const ordersTableBody = document.getElementById('ordersTableBody')
let orders = []
const loadOrders = ()=>{
  fetch('/api/orders')
  .then(res=>res.json())
  .then(res=>orders=[...res])
  .catch(err=>console.log(err.message))
  .then(()=>renderOrders(orders))
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
                              <li class="d-flex">
                                <img src="${item.item.imageUrl}" width="5px"  alt="">
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
            <td>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
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

loadOrders()