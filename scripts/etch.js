const container = document.querySelector('.container')
addGrid();

function addGrid(size = 16) {
    size = Math.sqrt(size) % 1 === 0 ? size : 16;
    const sideLength = Math.sqrt(size);
    let gridElement;
    let gridRow;
    for (let i = 0; i < sideLength; i++) {
        gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');

        for (let i = 0; i < sideLength; i++) {
            gridElement = document.createElement('div');
            gridElement.classList.add('grid-element');
            gridRow.appendChild(gridElement);
        }
        container.appendChild(gridRow);
    }
}

function assignColorFromArray (color) {
    return `rgba(${color.join(',')})`;
}

function setColorsTenPercentDarker(color) {
    let newColor = [];
    color.forEach(hue => {
        newColor.push(Math.floor(hue * .9));
    })
    return assignColorFromArray(newColor);
}

function generateRandomColor () {
    var rgb = []

    for(let i = 0; i < 3; i++) {
        rgb.push(Math.floor(Math.random() * 255))
    }

    return assignColorFromArray(rgb);
}


function changeElementColor (e) {
    const targetElement = e.target;
    let pases;
    let newColor;
    if(targetElement.hasAttribute('data-passes')) {
        passes = parseInt(targetElement.dataset.passes) + 1
        let colors = targetElement.style.backgroundColor
            .replace('rgb', '')
            .replace('(', '')
            .replace(')', '')
            .split(',')
            .map(hue => parseInt(hue));
        newColor = setColorsTenPercentDarker(colors);
    }
    else {
        passes = 1;
        newColor = generateRandomColor();
    }
    targetElement.dataset.passes = passes;
    targetElement.style.backgroundColor = newColor;
}
const gridElements = document.querySelectorAll('.grid-element');
gridElements.forEach(item => {
    item.addEventListener('mouseenter', changeElementColor);
})
