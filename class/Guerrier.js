/**
 * 
 * Classe Guerrier, étendue d'aventurier
 * 
 * changer le multi
 * afficher que le personnage utilise deux fois attaquer()
 * 
 */
import Aventurier from "./Aventurier.js";
//je n'ai pas besoin d'importer l'arme, est est déjà importée dans la classe mère Aventurier

export default class Guerrier extends Aventurier{
    constructor(nom, prenom){
        super(nom, prenom);
    }

    multiAttaque(personnage, nbAttaque = 1){
        let resMulti = '';
        for(let i = 0; i < nbAttaque; i++){
            resMulti += this.attaquer(personnage);
        }
        return resMulti;
    }

    multi(personnage){
        let resMulti = this.multiAttaque(personnage, 2);
        return `${this.prenom} ${this.nom} devient féroce : ${resMulti}`;
    }
}