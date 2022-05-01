const container = document.querySelector('.grid')

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

