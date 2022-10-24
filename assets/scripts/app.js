const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;

let userInputLife = 100;
let currentMonsterHealth = userInputLife;
let currentPlayerHealth = userInputLife;



adjustHealthBars(userInputLife);

attackBtn.addEventListener("click", attackHandler);

function attackHandler() {
    const damage = dealMonsterDamage(ATTACK_VALUE);
    currentMonsterHealth -= damage;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You Won!");
    } else if (currentPlayerHealth <=0 && currentMonsterHealth > 0) {
        alert("You almost got it! Try Again.");
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert("It's a draw!");
    }
}