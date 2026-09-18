function randomInteger(min, max, rngFunc = Math.random) {
    const rand = min + rngFunc() * (max - min);
    return Math.floor(rand);
}

function dice(rngFunc = Math.random) {
    return randomInteger(1, 7, rngFunc);
}

export default function main(window, document) {
    // State tracker for background color (true = Yellow, false = Red)
    let isYellow = true;

    const bodyElement = document.getElementById("app-body");
    const topNumElement = document.getElementById("top-num");
    const bottomNumElement = document.getElementById("bottom-num");

    // Function to update screen state with independent random numbers
    function updateScreen() {
        // Независимая генерация случайного числа (1-6) для каждой половины
        const topValue = dice();
        const bottomValue = dice();

        topNumElement.textContent = topValue;
        bottomNumElement.textContent = bottomValue;

        // Визуальный отклик при клике (анимация)
        topNumElement.classList.remove("number-pop");
        bottomNumElement.classList.remove("number-pop");
        void topNumElement.offsetWidth; // Перерисовать элемент
        topNumElement.classList.add("number-pop");
        bottomNumElement.classList.add("number-pop");

        if (isYellow) {
            bodyElement.classList.remove("bg-red-active");
            bodyElement.classList.add("bg-yellow-active");
        } else {
            bodyElement.classList.remove("bg-yellow-active");
            bodyElement.classList.add("bg-red-active");
        }
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
