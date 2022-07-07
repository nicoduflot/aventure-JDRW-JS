import { setCookie, getCookie, cE, loaded, s, sAll } from './Utils.js'; 
import Aventurier from './Aventurier.js';
import Guerrier from './Guerrier.js';
import Mage from './Mage.js';
import Voleur from './Voleur.js';

let tabClasse = ['Aventurier', 'Guerrier', 'Mage', 'Voleur'];

export function randClasse(){
    let maxIndiceTabClasse = tabClasse.length - 1;
    let randClasse = Math.floor( Math.random()*maxIndiceTabClasse );
    return tabClasse[randClasse];
}

export function createP(prenom, nom, classe){
    if('' !== prenom && '' !== nom && '' !== classe){
        let personnage = null;
        switch(classe){
            case('Guerrier'):
            personnage = new Guerrier(nom, prenom);
            break;
            case('Mage'):
                personnage = new Mage(nom, prenom);
            break;
            case('Voleur'):
            personnage = new Voleur(nom, prenom);
            break;
            case('Aventurier'):
            default:
                personnage = new Aventurier(nom, prenom);
        }
        return personnage;
    }else{
        return false;
    }
}

export function ajoutDeVie(personnage, random = true, min = 5, max = 10, evenement = 'TGCM'){
    let pvRendu = 0;
    let valDif = max - min;
    
    if(random){
        pvRendu = Math.floor(Math.random()*valDif + min);
    }else{
        pvRendu = min;
    }
    personnage.setPvActuel(personnage.pvActuel + pvRendu);
    return `
${personnage.prenom} a récupéré ${pvRendu} PV suite à ${evenement}
Il a maintenant ${personnage.pvActuel} PV`;
}

export function fichePersoHTML(personnage){
    let tabPerso = cE('table', ['class', 'table']);
    /* créer le thead */
    let tabPersoThead = cE('thead');
    let tabPersoTrHead = cE('tr');
    let tabPersoThNom = cE('th');
    tabPersoThNom.textContent = 'Nom :';
    let tabPersoThPrenom = cE('th');
    tabPersoThPrenom.textContent = 'Prénom :';
    let tabPersoThClasse = cE('th');
    tabPersoThClasse.textContent = 'Classe :';
    tabPersoTrHead.append(tabPersoThNom, tabPersoThPrenom, tabPersoThClasse);
    tabPersoThead.append(tabPersoTrHead);

    /* créer le tbody */
    let tabPersoTBody = cE('tbody');
    /* ligne nom, prénom, classe */
    let tabPersoTrTBody = cE('tr');
    let tabPersoTBodyTdNom = cE('td');
    tabPersoTBodyTdNom.textContent =  personnage.nom;
    let tabPersoTBodyTdPrenom = cE('td');
    tabPersoTBodyTdPrenom.textContent = personnage.prenom;
    let tabPersoTBodyTdClasse = cE('td');
    tabPersoTBodyTdClasse.textContent = 'Classe :';
    tabPersoTrTBody.append(tabPersoTBodyTdNom, tabPersoTBodyTdPrenom, tabPersoTBodyTdClasse);
    tabPersoTBody.append(tabPersoTrTBody);
    /* ligne boutons d'action attaquer et soigner */
    let tabPersoTrAction = cE('tr');
    let tabPersoTActionTdattaque = cE('td');
    let attaqueButton = cE('button', ['data-action', 'attaque'], ['disabled', 'disabled']);
    attaqueButton.textContent = 'Attaquer'
    tabPersoTActionTdattaque.textContent = attaqueButton;
    let tabPersoTActionTdSpacer = cE('td');
    tabPersoTActionTdSpacer.textContent = '';
    let tabPersoTActionTdSoin = cE('td');
    let soinButton = cE('button', ['data-action', 'soin'], ['disabled', 'disabled']);
    tabPersoTActionTdSoin.textContent = soinButton;
    tabPersoTrAction.append(tabPersoTActionTdattaque, tabPersoTActionTdSpacer, tabPersoTActionTdSoin);
    tabPersoTBody.append(tabPersoTrAction);

    tabPerso.append(tabPersoThead, tabPersoTBody);
    console.log(tabPerso);
    let html = '';
    html += `
<table class="table">
    <thead>
    <tr class="table-dark">
        <th>Nom : </th>
        <th>Prénom : </th>
        <th>Classe : </th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>${personnage.nom}</td>
        <td>${personnage.prenom}</td>
        <td>${personnage.role}</td>
    </tr>
    <tr>
        <td>
            <button class="btn btn-outline-primary" data-action="attaquer">
                Attaquer l'enemeni
            </button>
        </td>
        <td>
        </td>
        <td>
            <button class="btn btn-outline-success" data-action="soin">
                Se soigner
            </button>
        </td>
    </tr>
    </tbody>
</table>
    `;
    return html;
}

export function fichePerso(personnage){
    let lePerso = `
${personnage.role}
----------------------------------------------------------
Personnage          :   ${personnage.prenom} ${personnage.nom}
Son arme            :   ${personnage.armeEquipee.nom} 
Dégats de base      :   ${personnage.dgBase}
PV (Actuels / Base) : ${personnage.pvActuel}/${personnage.pvBase}`;

    return lePerso;
}

export function jsonToTableObject(data){
    let tHead = '<tr>';
    let tBody = '';
    let firstRound = true;
    data.forEach((objet) => {
        tBody += `<tr>`;
        for(let key in objet){
            if(objet.hasOwnProperty(key)){
                tHead += (firstRound)? `<th>${key}</th>`: '';
                tBody += `<td>${objet[key]}</td>`;
            }
        }
        tBody += '</tr>';
        firstRound = false;
    });
    tHead += '</tr>';
    return [tHead, tBody];
}

export function setListe(thead = '#tabArme > thead', tbody = '#tabArme > tbody', liste = 'armes'){
    let tabTHead = document.querySelector(thead);
    let tabTBody = document.querySelector(tbody);
    fetch(`../json/${liste}.json`)
    .then(response => response.json())
    .then(data => {
        let tabResult = jsonToTableObject(data);
        tabTHead.innerHTML = tabResult[0];
        tabTBody.innerHTML = tabResult[1];
    })
}