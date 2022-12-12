function start(){
    const playButton = document.getElementById("play_button")
    const mainMenu = document.getElementById("main_menu")
    const carachtersSection = document.getElementById("carachters")
    const battle = document.getElementById("battle")
    const gameOver = document.getElementById("game_over")
    const spanPlayerLives = document.getElementById("player_lives")
    const spanEnemyLives = document.getElementById("enemy_lives")
    const singleplayer = document.getElementById("singleplayer")
    const rockButton = document.getElementById("rock")
    const paperButton = document.getElementById("paper")
    const scisorsButton = document.getElementById("scisors")
    const restart = document.getElementById("restart")
    const historyMessages = document.getElementById("history")
    const carachterName = document.getElementById("player_carachter")
    const carachterSelect = document.getElementById("carachter_select")
    const ready = document.getElementById("ready")

    playButton.addEventListener("click", begin)
    singleplayer.addEventListener("click", carachterSelection)
    rockButton.addEventListener("click", rockAttack)
    paperButton.addEventListener("click", paperAttack)
    scisorsButton.addEventListener("click", scisorsAttack)
    restart.addEventListener("click", restartGame)
    ready.addEventListener("click", startDuel)
    
    mainMenu.style.display = "none"
    carachtersSection.style.display = "none"
    battle.style.display = "none"
    gameOver.style.display = "none"

    let paragraph = document.createElement('p')
    let playerLives = 3
    let enemyLives = 3
    let enemyAttack
    let playerAttack
    let carachters = []
    let carachtersSelection

    class Hand{
        constructor(name, skin, id, attack){
            this.name = name
            this.skin = skin
            this.id = id
            this.attack = []
        }
    }

    let saitama = new Hand("Saitama", "css/img/saitama.jpg", "saitama")
    let gohan = new Hand("Gohan", "css/img/gohan.jpg", "gohan")
    let comiste = new Hand("Comiste", "css/img/hand.png", "comiste")

    saitama.attack.push(
        {name: "Piedra", id: "rock"},
        {name: "Papel", id: "paper"},
        {name: "Tijera", id: "scisors"}
    )
    comiste.attack.push(
        {name: "Piedra", id: "rock"},
        {name: "Papel", id: "paper"},
        {name: "Tijera", id: "scisors"}
    )

    carachters.push(saitama, gohan, comiste)

    function begin(){
        playButton.style.display = "none"
        mainMenu.style.display = "flex"
    }
    function carachterSelection(){
        mainMenu.style.display = "none"
        carachtersSection.style.display = "grid"

        carachters.forEach((carachters) => {
            carachtersSelection = `
            <div id="${carachters.id}">
            <input type="radio" name="carachter" id=${carachters.name} />
            <label for="${carachters.name}" class="skin_selector">
                <img src=${carachters.skin} alt=${carachters.name}>
                <p class="skin_p">${carachters.name}</p>
            </label>
            </div>
            `
            
            carachterSelect.innerHTML += carachtersSelection  
        })
    }

    function startDuel(){
        carachtersSection.style.display = "none"
        battle.style.display = "grid"
    }
    
    function rockAttack(){
        playerAttack = "Piedra"
        randomEnemyAttack()
    }
    function paperAttack(){
        playerAttack = "Papel"
        randomEnemyAttack()
    }
    function scisorsAttack(){
        playerAttack = "Tijera"
        randomEnemyAttack()
    }

    function randomEnemyAttack(){
        let randomAttack = random(1, 3)
    
        if(randomAttack == 1){
            enemyAttack = "Piedra"
        }
        else if(randomAttack == 2){
            enemyAttack = "Papel"
        }
        else{
            enemyAttack = "Tijera"
        }
        fight()
    }

    function fight(){
        if(enemyAttack == playerAttack){
            createMessage("Empate")
        }
        else if(playerAttack == "Piedra" && enemyAttack == "Tijera"){
            createMessage("Ganaste")
            enemyLives--
            livesCounter()
        }
        else if(playerAttack == "Papel" && enemyAttack == "Piedra"){
            createMessage("Ganaste")
            enemyLives--
            livesCounter()
        }
        else if(playerAttack == "Tijera" && enemyAttack == "Papel"){
            createMessage("Ganaste")
            enemyLives--
            livesCounter()
        }
        else{
            createMessage("Perdiste")
            playerLives--
            if (playerLives == 2){
                spanPlayerLives.innerHTML = "🖤🧡🧡"
            }
            else if (playerLives == 1){
                spanPlayerLives.innerHTML = "🖤🖤🧡"
            }
            else if (playerLives == 0){
                spanPlayerLives.innerHTML = "🖤🖤🖤"
            }
        }
        livesCheck()
    }

    function livesCounter(){
        if (enemyLives == 2){
            spanEnemyLives.innerHTML = "🖤🧡🧡"
        }
        else if (enemyLives == 1){
            spanEnemyLives.innerHTML = "🖤🖤🧡"
        }
        else if (enemyLives == 0){
            spanEnemyLives.innerHTML = "🖤🖤🖤"
        }
    }

    function createMessage(outcome){
        paragraph.innerHTML = `${outcome}`
        historyMessages.appendChild(paragraph)
    }

    function livesCheck(){
        if(enemyLives == 0){
            createFinalMessage("FELICITACIONES! Ganaste :)")
        }
        else if(playerLives == 0){
            createFinalMessage('Lo siento, perdiste :(')
        }
    }

    function createFinalMessage(finalOutcome){
        paragraph.innerHTML = finalOutcome
        historyMessages.appendChild(paragraph)
        
        rockButton.disabled = true
        paperButton.disabled = true
        scisorsButton.disabled = true
        
        gameOver.style.display = "flex"
    }

    function random(min,max){
        return Math.floor(Math.random()*(max-min+1)+min)
    }

    function restartGame(){
        location.reload()
    }
}
window.addEventListener("load", start)