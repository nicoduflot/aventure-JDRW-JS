//création d'une petite biblio de fonctions de raccourcis pour agir sur le DOM
// le DOM est chargée
function loaded(callable){
    window.addEventListener('DOMContentLoaded', callable);
}

function s(selector){
    return document.querySelector(selector);
}

function sAll(selector){
    return document.querySelectorAll(selector);
}

//fonction de création de cookie
// par défaut, la fonction détruit le cookie appelé
// la durée de validité du cookie sera exprimée en jours

function setCookie(name, value = "", days = -1) {
    let dateNow = new Date();
    dateNow.setTime(dateNow.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${dateNow.toUTCString()}; SameSite=Strict; Secure`;
}

// récupération d'un cookie dans les cookies du site
function getCookie(name) {
    //unAutreCookie=12; monCookie2=test; monCookie=Nicolas;
    let tabCookie = document.cookie.split("; ");
    for (cookie of tabCookie) {
        let tabValue = cookie.split("=");
        if (name === tabValue[0]) {
            return tabValue[1];
        }
    }
    return false;
}

// camelCase : un petit oiseau qui chante => unPetitOiseauQuiChante
// un_petit_oiseau_qui_chante

function cE(element, ...attributes) {
    let newElement = document.createElement(element);
    attributes.forEach(function (tabAttr) {
        newElement.setAttribute(tabAttr[0], tabAttr[1]);
    });
    return newElement;
}

// getXhr : créer une connexion vers une ressource
function getXhr() {
    let xhr = null;
    // vérifier que le navigateur supporte un des protocole ajax
    if (window.ActiveXObject || window.XMLHttpRequest) {
        //Est-ce que le navigateur à un protocole Microsoft ou autres navigateurs
        if (window.ActiveXObject) {
            // si protocol microsoft
            // il existe deux protocoles, si ce n'est pas l'un, c'est forcément l'autre
            try {
                // on esaie un protocole Microsoft
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                // si le premier protocole n'a pas fonctionné, on utilise l'autre
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            // le navigateur utilise le protocole standard
            xhr = new XMLHttpRequest();
        }
    } else {
        // le navigateur ne supporte tout simplement pas la techno AJAX
        console.log("Votre navigateur ne supporte pas le protocole AJAX - XHR");
        xhr = false;
    }
    return xhr; // on renvoie le resultat
}

function jsonUsersToHTMLTable(data) {
    let html = '';
    if(null !== data) {
        data.forEach((user) => {
            html += `
            <tr data-id="${user.id}" data-name="${user.name}" data-email="${user.email}">
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
            </tr>
            `;
        });
    }
    return html;
}

function jsonToTableObject(data){
    let html = '';
    let tHead = '<tr>';
    let tBody = '';
    let firstRound = true;
    // parcourir les éléments du json
    data.forEach((user) => {
        // on parcours les user de data
        // préparation des lignes de tbody (les users)
        tBody += `<tr data-id="${user.id}" data-name="${user.name}" data-email="${user.email}">`;
        for(key in user){
            //on parcours les clef de "1er niveau" del'objet
            if(user.hasOwnProperty(key)){
                //si c'est le premier tour, on ajoute les entête de colonne à thead
                tHead += (firstRound)? `<th>${key}</th>`: '';
                // si la propiété n'est pas un objet, on affiche directement son contenu
                // sinon, on parcour l'objet pour récupérer les informations complémentaires
                if('object' !== typeof(user[key])){
                    tBody += `<td>${user[key]}</td>`;
                }else{
                    tBody += `<td>`;
                    for(item in user[key]){
                        if(user[key].hasOwnProperty(item)){
                            if('object' !== typeof(user[key][item])){
                                tBody += `${user[key][item]}<br/>`;
                            }
                            // on ne va par regarder la présence d'un troisième iveau
                        }
                    }
                    tBody += `</td>`;
                }
            }
        }
        tBody += '</tr>';
        firstRound = false;
    });
    tHead += '</tr>';
    //return ['', html];
    return [tHead, tBody];
}

function jsonResultSearchObject(data, search){
    let tHead = '<tr>';
    let tBody = '';
    let tempLine = '';
    let searchOK = false;
    let firstRound = true;
    let compare = '';
    data.forEach((user) => {
        tempLine += `<tr data-id="${user.id}" data-name="${user.name}" data-email="${user.email}">`;
        for(key in user){
            if(user.hasOwnProperty(key)){
                tHead += (firstRound)? `<th>${key}</th>`: '';
                if('object' !== typeof(user[key])){
                    tempLine += `<td>`
                    compare = user[key].toString().toLowerCase();
                    if(compare.indexOf(search.toLowerCase()) >= 0){
                        searchOK = true;
                        tempLine += '<mark>';
                    }
                    tempLine += `${user[key]}`;
                    if(compare.indexOf(search.toLowerCase()) >= 0){
                        tempLine += '</mark>';
                    }
                    tempLine += `</td>`;
                    compare = '';
                }else{
                    tempLine += `<td>`;
                    for(item in user[key]){
                        if(user[key].hasOwnProperty(item)){
                            if('object' !== typeof(user[key][item])){
                                
                                compare = user[key][item].toString().toLowerCase();
                                if(compare.indexOf(search.toLowerCase()) >= 0){
                                    searchOK = true;
                                    tempLine += '<mark>';
                                }
                                tempLine += `${user[key][item]}<br/>`;
                                if(compare.indexOf(search.toLowerCase()) >= 0){
                                    tempLine += '</mark>';
                                }
                                compare = '';
                            }
                        }
                    }
                    tempLine += `</td>`;
                }
            }
        }
        tempLine += '</tr>';
        tBody += (searchOK)? tempLine : '';
        tempLine = '';
        searchOK = false;
        firstRound = false;
    });
    tHead += '</tr>';
    //return ['', html];
    return [tHead, tBody];
}