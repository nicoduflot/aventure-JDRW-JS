/**
 * 
 * Classe Voleur, étendue d'Aventurier
 * 
 * changer le multi
 * sneak attack ou attaque discrète (base 2d6 dg)
 * 
 */
 import Aventurier from "./Aventurier.js";
 //je n'ai pas besoin d'importer l'arme, est est déjà importée dans la classe mère Aventurier
 
 export default class Voleur extends Aventurier {
     constructor(nom, prenom) {
         super(nom, prenom);
     }
 
     sneakAttack(ndD = 1, nbFaces = 6) {
         let degats = this.d(ndD, nbFaces);
         return degats;
     }
 
     multi(personnage) {
         let dgSup = this.sneakAttack(2, 6);
         return `${this.prenom} ${this.nom} se faufile derrière ${personnage.prenom} ${personnage.nom} 
         et l'attaque' dans le dos pour ${this.dgBase+dgSup} dégat(s)`;
     }
 }