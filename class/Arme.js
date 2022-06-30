// les armes de nos aventurier
export default class Arme{
    constructor(nom = 'Mains nues', niveauDegats = 1){
        this.nom = nom;
        this.niveauDegats = niveauDegats;
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