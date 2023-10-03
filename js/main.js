
const tabs = document.querySelector(".tabs");
const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");

const scrollRight = () => {
    tabs.scrollBy({
        left: tabs.clientWidth / 2,
        behavior: "smooth"
    });

    leftBtn.classList.add("active");
    if (tabs.scrollLeft >= tabs.scrollWidth - tabs.clientWidth - tabs.clientWidth / 2 - 1)
        rightBtn.classList.remove("active");
}

const scrollLeft = () => {
    tabs.scrollBy({
        left: -tabs.clientWidth / 2,
        behavior: "smooth"
    });

    rightBtn.classList.add("active");
    if (tabs.scrollLeft < tabs.clientWidth / 2 + 1)
        leftBtn.classList.remove("active");
}

let clientXStart = 0;
let scrollLeftStart = 0;
let isDragging = false;

const dragStart = e => {
    clientXStart = e.clientX;
    scrollLeftStart = tabs.scrollLeft;
    isDragging = true;
}

const dragEnd = () => {
    isDragging = false;
}

const dragging = e => {

    if (!isDragging)
        return;

    let draggedDistance = e.clientX - clientXStart;
    let newScrollLeft = scrollLeftStart - draggedDistance;
    tabs.scrollLeft = newScrollLeft;

    handleScrollBtns();
}

const handleScrollBtns = (scrollDirection = "unknown") => {

    if (tabs.scrollLeft <= 1)
        leftBtn.classList.remove("active");

    if (tabs.scrollLeft > 1)
        leftBtn.classList.add("active");

    if (tabs.scrollLeft >= tabs.scrollWidth - tabs.clientWidth - 1)
        rightBtn.classList.remove("active");

    if (tabs.scrollLeft < tabs.scrollWidth - tabs.clientWidth - 1)
        rightBtn.classList.add("active");

}


rightBtn.addEventListener("click", scrollRight);
leftBtn.addEventListener("click", scrollLeft);
tabs.addEventListener("mousedown", dragStart);
window.addEventListener("mouseup", dragEnd);
window.addEventListener("mousemove", dragging);