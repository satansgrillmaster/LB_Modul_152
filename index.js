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
            product.setAttribute('id', 'product')
            product.setAttribute('class', 'product')
            product.style.backgroundImage = "url('" + data[i].backgroundSrc + "')";

            const clickPosGpu = document.createElement('div');
            clickPosGpu.setAttribute('class', 'click-pos');

            clickPosGpu.style.width = data[i].canvas.gpu.width;
            clickPosGpu.style.height = data[i].canvas.gpu.height;
            clickPosGpu.style.marginLeft = data[i].canvas.gpu.offsetX;
            clickPosGpu.style.marginTop = data[i].canvas.gpu.offsetY;
            clickPosGpu.style.backgroundColor = "rgba(0, 0, 255, 0.5)";
            clickPosGpu.addEventListener('click', () => {
                onComponentClick(1, data[i])
            })

            const clickPosCPU = document.createElement('div');
            clickPosCPU.setAttribute('class', 'click-pos');

            clickPosCPU.style.width = data[i].canvas.cpu.width;
            clickPosCPU.style.height = data[i].canvas.cpu.height;
            clickPosCPU.style.marginLeft = data[i].canvas.cpu.offsetX;
            clickPosCPU.style.marginTop = data[i].canvas.cpu.offsetY;
            clickPosCPU.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
            clickPosCPU.addEventListener('click', () => {
                onComponentClick(2, data[i])
            })


            const clickPosSSD = document.createElement('div');
            clickPosSSD.setAttribute('class', 'click-pos');

            clickPosSSD.style.width = data[i].canvas.ssd.width;
            clickPosSSD.style.height = data[i].canvas.ssd.height;
            clickPosSSD.style.marginLeft = data[i].canvas.ssd.offsetX;
            clickPosSSD.style.marginTop = data[i].canvas.ssd.offsetY;
            clickPosSSD.style.backgroundColor = "rgba(150, 150, 150, 0.7)";
            clickPosSSD.addEventListener('click', () => {
                onComponentClick(3, data[i])
            })


            content.appendChild(product);
            product.appendChild(clickPosGpu);
            product.appendChild(clickPosCPU);
            product.appendChild(clickPosSSD);

            break;
        }
    })
}

function onComponentClick(componentType, data){

    if(componentType === 1){
        generateSpecificationDiv(1, data.canvas.gpu);
    }
    else if (componentType === 2){
        generateSpecificationDiv(2, data.canvas.cpu);
    }
    else {
        generateSpecificationDiv(3, data.canvas.ssd);
    }
}

function generateSpecificationDiv(componentType, data){

    let product = document.getElementById('product');
    product.hidden = true;

    let specificationDiv = document.createElement('div');
    specificationDiv.setAttribute('id', 'specificationDiv');
    specificationDiv.setAttribute('class', 'specification');
    specificationDiv.style.backgroundImage  = "url('" + data.imgSrc + "')";

    let specificationDescription = document.createElement('div');
    specificationDescription.style.width = "200px"
    specificationDescription.style.height = "300px"
    specificationDescription.style.backgroundColor = "rgba(255, 255, 255, 0.5)"

    if (componentType === 1){
        var fanCanvas = document.createElement('canvas');
        fanCanvas.style.width = "200px"
        fanCanvas.style.height = "200px"
        fanCanvas.style.backgroundColor = "yellow"
    }

    content.appendChild(specificationDiv);
    specificationDiv.appendChild(fanCanvas)
    specificationDiv.appendChild(specificationDescription);
}

initSlider();