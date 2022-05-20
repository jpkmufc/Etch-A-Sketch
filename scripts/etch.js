const container = document.querySelector('.grid-container')
addGrid();
let mouseDown = false;
let currentGridSize = 16;

function addGrid(size = 16) {
    let gridElement;
    let gridRow;
    for (let i = 0; i < size; i++) {
        gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');

        for (let i = 0; i < size; i++) {
            gridElement = document.createElement('div');
            gridElement.classList.add('grid-element');
            gridRow.appendChild(gridElement);
        }
        container.appendChild(gridRow);
    }
    const gridElements = document.querySelectorAll('.grid-element');
    gridElements.forEach(item => {
        item.addEventListener('mouseenter', changeElementColor);
    })
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

function resetGrid() {
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = ""
    addGrid(currentGridSize);
}

function flipGridX() {
    let gridStack = [];
    const gridRows = document.querySelectorAll('.grid-row');
    gridRows.forEach(item => {
        gridStack.push(item);
    })
    gridStack.reverse();

    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = "";

    gridStack.forEach(item => {
        gridContainer.appendChild(item);
    });
    
}

function flipGridY() {
    let gridStack = [];
    let gridElements;
    let gridRow;
    const gridRows = document.querySelectorAll('.grid-row');

    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = "";


    gridRows.forEach(row => {
        gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        
        gridElements = row.querySelectorAll('.grid-element')
        gridElements.forEach(element => {
            gridStack.push(element);
        })

        while (gridStack.length > 0) {
            gridRow.appendChild(gridStack.pop());
        }
        gridContainer.appendChild(gridRow);
    });
    
}

function flipDiag() {
    const gridRows = document.querySelectorAll('.grid-row');
    let gridRowsArr = [];
    
    gridRows.forEach(row => {
        gridRowsArr.push(Array.from(row.children));
    })

    const gridSize = gridRowsArr.length;
    let newGridRow;
    let currentRow;

    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = "";


    for (let i = 0; i < gridSize; i++) {
        newGridRow = document.createElement('div');
        newGridRow.classList.add('grid-row');

        for (let j = 0; j < gridSize; j++) {
            newGridRow.appendChild(gridRowsArr[j][i])
        }

        gridContainer.appendChild(newGridRow);
    }
}

function flipDiagRev() {
    const gridRows = document.querySelectorAll('.grid-row');
    let gridRowsArr = [];
    
    gridRows.forEach(row => {
        gridRowsArr.push(Array.from(row.children));
    })

    const gridSize = gridRowsArr.length;
    let newGridRow;
    let currentRow;

    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = "";


    for (let i = 0; i < gridSize; i++) {
        newGridRow = document.createElement('div');
        newGridRow.classList.add('grid-row');

        for (let j = 0; j < gridSize; j++) {
            newGridRow.insertBefore(gridRowsArr[j][i], newGridRow.firstChild)
        }

        gridContainer.insertBefore(newGridRow, gridContainer.firstChild);
    }
}

function processSlider (e) {
    currentGridSize = e.target.valueAsNumber;
    resetGrid();
    const updateText = document.querySelector('.slidecontainer p');
    updateText.innerHTML = `Current grid size is ${currentGridSize}.`
        
}

const resetButton = document.querySelector('.button-reset')
resetButton.addEventListener('click', resetGrid);

const flipxButton = document.querySelector('.button-flipx')
flipxButton.addEventListener('click', flipGridX);

const flipyButton = document.querySelector('.button-flipy')
flipyButton.addEventListener('click', flipGridY);

const flipDiagonal = document.querySelector('.button-flipDiag')
flipDiagonal.addEventListener('click', flipDiag);

const flipDiagonalRev = document.querySelector('.button-flipDiagRev')
flipDiagonalRev.addEventListener('click', flipDiagRev);

const slider = document.getElementById('gridSlider');

slider.addEventListener('change', processSlider);

document.addEventListener('mousedown', () => {mouseDown = true})
document.addEventListener('mouseup', () => {mouseDown = false})
