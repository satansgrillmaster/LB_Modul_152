const content = document.getElementById('content');

function fetchData(path) {
    return fetch(path,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
        .then(response => response.json())

}

function initSlider(){
    let products = fetchData('./fixtures/products.json');
    products.then(data => {
        for(let i=0; i < data.length; i++){

            const product = document.createElement('div');
            product.setAttribute('name', data[i].productName)
            product.setAttribute('class', 'product')

            const productImg = document.createElement('img');
            productImg.setAttribute('class', 'productImg')
            productImg.src = data[i].backgroundSrc;


            product.appendChild(productImg);
            content.appendChild(product);
        }
    })
}

initSlider();