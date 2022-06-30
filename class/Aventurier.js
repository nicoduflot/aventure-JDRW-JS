import Arme from './Arme.js';

export default class Aventurier{
    constructor(nom, prenom){
        this.nom = nom;
        this.prenom = prenom;
        this.role = this.constructor.name;
        this.armes = [];
        this.armes.push(new Arme());
        this.armeEquipee = this.armes[0];
        this.nDgArmeEquipee = this.armes[0].niveauDegats;
        this.dgBase = parseFloat(this.nDgArmeEquipee) * 5;
        this.pvBase = 50;
        this.pvActuel = this.pvBase;
    }

    d(nbFaces = 4, nbD = 1, mod = 0){
        let result = 0;
        for(let i = 0; i < nbD; i++){
            result += ( Math.floor( Math.random() * parseInt(nbFaces) + 1) );
        }
        result += parseInt(mod);
        return result;
    }

    //ajout arme
    ajoutArme(nomArme, nDg){
        this.armes.push(new Arme(nomArme, nDg));
    }

    //changer d'arme
    changerArme(search){
        let armeOk = false;
        //console.log(`changer arme pour ${search}`);
        for(let arme of this.armes){
            if(arme.nom === search){
                this.armeEquipee = arme;
                this.nDgArmeEquipee = parseInt(arme.niveauDegats);
                this.dgBase = parseInt(arme.niveauDegats)*5;
                armeOk = true;
                return `Arme : ${arme.nom} équipée`;
            }
        }
        if(!armeOk){
            return `Arme : ${search} non trouvée`;
        }
    }

    // attaquer un personnage
    attaquer(personnage){
        personnage.changePv('-', this.dgBase, personnage);
        let resultAttaque = `
Attaque : 
${this.prenom} attaque ${personnage.prenom} ${personnage.nom}  avec '${this.armeEquipee.nom}' pour ${this.dgBase} dégat(s).
${personnage.prenom} est à ${personnage.getPvActuel()}/${personnage.getPvBase()} points de vie
`;
        resultAttaque += (personnage.getPvActuel() <= 0)? `${personnage.prenom} est mort` : ``;
        return resultAttaque;
    }

    //multi (coup spécial)
    multi(personnage){
        let totalDg = this.dgBase * 2;
        personnage.changePv('-', totalDg, personnage);
        let resultAttaque = `
${this.prenom} lance son multi sur ${personnage.prenom} ${personnage.nom}  avec '${this.armeEquipee.nom}' pour ${this.dgBase} dg x 2 donc ${totalDg} dégats
${personnage.prenom} est à ${personnage.getPvActuel()}/${personnage.getPvBase()} points de vie`;
        resultAttaque += (personnage.getPvActuel() <= 0)? `${personnage.prenom} est mort` : ``;
        return resultAttaque;
    }

    getPvBase(){
        return this.pvBase;
    }

    setPvBase(pvModifes){
        this.pvBase = pvModifes;
    }

    getPvActuel(){
        return this.pvActuel;
    }

    setPvActuel(pvModifes){
        this.pvActuel = pvModifes;
    }

    changePv(type, valeur, personnage){
        valeur = (parseFloat(valeur)? parseFloat(valeur) : 0);
        if("+" === type){
            if(valeur + personnage.getPvActuel <= personnage.pvBase){
                personnage.setPvActuel(personnage.getPvActuel() + valeur);
            }else{
                personnage.setPvActuel(personnage.getPvBase);
            }
        }
        if("-" === type){
            personnage.setPvActuel(personnage.getPvActuel() - valeur);
        }
    }

}