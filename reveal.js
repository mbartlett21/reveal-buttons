// Tabbing functions
function handleFirstTab(e) {
    if (e.keyCode === 9) {
        document.body.classList.add('show-outline');

        window.removeEventListener('keydown', handleFirstTab);
        window.addEventListener('mousedown', handleMouseDownOnce);
    }
}

function handleMouseDownOnce() {
    document.body.classList.remove('show-outline');

    window.removeEventListener('mousedown', handleMouseDownOnce);
    window.addEventListener('keydown', handleFirstTab);
}

window.addEventListener('keydown', handleFirstTab);


// Used for checking if an element is hovered
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

var revealElements = [];

function revealReloadElements() {
    for (var i = 0; i < revealElements.length; i++) {
        var element = revealElements[i].element;
        element.parent.removeChild(element);
    }
    revealElements = [];
    var elements = [];
    elements = Array.prototype.concat.apply(elements, document.getElementsByTagName("button"));
    //elements = Array.prototype.concat.apply(elements, document.getElementsByTagName("li"));
    for (var i = 0; i < elements.length; i++) {
        const element = elements[i];
        const peekElement = document.createElement("div");
        peekElement.classList.add("peek-element");
        element.appendChild(peekElement);
        revealElements.push({
            "element": peekElement,
            "parent": element,
            "list": element.classList.contains("list")
        });
    }
}

revealReloadElements();

function revealUpdateDisplay(event) {
    console.log("updating hover")
    const x = event.clientX;
    const y = event.clientY;
    for (var i = 0; i < revealElements.length; i++) {
        const peekElementData = revealElements[i];
        const peekElement = peekElementData.element;
        const parent = peekElementData.parent;
        const isHover = parent.matches(":hover");
        if ((!isHover && peekElementData.list) || parent.disabled) {
            peekElement.style.display = "none";
            parent.style.setProperty("border-image", "none");
            continue;
        }
        const parentPosition = parent.getBoundingClientRect();
        parent.style.setProperty("border-image", "radial-gradient(circle at " + (x - parentPosition.x) + "px " + (y - parentPosition.y) + "px, " + (isHover ? "#ffffff90" : "#ffffff66") + ", " + ((peekElementData.list || !isHover) ? "#ffffff00 125px" : "#ffffff40 200px") + ") 1 / 1 / 0 stretch");
        if (!isHover) {
            peekElement.style.display = "none";
            continue;
        }
        peekElement.style.left = (x - parentPosition.x) + "px";
        peekElement.style.top = (y - parentPosition.y) + "px";
        peekElement.style.display = "block";
    }

}

function revealClearDisplay(event) {
    console.log("clearing")
    for (var i = 0; i < peekElements.length; i++) {
        peekElements[i].element.style.display = "none";
        peekElements[i].parent.style.setProperty("border-image", "none");
    }
}

document.body.addEventListener("mousemove", revealUpdateDisplay);
document.body.addEventListener("mouseenter", revealUpdateDisplay);
document.body.addEventListener("mouseleave", revealClearDisplay);
