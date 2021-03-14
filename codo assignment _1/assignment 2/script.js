
const RenderData = (res) => {
    console.log("Render data: ", res);

    let namelabel = document.getElementById("nametop");
    let addresslabel = document.getElementById("address");
    let citylabel = document.getElementById("city");
    let statelabel = document.getElementById("state");
    let emaillabel = document.getElementById("email");
    let contactlabel = document.getElementById("contact");
    let gstnumlabel = document.getElementById("gstnumber");
    
    namelabel.innerText = res.restaurantsDetails.companyName;
    addresslabel.innerText = res.restaurantsDetails.address;
    citylabel.innerText = res.restaurantsDetails.city;
    statelabel.innerText = res.restaurantsDetails.state;
    emaillabel.innerText = res.restaurantsDetails.email;
    contactlabel.innerText = res.restaurantsDetails.phone;
    gstnumlabel.innerText = res.restaurantsDetails.gstNo;

    const tableOtherData = document.getElementById("tableNumber");
    if( res.orderBookDetails.table_id === 0 )
    {
        tableOtherData.innerText = "Take Away";
    }
    else
    {
        tableOtherData.innerText = res.orderBookDetails.table_id;
    }
    
    const timestampoforder = document.getElementById("timedate");
    timestampoforder.innerText = res.orderBookDetails.timestamp;

    const tabel = document.getElementById("orderItemTable");
    res.orderBookDetails.orderItemsList.forEach((orderItems, index) => {
        let orderFeilds = {
            index: index+1,
            name: orderItems.menu_name,
            quantity: orderItems.menu_quantity,
            price: orderItems.menu_price,
            amount: (orderItems.rate*orderItems.menu_quantity)
        }
        let newRow =  tabel.insertRow(-1);

        let indexCell = newRow.insertCell(0);
        let nameCell = newRow.insertCell(1);
        let quantityCell = newRow.insertCell(2);
        let priceCell = newRow.insertCell(3);
        let amountCell = newRow.insertCell(4);

        let indexCellContent = document.createTextNode(orderFeilds.index);
        let nameCellContent = document.createTextNode(orderFeilds.name);
        let quantityCellContent = document.createTextNode(orderFeilds.quantity);
        let priceCellContent = document.createTextNode(orderFeilds.price);
        let amountCellContent = document.createTextNode(orderFeilds.amount);

        indexCell.appendChild(indexCellContent);
        nameCell.appendChild(nameCellContent);
        quantityCell.appendChild(quantityCellContent)
        priceCell.appendChild(priceCellContent)
        amountCell.appendChild(amountCellContent)

    });

    let subTotal = document.getElementById("subtotal");
    let discount = document.getElementById("discount");
    let grandTotal = document.getElementById("grandtotal");

    subTotal.innerText = res.orderBookDetails.sub_total;
    discount.innerText = res.orderBookDetails.discount;
    grandTotal.innerText = res.orderBookDetails.grand_total;
}


window.onload = () => {

    fetch("https://run.mocky.io/v3/16375822-6d22-4d61-b131-6672e9e13884").then(
        (e) => e.json()
    ).then(res=>RenderData(res))


}