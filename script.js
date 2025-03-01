let selectedWire = null;
let connections = [];
const colors = ["red", "blue", "green", "yellow"];

function randomPosition(existingPositions) {
    let position;
    do {
        position = 50 + Math.random() * 250;
    } while (existingPositions.some(p => Math.abs(p - position) < 60));
    existingPositions.push(position);
    return position;
}

function createWires() {
    const leftContainer = document.getElementById("left-wires");
    const rightContainer = document.getElementById("right-wires");
    leftContainer.innerHTML = "";
    rightContainer.innerHTML = "";
    
    let leftPositions = [];
    let rightPositions = [];

    colors.forEach(color => {
        const leftWire = document.createElement("div");
        leftWire.classList.add("wire", color);
        leftWire.dataset.color = color;
        leftWire.style.top = randomPosition(leftPositions) + "px";
        leftWire.style.left = "10px";
        leftContainer.appendChild(leftWire);

        const rightWire = document.createElement("div");
        rightWire.classList.add("wire", color);
        rightWire.dataset.color = color;
        rightWire.style.top = randomPosition(rightPositions) + "px";
        rightWire.style.right = "10px";
        rightContainer.appendChild(rightWire);
    });

    document.querySelectorAll('.wire').forEach(wire => {
        wire.addEventListener('click', function() {
            if (!selectedWire) {
                selectedWire = this;
            } else {
                if (selectedWire.parentNode !== this.parentNode) {
                    drawLine(selectedWire, this);
                    connections.push({from: selectedWire.dataset.color, to: this.dataset.color});
                    selectedWire = null;
                }
            }
        });
    });
}

function drawLine(start, end) {
    const svg = document.getElementById('connections');
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    const startRect = start.getBoundingClientRect();
    const endRect = end.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();
    
    line.setAttribute("x1", startRect.left + startRect.width / 2 - svgRect.left);
    line.setAttribute("y1", startRect.top + startRect.height / 2 - svgRect.top);
    line.setAttribute("x2", endRect.left + endRect.width / 2 - svgRect.left);
    line.setAttribute("y2", endRect.top + endRect.height / 2 - svgRect.top);
    line.setAttribute("stroke", start.dataset.color);
    
    svg.appendChild(line);
}

function checkConnections() {
    const correctConnections = colors.map(color => ({from: color, to: color}));
    if (JSON.stringify(connections.sort((a, b) => a.from.localeCompare(b.from))) === JSON.stringify(correctConnections.sort((a, b) => a.from.localeCompare(b.from)))) {
        document.getElementById("result").innerText = "Вы выиграли! Код: 7482";
    } else {
        document.getElementById("result").innerText = "Ошибка! Попробуйте снова.";
        document.getElementById("connections").innerHTML = "";
        connections = [];
    }
}

createWires();
