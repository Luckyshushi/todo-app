function itemTemplate(item){
    return`<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                    <span class="item-text" style="font-size: 30px; font-family: Calibri,sans-serif;">${item.text}</span>
                    <div>
                        <button data-id="${item._id}" class="edit-me btn btn-sm mr-1">
                            <img src="https://image.flaticon.com/icons/svg/481/481874.svg" alt="nothing" 
                            style="width: 30px;
                                   height: 30px;
                                   display: inline-block;">
                        </button>
                        <button data-id="${item._id}" class="delete-me btn ">
                            <img src="https://image.flaticon.com/icons/svg/1214/1214428.svg" alt="nothing" 
                            style="width: 30px;
                                   height: 30px;
                                   display: inline-block;">
                        </button>
                    </div>
                </li>`
}

//Create feature
let createField = document.getElementById('create-field');
document.getElementById('create-form').addEventListener('submit',function (e) {
    e.preventDefault();
    axios.post('/create-item', {text: createField.value}).then(function (response) {
        document.getElementById('item-list').insertAdjacentElement('beforeend', itemTemplate(response.data));
        createField.value = "";
        createField.focus()
    }).catch(function () {
        console.log('try again')
    })
});

document.addEventListener('click', function (e) {
  //Delete Feature
    if (e.target.classList.contains('delete-me')){
        if(confirm("Ok")){
            axios.post('/delete-item', {id:e.target.getAttribute('data-id')}).then(function () {
                e.target.parentElement.parentElement.remove()
            }).catch(function () {
                console.log('try again')
            })
        }
    }

   //Update feature
    if (e.target.classList.contains('edit-me')){
       let userInput = prompt('Enter your desired new text', e.target.parentElement.parentElement.querySelector(".item-text").innerHTML);
       if (userInput){
           axios.post('/update-item', {text:userInput, id:e.target.getAttribute('data-id')}).then(function () {
               e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
           }).catch(function () {
               console.log('try again')
           })
       }
    }
});