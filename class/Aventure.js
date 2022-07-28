import { setCookie, getCookie, cE } from './Utils.js'; 
// attention, on appelle la fichier par rapport où se trouve le fichier qui appelle
import Aventurier from './Aventurier.js';
import Guerrier from './Guerrier.js';
import Mage from './Mage.js';
import Voleur from './Voleur.js';
import * as Creation from './MiseEnPlace.js';

// test cration d'un aventurier
let monPerso = new Aventurier('De Zootaumaxime', 'Herbert');

// ajout d'arme
monPerso.ajoutArme('Épée courte', 2);
monPerso.changerArme('Épée courte');

console.log(Creation.fichePerso(monPerso));

let ennemi = new Aventurier('Ferocious', 'Lucius');
ennemi.ajoutArme('Grandes Griffes', 2);

console.log(Creation.fichePerso(ennemi));
ennemi.changerArme('Grandes Griffes');
console.log(Creation.fichePerso(ennemi));

console.log(monPerso.attaquer(ennemi));
console.log(monPerso.attaquer(ennemi));
console.log(monPerso.multi(ennemi));

let monGuerrier = new Guerrier('De Navarre', 'Etienne');
monGuerrier.ajoutArme('Épée Batarde', 3);
monGuerrier.changerArme('Épée Batarde');

console.log(Creation.fichePerso(monGuerrier));
console.log(monGuerrier.attaquer(ennemi));
console.log(monGuerrier.attaquer(ennemi));
//ennemi reprends de la vie
console.log(Creation.ajoutDeVie(ennemi, true, 10, 20));
console.log(monGuerrier.multi(ennemi));

let monMage = new Mage('Coldwater', 'Quentin');
monMage.ajoutArme('Orbe de soutient', 2);
monMage.changerArme('Orbe de soutient');

console.log(Creation.fichePerso(monMage));

console.log(monMage.multi(ennemi));

let monVoleur = new Voleur('Lupin', 'Arsène');
monVoleur.ajoutArme('Canne épée', 2);
monVoleur.changerArme('Canne épée');

console.log(Creation.fichePerso(monVoleur));

console.log(monVoleur.attaquer(ennemi));
console.log(monVoleur.multi(ennemi));

document.querySelector('#createP').addEventListener('click', function(){
    let nom = document.querySelector('#nomP');
    let prenom = document.querySelector('#prenomP');
    let classe = document.querySelector('#classeP');
    let content = '';
    let personnage = Creation.createP(prenom.value, nom.value, classe.value);
    console.log(personnage);
    let divAlert = cE('div', ['class', 'alert alert-warning alert-dismissible fade show'], ['role', 'alert']);
    let strongAlert = cE('strong');
    strongAlert.textContent = 'Attention';
    let messAlert = document.createTextNode('Votre personnage n\'est pas complet');
    let buttonAlert = cE('button', ['class', 'btn-close'], ['data-bs-dismiss', 'alert'], ['aria-label', 'Close']);
    divAlert.append(strongAlert, messAlert, buttonAlert);
    console.log(divAlert);
    if(!personnage){
        content =`
<div class="alert alert-warning alert-dismissible fade show" role="alert">
<strong>Attention</strong> Votre personnage n'est pas complet
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>        
        `;
    }else{
        //content = Creation.fichePersoHTML(personnage);
        Creation.fichePersoHTML(personnage, 'ficheP');
    }
    //document.querySelector('#ficheP').innerHTML = content;
});

document.querySelector('#createE').addEventListener('click', function(){
    let nom = document.querySelector('#nomE');
    let prenom = document.querySelector('#prenomE');
    let classe = Creation.randClasse();
    let content = '';
    let ennemi = Creation.createP(prenom.value, nom.value, classe);
    console.log(ennemi);
    if(!ennemi){
        content =`
<div class="alert alert-warning alert-dismissible fade show" role="alert">
<strong>Attention</strong> Votre ennemi n'est pas complet
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>        
        `;
    }else{
        //content = Creation.fichePersoHTML(ennemi);
        Creation.fichePersoHTML(ennemi, 'ficheE');
    }
    document.querySelector('#ficheE').innerHTML = content;
});

Creation.setListe('#tabArme > thead', '#tabArme > tbody', 'armes');
Creation.setListe('#tabSorts > thead', '#tabSorts > tbody', 'sorts');
Creation.setListe('#tabEquipements > thead', '#tabEquipements > tbody', 'equipements');
//tabEquipements