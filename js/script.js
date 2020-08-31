const player = [0, 1];
const winConditions = ["123", "456", "789", "147", "258", "369", "159", "357"];
const colors = ["red", "green", "blue", "yellow"];
let state, gameState, turn, count, playing;
const DOMs = {
    box: document.querySelector(".box"),
    headerText: document.querySelector(".header__text"),
    restartBtn: document.querySelector(".restart__btn"),
    colorOne: document.querySelector(".box__item--0 select"),
    colorTwo: document.querySelector(".box__item--10 select"),
};
const color = {
    player1: "",
    player2: "",
};
// Disable select box while playing
const selectBoxHandler = (playing) => {
    if (playing) {
        DOMs.colorOne.setAttribute("disabled", "disabled");
        DOMs.colorTwo.setAttribute("disabled", "disabled");
    } else {
        DOMs.colorOne.removeAttribute("disabled");
        DOMs.colorTwo.removeAttribute("disabled");
    }
};

// Initialzing game
const init = () => {
    color.player1 = DOMs.colorOne.value;
    color.player2 = DOMs.colorTwo.value;

    DOMs.colorOne.classList.add(DOMs.colorOne.value);
    DOMs.colorTwo.classList.add(DOMs.colorTwo.value);
    DOMs.headerText.classList.remove(color.player1);
    DOMs.headerText.classList.remove(color.player2);
    DOMs.headerText.classList.add(color.player1);

    count = 0;
    turn = 0;
    gameState = false;
    playing = false;

    state = ["", "", "", "", "", "", "", "", ""];
    DOMs.headerText.textContent = "O Player's Turn";
    selectBoxHandler(playing);
    const squareBoxes = Array.from(document.querySelectorAll(".box__item--square"));
    squareBoxes.forEach((box, index) => {
        box.textContent = index + 1;
        colors.forEach((color) => {
            box.classList.remove(color);
        });
    });
};
init();

const checkResult = (state) => {
    let answer = "";
    for (let i = 0; i < 8; i++) {
        switch (i) {
            case 0:
                answer = `${state[0]}${state[1]}${state[2]}`;
                break;
            case 1:
                answer = `${state[3]}${state[4]}${state[5]}`;
                break;
            case 2:
                answer = `${state[6]}${state[7]}${state[8]}`;
                break;
            case 3:
                answer = `${state[0]}${state[3]}${state[6]}`;
                break;
            case 4:
                answer = `${state[1]}${state[4]}${state[7]}`;
                break;
            case 5:
                answer = `${state[2]}${state[5]}${state[8]}`;
                break;
            case 6:
                answer = `${state[0]}${state[4]}${state[8]}`;
                break;
            case 7:
                answer = `${state[2]}${state[4]}${state[6]}`;
                break;
        }

        if (answer === "OOO") {
            return "O";
        } else if (answer === "XXX") {
            return "X";
        }
    }
    count += 1;

    if (count === 9) {
        return "DRAW";
    } else {
        return "GO";
    }
};

DOMs.box.addEventListener("click", (e) => {
    if (!gameState) {
        const element = e.target;
        const elementId = e.target.dataset.id;
        if (elementId && elementId !== "0" && elementId !== "10") {
            playing = true;
            if (turn === 0) {
                if (element.textContent !== "O" && element.textContent !== "X") {
                    state[+elementId - 1] = "O";

                    element.textContent = "O";
                    element.classList.add(color.player1);
                    let result = checkResult(state);
                    if (result === "O") {
                        DOMs.headerText.textContent = "O Player wins!!!";

                        gameState = true;
                        playing = false;
                    } else if (result === "DRAW") {
                        DOMs.headerText.textContent = "DRAW, Play Again!!!";
                        DOMs.headerText.classList.remove(color.player1);
                        DOMs.headerText.classList.remove(color.player2);
                        gameState = true;
                        playing = false;
                    } else {
                        DOMs.headerText.textContent = "X Player's Turn";
                        DOMs.headerText.classList.remove(color.player1);
                        DOMs.headerText.classList.add(color.player2);

                        turn = 1;
                    }
                }
            } else {
                if (element.textContent !== "O" && element.textContent !== "X") {
                    state[+elementId - 1] = "X";
                    element.textContent = "X";

                    element.classList.add(color.player2);
                    let result = checkResult(state, "X");
                    if (result === "X") {
                        DOMs.headerText.textContent = "X Player wins!!!";

                        gameState = true;
                        playing = false;
                        turn = 0;
                    } else if (result === "DRAW") {
                        DOMs.headerText.textContent = "DRAW, Play Again!!!";
                        DOMs.headerText.classList.remove(color.player1);
                        DOMs.headerText.classList.remove(color.player2);

                        gameState = true;
                        playing = false;
                    } else {
                        DOMs.headerText.textContent = "O Player's Turn";

                        DOMs.headerText.classList.remove(color.player2);
                        DOMs.headerText.classList.add(color.player1);
                        turn = 0;
                    }
                }
            }
        }
        selectBoxHandler(playing);
    }
});
DOMs.box.addEventListener("change", (e) => {
    const id = e.target.closest("div").dataset.id;
    const value = e.target.value;
    const changeSelectBox = (player, selectBox) => {
        DOMs[selectBox].classList.remove(color[player]);
        DOMs.headerText.classList.remove(color[player]);
        color[player] = value;
        DOMs[selectBox].classList.add(color[player]);

        player === "player1" && DOMs.headerText.classList.add(color[player]);
    };
    if (+id === 0) {
        changeSelectBox("player1", "colorOne");
    } else if (+id === 10) {
        changeSelectBox("player2", "colorTwo");
    }
});
DOMs.restartBtn.addEventListener("click", init);
