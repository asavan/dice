function randomInteger(min, max, rngFunc = Math.random) {
    const rand = min + rngFunc() * (max - min);
    return Math.floor(rand);
}

function dice(rngFunc = Math.random) {
    return randomInteger(1, 7, rngFunc);
}

function newDiceHtml(el) {
    const value = dice();
    el.textContent = value;
}

function addSection(document, body) {
    // 1. Создаем элемент <section>
    const section = document.createElement("section");
    section.className = "section"; // Добавляем класс

    // 2. Создаем элемент <span>
    const span = document.createElement("span");
    span.id = "top-num"; // Добавляем id
    span.className = "number-text number-pop"; // Добавляем классы

    // 3. Вкладываем span внутрь section
    section.appendChild(span);

    // 4. Добавляем готовую структуру на страницу (например, в body)
    body.appendChild(section);
}

function createField(document, body, count) {
    for (let i = 0; i < count; i++) {
        addSection(document, body);
    }
}

export default function main(window, document, settings) {
    // State tracker for background color (true = Yellow, false = Red)
    let isYellow = true;

    const bodyElement = document.getElementById("app-body");
    createField(document, bodyElement, settings.diceCount);

    // Function to update screen state with independent random numbers
    function updateScreen() {
        const dices = document.querySelectorAll(".number-text");
        for (const d of dices) {
            newDiceHtml(d);
        }
        bodyElement.classList.toggle("bg-red-active", !isYellow);
    }

    // Click handler to switch background state and update numbers
    function handleClick() {
        isYellow = !isYellow;
        updateScreen();
    }

    // Listen for clicks anywhere on screen
    document.addEventListener("click", handleClick);

    updateScreen();
}
