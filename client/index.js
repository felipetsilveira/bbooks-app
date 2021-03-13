document.addEventListener('DOMContentLoaded', function() {
    // Chamada assíncrona para dispôr os dados a serem tratados no front 
    fetch('http://localhost:5000/books')
        .then(res => res.json())
        .then(data => loadHtmlData(data['data']))
})

const sendData = document.querySelector('#send-data')

sendData.onclick = function() {
  const isbn = document.querySelector('#input-isbn').value
  const title = document.querySelector('#input-title').value
  const subtitle = document.querySelector('#input-subtitle').value
  const summary = document.querySelector('#input-summary').value
  const price = document.querySelector('#input-price').value

  fetch('http://localhost:5000/insert', {
    headers: {
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ isbn : isbn, title : title, subtitle : subtitle, summary : summary, price: price  })
  })
    .then(res => res.json())
    .then(data => dataInsert(data['data']))

    window.location.reload
    
}

function dataInsert(data) {

}

function loadHtmlData(data) {
    let itemsHTML = document.querySelector('#books')
    
    if(data.length === 0) {
        itemsHTML.innerHTML = 'Sem itens para mostrar'
    }
    
    // Optei por carregar as informacoes para serem somente chamadas por um evento

    let itensMap = data.map(item => item)
    for(let item of itensMap) {
        itemsHTML.innerHTML += `<button class="accordion" id="a${item.id}">${item.title} <i class="fas fa-caret-down"></i></button>`
        itemsHTML.innerHTML += `<div class="panel-class"><ul><li>Título: ${item.title}</li><li>Subtítulo: ${item.subtitle}</li>
            <li>Resumo: ${item.summary}</li><li>Preço: R$ ${item.price}</li><li>Isbn: ${item.isbn}</li></ul></div>`
    }

    // Aqui, fiz um accordion simples para mostrar as informações dos livros 
    
    var accordion = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < accordion.length; i++) {
        accordion[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          // Controlando a visualização dos elementos pelas classes
          if (panel.style.display === "block") { 
            panel.style.display = "none";
          } else {
            panel.style.display = "block";
          }
        });
    }
}


