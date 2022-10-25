const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 16;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";

const LOG_EVENT_PLAYER_ATTACK = "PLAYER ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER STRONG ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER HEAL";
const LOG_EVENT_GAME_OVER = "GAME OVER";


const enteredValue = prompt("Enter your starting health.", "100");
let userInputLife = parseInt(enteredValue);

if (isNaN(userInputLife) || userInputLife <= 0) {
    userInputLife = 100;
}

let battleLog = [];
let currentMonsterHealth = userInputLife;
let currentPlayerHealth = userInputLife;
let hasBonusLife = true;

adjustHealthBars(userInputLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
    let logEntry;
    if (ev === LOG_EVENT_PLAYER_ATTACK) {
        logEntry = {
            event: ev,
            value: val,
            target: "Monster",
            finalPlayerHealth: playerHealth,
            finalMonsterHealth: monsterHealth
        };
    } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
        logEntry = {
            event: ev,
            value: val,
            target: "Monster",
            finalPlayerHealth: playerHealth,
            finalMonsterHealth: monsterHealth
        };
    } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
        logEntry = {
            event: ev,
            value: val,
            target: "Player",
            finalPlayerHealth: playerHealth,
            finalMonsterHealth: monsterHealth
        };
    } else if (ev === LOG_EVENT_PLAYER_HEAL) {
        logEntry = {
            event: ev,
            value: val,
            target: "Player",
            finalPlayerHealth: playerHealth,
            finalMonsterHealth: monsterHealth
        };
    } else if (ev === LOG_EVENT_GAME_OVER) {
        logEntry = {
            event: ev,
            value: val,
            finalPlayerHealth: playerHealth,
            finalMonsterHealth: monsterHealth
        };
    }
    battleLog.push(logEntry);
}

function reset() {
    currentMonsterHealth = userInputLife;
    currentPlayerHealth = userInputLife;
    resetGame(userInputLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth);

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert("Phew! you gained a life.");
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You Won!");
        writeToLog(LOG_EVENT_GAME_OVER, "GAME OVER", currentMonsterHealth, currentPlayerHealth);

    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("You almost got it! Try Again.");
        writeToLog(LOG_EVENT_GAME_OVER, "MONSTER WON", currentMonsterHealth, currentPlayerHealth);
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert("It's a draw!");
        writeToLog(LOG_EVENT_GAME_OVER, "A DRAW", currentMonsterHealth, currentPlayerHealth);
    }

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }
}


function attackMonster(mode) {
    let blowDamage;
    let logEvent;
    if (mode === MODE_ATTACK) {
        blowDamage = ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_ATTACK;
    } else if (mode === MODE_STRONG_ATTACK) {
        blowDamage = STRONG_ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    } else {
        alert("You didn't attack!")
    }
    const damage = dealMonsterDamage(blowDamage);
    currentMonsterHealth -= damage;
    writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

function attackHandler() {
    attackMonster(MODE_ATTACK);
}


function strongAttackHandler() {
    attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= userInputLife - HEAL_VALUE) {
        alert("Health can't be above 100");
        healValue = userInputLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }

    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

function printLogHandler() {
    console.log(battleLog)
}

healBtn.addEventListener("click", healPlayerHandler);
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
logBtn.addEventListener("click", printLogHandler);