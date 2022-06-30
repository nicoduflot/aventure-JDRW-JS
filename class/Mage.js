/**
 * 
 * Classe Magze, étendue d'aventurier
 * 
 * changer le multi
 * afficher que le personnage utilise deux fois attaquer()
 * 
 */
import Aventurier from "./Aventurier.js";
//je n'ai pas besoin d'importer l'arme, est est déjà importée dans la classe mère Aventurier

export default class Mage extends Aventurier {
    constructor(nom, prenom) {
        super(nom, prenom);
    }

    bouleDeFeu(ndD = 1, nbFaces = 6) {
        let degats = this.d(ndD, nbFaces);
        return degats;
    }

    multi(personnage) {
        let dgSup = this.bouleDeFeu(5, 10);
        return `${this.prenom} ${this.nom} lance une boule de feu sur 
         ${personnage.prenom} ${personnage.nom} pour ${dgSup} dégat(s)`;
    }
}