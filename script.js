let rulesButton = document.getElementById("rules_link")
let closeRulesButton = document.getElementsByClassName("close")[0]
let gameMode = 0, limiteChoixMaison = gameMode === 1 ? 3 : 5;//Si 0 mode classique sinon mode bonus on défini les picks possible
let game_result = document.getElementById("game_result")//contient l'affichage des résultats
let scoreContain = document.getElementById("score");
let score = localStorage.getItem("scoreTriangle") != null ? parseInt(localStorage.getItem("scoreTriangle"),10) : 0
let restart_btn_normal = document.getElementById("reload_normal");
//contient l'espace de jeu
let contain_game = ["contain_game_triangle", "contain_game_pentagon"];
//PickImages doit être dans le même ordre que le switch(choixUtilsateur)
let pickImages = ["icon-paper.svg", "icon-rock.svg", "icon-scissors.svg", "icon-lizard.svg", "icon-spock.svg"];
let pathImages = "./images/";
function houseChoice(max) {
    let value = Math.floor(Math.random() * max)
    return value;
}
function verifGagnant(choixUtilisateur, choixMaison) {
    let resultat = 0

    if (choixUtilisateur < 0 || choixUtilisateur > 4 || choixMaison < 0 || choixMaison > 4) {
        alert("Problème avec le jeu")
    }
    if (choixUtilisateur != choixMaison) {
        switch (choixUtilisateur) {
            case (0)://Paper
                choixMaison === 2 ? resultat = -1 : choixMaison === 3 ? resultat = -1 : resultat = 1
                break;
            case (1)://Rock
                choixMaison === 0 ? resultat = -1 : choixMaison === 4 ? resultat = -1 : resultat = 1
                break;
            case (2)://Scissors
                choixMaison === 1 ? resultat = -1 : choixMaison === 4 ? resultat = -1 : resultat = 1
                break;
            case (3)://Lizard
                choixMaison === 1 ? resultat = -1 : choixMaison === 2 ? resultat = -1 : resultat = 1
                break;
            case (4)://Spock
                choixMaison === 0 ? resultat = -1 : choixMaison === 3 ? resultat = -1 : resultat = 1
                break;
        }
    }
    return resultat;
}
function imageResultat(idElementAModifier, choix, pick, resultat) {
    idElementAModifier.setAttribute("src", `${pathImages + pick}`);
    idElementAModifier.parentElement.classList.add(`${choix}`)

    if (resultat != undefined) {
        let text = ""
        resultat === -1 ? text = "YOU LOSE" : resultat === 0 ? text = "DRAW" : text = "YOU WIN"
        document.getElementById("text_result").innerHTML = text
    }
}
function afficheScore(score) {
    scoreContain.innerHTML = score
}
function reload(choixJoueur, choixMaisonString) {
    resultat = "";
    choixUtilisateur = "";
    choixMaison = "";
    document.getElementById(contain_game[gameMode]).style.display = "flex"
    game_result.style.display = "none"
    document.getElementById("playerChoice").setAttribute("src", "")
    document.getElementById("houseChoice").setAttribute("src", "")
    document.getElementById("playerChoice").parentElement.classList.remove(choixJoueur)
    document.getElementById("houseChoice").parentElement.classList.remove(choixMaisonString)
    document.getElementById("change_game").style.display = "block"
}
function choixJeu() {
    gameMode === 0 ? document.getElementById(contain_game[1]).style.display = "none" : document.getElementById(contain_game[0]).style.display = "block"
    gameMode === 0 ? document.getElementById(contain_game[0]).style.display = "block" : document.getElementById(contain_game[0]).style.display = "none"
    gameMode === 1 ? document.getElementById(contain_game[0]).style.display = "none" : document.getElementById(contain_game[1]).style.display = "block"
    gameMode === 1 ? document.getElementById(contain_game[1]).style.display = "block" : document.getElementById(contain_game[1]).style.display = "none"
    if (gameMode === 1) {
        score = localStorage.getItem("scorePentagon") != null ? parseInt(localStorage.getItem("scorePentagon"),10) : 0
        document.getElementById("game_name").style.fontSize = "140%";
        document.getElementsByClassName("game_name_hidden")[0].style.display = "block"
        document.getElementsByClassName("game_name_hidden")[1].style.display = "block"
    }
    else {
        score = localStorage.getItem("scoreTriangle") != null ? parseInt(localStorage.getItem("scoreTriangle"),10) : 0
        document.getElementsByClassName("game_name_hidden")[0].style.display = "none"
        document.getElementsByClassName("game_name_hidden")[1].style.display = "none"   
    }
     afficheScore(score)
}

afficheScore(score)
/* Ouverture / Fermeture des règles du jeu.*/
document.getElementById("reset_score").addEventListener("click",()=>{
    if(gameMode===1){localStorage.removeItem("scorePentagon")}
    else{localStorage.removeItem("scoreTriangle")}
    score=0
    afficheScore(score)
})
rulesButton.addEventListener("click", () => {
    let image = ""
    gameMode === 1 ? image = "./images/image-rules-bonus.svg" : image = "./images/image-rules.svg";
    document.getElementById("rules_img").setAttribute("src", image)
    document.getElementById("rules").style.display = "flex"
}
);
closeRulesButton.addEventListener("click", () => document.getElementById("rules").style.display = "none"
)
document.getElementById("change_game").addEventListener("click", () => { gameMode === 0 ? gameMode = 1 : gameMode = 0; choixJeu() })
choixJeu();
/* Récupération choix utilisateur + calcul résultat */
let buttonChoices = document.getElementsByClassName("possibility")
let listChoices = [];
choixJeu()
for (let i = 0; i < buttonChoices.length; i++) {
    listChoices[i] = buttonChoices[i].classList[1]
    buttonChoices[i].addEventListener("click", () => {

        let choixUtilisateur = listChoices[i]
        switch (choixUtilisateur) {
            case ("paper"):
                choixUtilisateur = 0
                break;
            case ("rock"):
                choixUtilisateur = 1
                break;
            case ("scissors"):
                choixUtilisateur = 2
                break;
            case ("lizard"):
                choixUtilisateur = 3
                break;
            case ("spock"):
                choixUtilisateur = 4
                break;
        }

        let choixMaison = houseChoice(3)
        let resultat = verifGagnant(parseInt(choixUtilisateur, 10), choixMaison)
        if (resultat < -1 || resultat > 1) {

            alert("Problème avec la vérification des résultats")
        }
        else {
            afficheScore(score += resultat)
            if(gameMode===1){
                localStorage.setItem("scorePentagon",score)
            }
            else
            {
                localStorage.setItem("scoreTriangle",score)
            }
            document.getElementById("result").style.display="none"
            document.getElementById([contain_game[gameMode]]).style.display = "none"
            game_result.style.display = "flex"
            document.getElementsByClassName("element_game_no_img")[0].style.display="flex"
            document.getElementById("change_game").style.display = "none"

            switch (choixMaison) {
                case (0):
                    choixMaisonString = "paper"
                    break;
                case (1):
                    choixMaisonString = "rock";
                    break;
                case (2):
                    choixMaisonString = "scissors";
                    break;
                case (3):
                    choixMaisonString = "lizard";
                    break;
                case (4):
                    choixMaisonString = "spock"
                    break;
            }

            document.getElementById("houseChoice").parentElement.style.display="none"
            imageResultat(document.getElementById("playerChoice",), listChoices[i], pickImages[choixUtilisateur])
            setTimeout(()=>{
                document.getElementsByClassName("element_game_no_img")[0].style.display="none";
                document.getElementById("houseChoice").parentElement.style.display="flex";
                setTimeout(()=>{
                document.getElementById("result").style.display="flex";
            },500)
               },1000)
               imageResultat(document.getElementById("houseChoice"), choixMaisonString, pickImages[choixMaison]
               , resultat)
            restart_btn_normal.addEventListener("click", () => reload(listChoices[i], choixMaisonString));
        }
    })

}