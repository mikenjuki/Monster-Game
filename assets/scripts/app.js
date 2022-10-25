const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 16;

let userInputLife = 100;
let currentMonsterHealth = userInputLife;
let currentPlayerHealth = userInputLife;

adjustHealthBars(userInputLife);


function endRound() {
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You Won!");
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("You almost got it! Try Again.");
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert("It's a draw!");
    }
}


function attackMonster(mode) {
    let blowDamage;
    if (mode === "ATTACK") {
        blowDamage = ATTACK_VALUE;
    } else if (mode === "STRONG_ATTACK") {
        blowDamage = STRONG_ATTACK_VALUE;
    } else {
        alert("You didn't attack!")
    }
    const damage = dealMonsterDamage(blowDamage);
    currentMonsterHealth -= damage;
    endRound();
}

function attackHandler() {
    attackMonster("ATTACK");
}


function strongAttackHandler() {
    attackMonster("STRONG_ATTACK");
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
    endRound();
}



healBtn.addEventListener("click", healPlayerHandler);
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);