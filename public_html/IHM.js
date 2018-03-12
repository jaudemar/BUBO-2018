$(function() {
    $('#tableau').on('click','tr', ClicTableau);
    $('#Raffraichir').on('click',debug);
    $('#nouveau').on('click',Nouveau);
    $('#modifier').on('click', Modifier);
    $('#supprimer').on('click', Supprimer);
    $('#geo').on('click', BoutonGeolocaliser); 
    $("#donne11").on('click', mesureLux);
    $("#save").on('click', BoutonEnregistrer);
});
var identifiant;
/*
function degriser () 
{  
    $('#supprimer').prop('disabled', true); //On grise le bouton supprimer
    $('#supprimer').button('refresh');//refresh
    $('#donne2').selectmenu('enable');//degriser un menu déroulant
    $('#donne3').selectmenu('enable');
    $('#donne4').selectmenu('enable');
    $('#donne5').textinput('enable');//degriser un champs de text
    $('#donne6').textinput('enable');   
    $('#donne7').selectmenu('enable');
    $('#donne8').textinput('enable');
    $('#donne9').textinput('enable');
    $('#donne10').textinput('enable');
    $('#donne11').prop('disabled', false);
    $('#donne11').button('refresh');
    $('#donne12').textinput('enable');

    $('#geo').prop('disabled',false); //degrise un bouton
    $('#geo').button('refresh');

    //$("#pic").addClass('ui-btn ui-corner-all ui-btn-inline');
  
    $('#pic').attr('class', 'ui-btn ui-corner-all ui-btn-inline');
    //On change le nom de classe du tableau pour le degriser
};

function griser () 
{
    $('#supprimer').prop('disabled', true);  
    $('#supprimer').button('refresh');
  
    $('#donne2').selectmenu('disable');   
    $('#donne3').selectmenu('disable');  
    $('#donne4').selectmenu('disable');  
    $('#donne5').textinput('disable');  
    $('#donne6').textinput('disable');  
    $('#donne7').selectmenu('disable');  
    $('#donne8').textinput('disable');  
    $('#donne9').textinput('disable');  
    $('#donne10').textinput('disable'); 
    $('#donne11').prop('disabled', true); 
    $('#donne11').button('refresh');
    $('#donne12').textinput('disable');  

    $('#geo').prop('disabled', true); 
    $('#geo').button('refresh'); 

    $('#pic').attr('class', 'ui-btn ui-corner-all ui-btn-inline ui-disabled');

    
    $('#save').prop('disabled', true);
    $('#save').button('refresh');
};
*/

var tabPhoto = new Array();
var lol=0;
var tab= new Array();
function genererTableau(data){
            $("#tableau").empty();
            var tableau = "<table data-role='table' id='table' class='ui-responsive'><thead ><tr>";

                    tableau += "<th class='entete'>ID</th>";//CLE = ALBEDO, ID,ULOR etc
                    tableau += "<th class='entete'>LATITUDE</th>";//CLE
                    tableau += "<th class='entete'>LONGITUDE</th>";//CLE
                    tableau += "<th class='entete'>ULOR</th>";//CLE
                    console.log(data);

            tableau += "</tr></thead><tbody>";
           for (var i=0; i<data.enregistrement.length; i++)
                    {
                    tableau += "<tr id="+i+">";
                    
                        tableau += "<td>"+data.enregistrement[i].ID+"</td>";
                        tableau += "<td>"+data.enregistrement[i].LATITUDE+"</td>";
                        tableau += "<td>"+data.enregistrement[i].LONGITUDE+"</td>";
                        tableau += "<td>"+data.enregistrement[i].ULOR+"</td>";           

                    tableau += "</tr>";
                    }
               
       
            tableau += "</tbody></table>";
            $("#tableau").append(tableau);
}

function debug(){
$.ajax({    
    type : 'GET',
    url : '/cgi-bin/datatest',
    dataType : 'json',
    success : function (data) {
        tab = data;
        genererTableau(tab);
    },
    error : function (result, status, erreur){
       
        alert(erreur + '///' + result);
    }
    });
};

function BoutonEnregistrer()
{

	//identifiant="";
	formData = new FormData();
        formData.append('identifiant', identifiant);
	formData.append('latitude', $('#donne0').val()); 
	formData.append('longitude', $('#donne1').val()); 
	formData.append('typeLampadaire', $('#donne2').val()); 
	formData.append('ulor', $('#donne3').val()); 
	formData.append('typeAmpoule', $('#donne4').val()); 
	formData.append('hauteur', $('#donne5').val());
	formData.append('puissance', $('#donne6').val()); 
	formData.append('albedo', $('#donne7').val()); 
	formData.append('agglomeration', $('#donne8').val()); 
	formData.append('rue', $('#donne9').val()); 
	formData.append('notes', $('#donne10').val() ); 
	formData.append('fluxlum', $('#donne12').val());
	formData.append('nbImage', tabPhoto.length);
        //envoi(identifiant); envoi photo non traité
    	if($('#nouveau').val() == 'Annuler')
    	{
            var request = new XMLHttpRequest();
            request.open("POST", "/cgi-bin/enregistrer.cgi");
            request.send(formData);
            
            ////////////////////////////////
		/*$.ajax({    
		    type : 'POST',
		    url : '/cgi-bin/enregistrer.cgi',
		    data : formData,
		    cache: false,
                    processData: false,
                    contentType: false,
		    success : function (data) {
			/*tab = data;
			genererTableau(tab);*/
		   /* },
		    error : function (result, status, erreur){
			alert(erreur);
		    },
		    });*/
        /////////////////////////////////////////////
        	/*$.ajax({
			type : 'POST',
                	url : "../cgi-bin/enregistrer.cgi",
                	dataType: "json",
            		data : formData,
                        success: function (reponse,status) {
                                $('#donne0').val('');
            			$('#donne1').val('');
                                
                        },
                        error: function (reponse,status) {
                            alert("L'enregistrement des donn�es c'est interrompus, veuilliez r�ssayez");
                        }
			});*/
    	} /*else {
          type: 'POST',
                        url: '../cgi-bin/gps/modifier.cgi',
                        dataType: "json",
            data : 'modifierValeur',
                        success: function (reponse,status) {
                                
                                },
                        error: function (reponse,status) {
                           alert("La modification des donn�es c'est interrompus, veuilliez r�ssayez");
                        }

    }                  */  


            $('#tab2').attr('class', 'ui-listview'); // cet �l�ment aura la classe ui-listview

            $('#nouveau').prop('value', 'Nouveau');
            $('#nouveau').prop('disabled', false);
            $('#nouveau').button('refresh');

            $('#modifier').prop('value', 'Modifier');
            $('#modifier').prop('disabled', true);
            $('#modifier').button('refresh');

            $('#Raffraichir').prop('disabled', true); //dégriser le bouton raffraichir
            $('#Raffraichir').button('refresh');

            $('#donne0').val('');
            $('#donne1').val('');
            griserChamps();
}





function ChangerMode() {
    
    
       /* if($('#Raffraichir').val() == 'Mode Revue'){
            $('.ui-content').css("background-color", "blue");    
            $('#Raffraichir').val('Mode Enregistrement');
        }else{
            $('#Raffraichir').val('Mode Revue');
            $('.ui-content').css("background-color", "#FCE2E2");    
        }
        $('#Raffraichir').button('refresh');
        return;    */
};

function ClicTableau () {
	
    if(!($("#tab2").hasClass("ui-disabled")))
    {
    	$('#modifier').prop('disabled', false);  //Change l'état de disable
    	$('#modifier').button('refresh'); // Le bouton se met a jour 
    	$('#supprimer').prop('disabled', false);
    	$('#supprimer').button('refresh');

        var value = "";

    //var trId = document.getElementById("0");
	var trId = $(this).closest("tr").attr("id");

    //console.log(data.enregistrement[trId].LATITUDE);
         $('#donne0').val(tab.enregistrement[trId].LATITUDE);
         $('#donne1').val(tab.enregistrement[trId].LONGITUDE);
         $('#donne5').val(tab.enregistrement[trId].HAUTEUR);
        // $('#donne6').val(tab.enregistrement[0].PUISSANCE);
         $('#donne8').val(tab.enregistrement[trId].AGGLOMERATION);
         $('#donne9').val(tab.enregistrement[trId].RUE);
         $('#donne10').val(tab.enregistrement[trId].NOTES);      
         $('#donne12').val(tab.enregistrement[trId].FLUXLUM); 
    
    $('#input1').val(value);
    $('#modifier').prop('disabled', false);          //Change l'état de disable
    $('#supprimer').prop('disabled', false);                    // Le bouton se met a jour     
    }
};

function getIdentifiant() {
	$.ajax({
		method: 'POST',
		url: "/cgi-bin/identifiant.cgi",
		dataType: "json",

		success: function(data){
			if(data.SUCCESS == "OK")
				identifiant = data.IDENTIFIANT;				
		
		},
                error: function (reponse,status) {
                    alert("Attention! identifiant erroné. " + reponse );
                }


	});

}
function Nouveau() {
	getIdentifiant();
	if ($('#nouveau').val() == 'Nouveau') //Si le bouton nouveau vaut "nouveau"
	{
            $('#nouveau').prop('value', 'Annuler'); //On change sa valeur en "annuler"
            $('#nouveau').button('refresh'); //On refresh le bouton     

            $('#modifier').prop('disabled', true); //griser le bouton modifier  
            $('#modifier').button('refresh');

            $('#Raffraichir').prop('disabled', true); //griser le bouton raffraichir
            $('#Raffraichir').button('refresh');
            
            degriserChamps(); //On degrise les champs

            $('#tab2').attr('class', 'ui-disabled ui-listview'); //On grise le tableau

	    $('#save').prop('disabled', true); //on grise le bouton enregistrer
	    $('#save').button('refresh');

	} else { //si le bouton nouveau est a l'état "annuler"

            $('#tab2').attr('class', 'ui-listview'); //On degrise le tableau

            $('#nouveau').prop('value', 'Nouveau'); //On repasse sa valeur a "Nouveau"
            $('#nouveau').button('refresh');
            
            $('#Raffraichir').prop('disabled', false); //dégriser le bouton raffraichir
            $('#Raffraichir').button('refresh');


            griserChamps(); //On grise les champs
	}
};

 function Modifier() {  
    if($('#modifier').val() == 'Modifier')
    {
        degriserChamps();
        $('#modifier').prop('value', 'Annuler');
        $('#modifier').button('refresh');

        $('#nouveau').prop('disabled', true);  
        $('#nouveau').button('refresh');
        $('#tab2').attr('class', 'ui-disabled ui-listview');

        $('#save').prop('disabled', false);  
        $('#save').button('refresh');

        return; 
    } else {

        griserChamps();
        $('#modifier').prop('value', 'Modifier');
        $('#modifier').button('refresh');

        $('#modifier').prop('disabled', true);  
        $('#modifier').button('refresh');

        $('#nouveau').prop('disabled', false);  
        $('#nouveau').button('refresh');

        $('#tab2').attr('class', 'ui-listview');
        return;
    }
    
};

function Supprimer ()
{
    var demandeConfirm = confirm("voulez vous faire ceci ?");
 
    if(demandeConfirm){ // bouton ok cliqu�
    //... code
                        /*type: 'POST',
                        url: '../cgi-bin/testsocket.cgi',
                        dataType: "json",
                        data : 'action=getLuminosite',
                        success: function (data) {
                            
                        },
                        error: function (data) {
                                
                        }
*/
    }
}   


var stockage= new Array();
function lireListe() {   
    $.ajax({
        type: 'POST',
        url: '../cgi-bin/listes.cgi',
        dataType: 'json',
        //data : 'listeLampadaire',
        success: function (reponse,status) {
            stockage=reponse;

               for(var i=0 ;i<stockage.LAMPADAIRE.length  ;i++)
               {
                   $("#donne2").append("<OPTION>"+ stockage.LAMPADAIRE[i] + "</OPTION>");
               }

               for(var i=0 ;i<stockage.AMPOULE.length ;i++)
               {
                   $("#donne4").append("<OPTION>"+ stockage.AMPOULE[i] + "</OPTION>");
               }

               for(var i=0 ;i<stockage.ULOR.length ;i++)
               {

                   $("#donne3").append("<OPTION>"+ stockage.ULOR[i] + "</OPTION>");
               }

               for(var i=0 ;i<stockage.ALBEDO.length ;i++)
               {

                   $("#donne7").append("<OPTION>"+ stockage.ALBEDO[i] + "</OPTION>");
               }

        },
        error: function (result, status, erreur) {
              alert( erreur);
        }
    }); 
};



function BoutonGeolocaliser() {   // NE Pas OULIER DE CHANGER LA PERMISSION
    $.ajax({
        type: 'POST',
        url: '../cgi-bin/collecteur.cgi',
        dataType: "json",
            //data : 'geolocaliser', ne fonctionne pas sur Chrome
        success: function (reponse,status) {
                if (reponse.LATITUDE && reponse.LONGITUDE)
                {
                    $("#donne0").val(reponse.LATITUDE);
                    $("#donne1").val(reponse.LONGITUDE);

                    $('#save').prop('disabled', false);
                    $('#save').button('refresh');
                }


        },
        error: function (reponse,status) {
            alert("GPS non prêt, veuillez réessayer dans 2 secondes " );
        }
    });

    
    
};

function mesureLux(){
        $.ajax({
                        type: 'POST',
                        url: '../cgi-bin/testsocket.cgi',
                        dataType: "json",
                        data : 'action=getLuminosite',
                        success: function (data) {
                            if(data.success == "OK")
                            {
                                $('#donne11').prop('disabled', false);
                                $('#donne11').button('refresh');
                                $('#donne12').textinput('disable');
                                $("#donne12").val(data.luminosite);
                            }
                            else
                                alert(data.message);
                        },
                        error: function (data) 
                            {
                               $('#donne11').prop('disabled', true);
                               $('#donne11').button('refresh');
                               $('#donne12').textinput('enable');
                               alert("Capteur non prêt, veuillez rentrer les valeurs manuellements")
                        }
                });
};




$( document ).on( "pageinit", function() {
    $( ".photopopup" ).on({
        popupbeforeposition: function() {
            var maxHeight = $( window ).height() - 60 + "px";
            $( ".photopopup img" ).css( "max-height", maxHeight );
        }
    });
});


//Ajouter des photos
$(function(){
if (window.File && window.FileReader && window.FormData) {
    $('#capture').on('change', function (e) {
        var file = e.target.files[0];
        if (file) {
            if (/^image\//i.test(file.type)) {
                readFile(file);
            }
        }
		$('#capture').val("");
    });
}
});

function readFile(file) {
	var reader = new FileReader();

	reader.onloadend = function () {
		$('#miniature').append("<div id='mini' style='position:relative'><img src='"+reader.result+"' height='10%'></div>");
		tabPhoto.push(reader.result);
	}

	reader.onerror = function () {
		alert('Erreur : Lecture!');
	}

	reader.readAsDataURL(file);
}


function envoi(identifiant) {


    var formData = new FormData();  //Cr�er un ensemble de paires cl�/valeur

    for(var nbPhoto = 0; nbPhoto < tabPhoto.length; nbPhoto++){
            formData.append('photo'+nbPhoto, tabPhoto[nbPhoto]); //Ajoute la valeur photo/image
    }
	
        formData.append('identifiant' ,identifiant);
	formData.append('nbPhoto', tabPhoto.length);
	$.ajax({
            type: 'POST',
            url: '../cgi-bin/upload.cgi', //Lien du script cgi
            data: formData,
            contentType: false, //Empêche jquery de mettre un contentType
            processData: false, //Empêche JQUERY de convertir les valeurs en string
            success: function (data) {
                if (data.success) {
                    alert('Succés: upload!');
                }

            },
            error: function (data) {
                 alert('Erreur lors de l\'upload!');
            }
        });
	
	tabPhoto.length = 0;
}

$(document).on('click', '#remove', function(){
	$(this).parent().remove();
});
$(document).on('click', '.remove', function(){
    $(this).parent().remove();
});












