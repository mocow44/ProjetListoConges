var DateConges = function(nom, prenom, dateDebutConges, dateFinConges){

    this.nom = nom || "";
    this.prenom = prenom || "";
    this.dateDebutConges = dateDebutConges || new Date(this.dateDebutConges);//new Date(this.dateDebutConges) pour revenir à une date "non définie"
    this.dateFinConges = dateFinConges || new Date(this.dateFinConges);
}
//Permet d'avoir le nom et le prenom dans une fonction
DateConges.prototype.nomPrenom = function (){
    return `${this.nom}  ${this.prenom}`;
}
//Permet de vérifier si la date de début des congés est bien avant la date de fin de congés
DateConges.prototype.SaisieDateOk = function(){
    if(this.dateDebutConges.getTime()<this.dateFinConges.getTime()) {
        return this.nom != "" && this.prenom != "" && this.dateDebutConges != "" && this.dateFinConges != "";
    }else {
        return alert('Erreur saisie des dates');
    }
}
/*
* Permet de vérifier si les congés selectionnés sont dans le même mois et d'afficher le récap des infos
* Permet de voir le nombre de jours de congés prit dans les mois.
* */
DateConges.prototype.informations = function(){
    var jour = this.dateDebutConges.getDate()//.toString().padStart(2,"O");
    var mois = (this.dateDebutConges.getMonth()+1)//.toString().padStart(2, "0");
    var annee = this.dateDebutConges.getFullYear();
    var jour2 = this.dateFinConges.getDate()//.toString().padStart(2,"O");
    var mois2 = (this.dateFinConges.getMonth()+1)//.toString().padStart(2, "0");
    var annee2 = this.dateFinConges.getFullYear();
    var milliSecondeConges = this.dateFinConges.getTime() - this.dateDebutConges.getTime();
    var jourConges = milliSecondeConges /1000/60/60/24;
    var date = new Date(this.dateDebutConges.getFullYear() ,this.dateDebutConges.getMonth() +1, 0);
    var date2 = new Date(this.dateFinConges.getFullYear(), this.dateFinConges.getMonth()+1, 1);
    var nomMoisDebut = this.dateDebutConges.toLocaleString("fr", { month: "long" });
    var nomMoisFin = this.dateFinConges.toLocaleString("fr", {month: "long"});


    if (mois == mois2) {

        return `${this.nom} ${this.prenom} vos congés commence le ${jour}/${mois}/${annee} et se termine le ${jour2}/${mois2}/${annee2} 
        soit ${jourConges} jours de congés`;

    }else{
       return `${this.nom} ${this.prenom}, vos congés ne sont pas dans le même mois,
        vos dates correspondent à ${jourConges} jours de congés.
        Du ${jour}/${mois}/${annee} au ${jour2}/${mois2}/${annee2} dont ${date.getDate()-jour} jour(s) au mois de ${nomMoisDebut} et ${(date2.getDate()+jour2)-1} jours(s) au mois de ${nomMoisFin}.`
    }
}
//Permet d'initiliaser le formulaire
function initialiserFormulaire(){
    var dateConges = new DateConges();
    document.getElementById("libelleConges").value=dateConges.nom;
    document.getElementById("libelleConge").value=dateConges.prenom;
    document.getElementById("dateDebut").valueAsDate=dateConges.dateDebutConges;
    document.getElementById("dateFin").valueAsDate=dateConges.dateFinConges;
    document.getElementById("libelleConges").focus();
}
/*Permet d'ajouter la partie après le clic sur "valider"
* Et de vérifier si tous les champs sont remplis
* */
function ajouter(){
    var dateConges = new DateConges(document.getElementById("libelleConges").value,
                                 document.getElementById("libelleConge").value,
                                document.getElementById("dateDebut").valueAsDate,
                                document.getElementById("dateFin").valueAsDate);

    if(dateConges.SaisieDateOk()){
        var liConges = document.createElement("li");
        var pConges = document.createElement("p");
        var pInfos = document.createElement("p");


        pConges.innerText = dateConges.nomPrenom();
        pInfos.innerText = dateConges.informations();
        pConges.classname = "nom";
        pInfos.className = "infos";
        liConges.addEventListener("click", supprimer);

        var olConges = document.getElementById("olListeConges");
        olConges.appendChild(liConges);
        liConges.appendChild(pConges);
        liConges.appendChild(pInfos);

        initialiserFormulaire();
    }else{
        alert("Tous les champs sont obligatoires");
    }
    //Permet de supprimer Les infos de congés d'une personne
    function supprimer(event){
        var conges = event.currentTarget.getElementsByTagName("p")[0].innerText
        if(confirm(`Voulez-vous supprimer les congés "${conges}"?`)){
            event.currentTarget.parentNode.removeChild(event.currentTarget);
        }
    }
}

