export function setCookie(name, value = "", days = -1) {
    let dateNow = new Date();
    dateNow.setTime(dateNow.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${dateNow.toUTCString()}; SameSite=Strict; Secure`;
}

// récupération d'un cookie dans les cookies du site
export function getCookie(name) {
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

export function cE(element, ...attributes) {
    let newElement = document.createElement(element);
    attributes.forEach(function (tabAttr) {
        newElement.setAttribute(tabAttr[0], tabAttr[1]);
    });
    return newElement;
}

export function loaded(callable){
    window.addEventListener('DOMContentLoaded', callable);
}

export function s(selector){
    return document.querySelector(selector);
}

export function sAll(selector){
    return document.querySelectorAll(selector);
}