const content = document.getElementById('content');

function fetchData(path) {
    return fetch(
        path,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
        .then(response => response.json())

}

function initSlider() {
    let products = fetchData('./fixtures/products.json');
    products.then(data => {
        for (let i = 0; i < data.length; i++) {

            const product = document.createElement('div');
            product.setAttribute('name', data[i].productName)
            product.setAttribute('class', 'product')
            product.style.backgroundImage = "url('" + data[i].backgroundSrc + "')";

            const clickPosGpu = document.createElement('div');
            clickPosGpu.setAttribute('class', 'click-pos');

            clickPosGpu.style.marginLeft = data[i].canvas.gpu.offsetX;
            clickPosGpu.style.marginTop = data[i].canvas.gpu.offsetY;
            clickPosGpu.style.backgroundColor = "blue";
            clickPosGpu.addEventListener('click', () => {
                onComponentClick(1)
            })

            const clickPosCPU = document.createElement('div');
            clickPosCPU.setAttribute('class', 'click-pos');

            clickPosCPU.style.marginLeft = data[i].canvas.cpu.offsetX;
            clickPosCPU.style.marginTop = data[i].canvas.cpu.offsetY;
            clickPosCPU.style.backgroundColor = "yellow";
            clickPosCPU.addEventListener('click', () => {
                onComponentClick(2)
            })


            const clickPosSSD = document.createElement('div');
            clickPosSSD.setAttribute('class', 'click-pos');

            clickPosSSD.style.marginLeft = data[i].canvas.ssd.offsetX;
            clickPosSSD.style.marginTop = data[i].canvas.ssd.offsetY;
            clickPosSSD.style.backgroundColor = "grey";
            clickPosSSD.addEventListener('click', () => {
                onComponentClick(3)
            })




            content.appendChild(product);
            product.appendChild(clickPosGpu);
            product.appendChild(clickPosCPU);
            product.appendChild(clickPosSSD);

            break;
        }
    })
}

function onComponentClick(componentType){

    if(componentType === 1){
        alert("Bild 1")
    }
    else if (componentType === 2){
        alert("Bild 2")
    }
    else {
        alert("Bild 3")
    }
}

initSlider();