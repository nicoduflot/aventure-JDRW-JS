// les armes de nos aventurier
export default class Arme{
    constructor(nom = 'Mains nues', niveauDegats = 1, nbMains = 1, cout = 0){
        this.nom = nom;
        this.niveauDegats = niveauDegats;
        this.nbMains = nbMains;
        this.cout = cout;
        this.enchantement = null;
    }

    setEnchantement(nom, effet){
        let enchantement = {
            nom: nom,
            effet: effet
        };
        this.enchantement = enchantement;
    }
}