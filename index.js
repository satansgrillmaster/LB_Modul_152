const content = document.getElementById('content');

function fetchData(path) {
    return fetch(path, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => response.json())

}

function initSlider() {
    let products = fetchData('./fixtures/products.json');

    const slideButtonContainer = document.createElement('div');
    slideButtonContainer.setAttribute('id', 'slide-container');

    const slideButtonForward = document.createElement('button');
    slideButtonForward.setAttribute('class', 'slide-button');
    slideButtonForward.addEventListener('click', () => {
        slide('forward');
    })

    const slideButtonBackward = document.createElement('button');
    slideButtonBackward.setAttribute('class', 'slide-button');
    slideButtonBackward.addEventListener('click', () => {
        slide('backward');
    })

    slideButtonContainer.appendChild(slideButtonForward);
    slideButtonContainer.appendChild(slideButtonBackward);

    products.then(data => {
        for (let i = 0; i < data.length; i++) {

            const product = document.createElement('div');
            product.setAttribute('name', 'product')
            product.setAttribute('id', 'product_' + data[i].pk.toString())
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
            });


            const clickPosSSD = document.createElement('div');
            clickPosSSD.setAttribute('class', 'click-pos');

            clickPosSSD.style.width = data[i].canvas.ssd.width;
            clickPosSSD.style.height = data[i].canvas.ssd.height;
            clickPosSSD.style.marginLeft = data[i].canvas.ssd.offsetX;
            clickPosSSD.style.marginTop = data[i].canvas.ssd.offsetY;
            clickPosSSD.style.backgroundColor = "rgba(150, 150, 150, 0.7)";
            clickPosSSD.addEventListener('click', () => {
                onComponentClick(3, data[i])
            });

            content.appendChild(product);
            product.appendChild(clickPosGpu);
            product.appendChild(clickPosCPU);
            product.appendChild(clickPosSSD);
            content.appendChild(slideButtonContainer);

            if (i > 0) {
                product.hidden = true;
            }

            //break;
        }
    })
}

function slide(direction) {
    var actProduct = null;
    var newProduct = null;

    var products = document.getElementsByName('product');
    for (let i = 0; i < products.length; i++) {
        if (products[i].hidden === false) {
            actProduct = products[i];
        }
    }

    if (direction === 'forward') {

        if (actProduct.id === 'product_1') {
            newProduct = document.getElementById('product_2');
            actProduct.hidden = true;
            newProduct.hidden = false;
        } else if (actProduct.id === 'product_2') {
            newProduct = document.getElementById('product_3');
            actProduct.hidden = true;
            newProduct.hidden = false;
        } else if (actProduct.id === 'product_3') {
            newProduct = document.getElementById('product_1');
            actProduct.hidden = true;
            newProduct.hidden = false;
        }
    } else {
        if (actProduct.id === 'product_1') {
            newProduct = document.getElementById('product_3');
            actProduct.hidden = true;
            newProduct.hidden = false;
        } else if (actProduct.id === 'product_2') {
            newProduct = document.getElementById('product_1');
            actProduct.hidden = true;
            newProduct.hidden = false;
        } else if (actProduct.id === 'product_3') {
            newProduct = document.getElementById('product_2');
            actProduct.hidden = true;
            newProduct.hidden = false;
        }
    }
}

function onComponentClick(componentType, data) {

    if (componentType === 1) {
        generateSpecificationDiv(1, data);
    } else if (componentType === 2) {
        generateSpecificationDiv(2, data);
    } else if (componentType === 3) {
        generateSpecificationDiv(3, data);
    }
}

function generateSpecificationDiv(componentType, data) {

    let product = document.getElementById('product_' + data.pk.toString());
    product.hidden = true;

    let specificationDiv = document.createElement('div');
    specificationDiv.setAttribute('name', 'specificationDiv');
    specificationDiv.setAttribute('id', 'specificationDiv_' + data.pk.toString());
    specificationDiv.setAttribute('class', 'specification');


    let specificationDescription = document.createElement('div');
    specificationDescription.style.width = "200px"
    specificationDescription.style.height = "300px"
    specificationDescription.style.backgroundColor = "rgba(255, 255, 255, 0.5)"

    content.appendChild(specificationDiv);

    if (componentType === 1) {

        specificationDiv.style.backgroundImage = "url('" + data.canvas.gpu.imgSrc + "')";

        var image = document.getElementById('fanImg');

        var fanCanvas = document.createElement('canvas');
        fanCanvas.setAttribute('id', 'canvas')
        fanCanvas.style.width = image.width.toString() * 2 + 'px'
        fanCanvas.style.height = image.height.toString() + 'px';
        fanCanvas.style.marginTop = "76px"
        fanCanvas.style.marginRight = "64px"

        fanCanvas.getBoundingClientRect();

        var ctx = fanCanvas.getContext('2d');
        ctx.clearRect(0, 0, fanCanvas.width, fanCanvas.height);
        ctx.save();
        ctx.drawImage(image, fanCanvas.width / 2 - image.width / 2, fanCanvas.height / 2 - image.height / 2);
        setTimeout(rotateGpuFan, 1000)
        specificationDiv.appendChild(fanCanvas)

    } else if (componentType === 2) {
        specificationDiv.style.backgroundImage = "url('" + data.canvas.cpu.imgSrc + "')";
    } else if (componentType === 3) {
        specificationDiv.style.backgroundImage = "url('" + data.canvas.ssd.imgSrc + "')";
    }
    specificationDiv.appendChild(specificationDescription);

    content.addEventListener('dblclick', () => {
        let specificationDiv = document.getElementById('specificationDiv_' + data.pk.toString())
        let product = document.getElementById('product_' + data.pk.toString())
        specificationDiv.remove()
        product.hidden = false;
    })
}

function rotateGpuFan() {

    const canvas = document.getElementById('canvas');
    var image = document.getElementById('fanImg');
    image.src = 'media/img/GPU_1_fan.png';

    if (canvas !== null){
        const ctx = canvas.getContext('2d');
        // Matrix transformation
        ctx.translate(150, 75);
        ctx.rotate(Math.PI / 2);
        ctx.translate(-150, -75);

// Rotated rectangle
        ctx.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2);

        setTimeout(rotateGpuFan, 15)
    }
    else {
        return;
    }


}

initSlider();

