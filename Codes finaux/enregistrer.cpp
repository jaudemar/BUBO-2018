#include <iostream>
#include <string>
#include <fstream>
#include <vector>
#include "cgicc/Cgicc.h"
#include "cgicc/HTTPHTMLHeader.h"
#include "Enregistrement.h"
#include "BDD.h"
#include "Collecteur.h"
#include "Logger.h"

using namespace std;
using namespace cgicc;

int main()
{       Logger* monLogger = new Logger();
	//Déclaration des variables
	string identifiantCollecteur;
	string  aIdEnregistrement;
	int aId;
	string aAlbedo;
	string aFluxLum;
	string aIdRaspberry;
	string aTypeAmpoule;
	string aTypeLampadaire;
	string aHauteur;
	int puissance=0;
	double aLatitude;
	double aLongitude;
	int aNbImages;
	string aAgglo;
	string aNotes;
	string aRue;
	int aUlor=0;
	string aDate;
	//------------------------

	//Déclaration des CGI
	Cgicc cgi;
	const CgiEnvironment& env = cgi.getEnvironment();
	//-----------------------------------
	cout<<HTTPHTMLHeader();
monLogger->saveLog("Enregistrement ...");
			//--------------------------R�cup�ration latitude -------------------------
			form_iterator fvalue = cgi.getElement("latitude"); //Récupération valeur du champs "lattitude" 
			if( !fvalue->isEmpty() && fvalue != (*cgi).end()) {
				aLatitude = atof((**fvalue).c_str()); // atof => convertit un string en double 
			} 
			//--------------------------R�cup�ration Identifiant -------------------------
			fvalue = cgi.getElement("identifiant"); 
			if( !fvalue->isEmpty() && fvalue != (*cgi).end()) { 
				aId = atoi((**fvalue).c_str());
			} 
			//--------------------------R�cup�ration longitude -------------------------
			fvalue = cgi.getElement("longitude"); 
			if( !fvalue->isEmpty() && fvalue != (*cgi).end()) { 
				aLongitude = atof((**fvalue).c_str()); // atof => convertit un string en double 
			} 
			//--------------------------R�cup�ration typeLampadaire -------------------------
			fvalue = cgi.getElement("typeLampadaire"); 
			if( !fvalue->isEmpty() && fvalue != (*cgi).end()) { 
				aTypeLampadaire = **fvalue;
			} 
			//--------------------------R�cup�ration ulor -------------------------
			fvalue = cgi.getElement("ulor"); 
			if( !fvalue->isEmpty() && fvalue != (*cgi).end()) { 
				aUlor = atoi((**fvalue).c_str()); // atoi => convertit un string en int  
			} 

			//--------------------------R�cup�ration typeAmpoule -------------------------
			fvalue = cgi.getElement("typeAmpoule"); 
			if( !fvalue->isEmpty() && fvalue != (*cgi).end()) { 
				aTypeAmpoule = **fvalue; 
			}
			//--------------------------R�cup�ration hauteur -------------------------
			fvalue = cgi.getElement("hauteur"); 
			if( !fvalue->isEmpty() && fvalue != (*cgi).end()) { 
				aHauteur = **fvalue;
			} 
			//--------------------------R�cup�ration puissance -------------------------
			fvalue = cgi.getElement("puissance"); 
			if( !fvalue->isEmpty() && fvalue != (*cgi).end()) { 
				puissance = atoi((**fvalue).c_str()); // atoi => convertit un string en int 
			} 
			//--------------------------R�cup�ration albedo -------------------------
			fvalue = cgi.getElement("albedo"); 
			if( !fvalue->isEmpty() && fvalue != (*cgi).end()) { 
				aAlbedo = **fvalue;
			} 

			//--------------------------R�cup�ration agglomeration -------------------------
			fvalue = cgi.getElement("agglomeration"); 
			if( !fvalue->isEmpty() && fvalue != (*cgi).end()) { 
				aAgglo = **fvalue;
			} 
			//--------------------------R�cup�ration rue -------------------------
			fvalue = cgi.getElement("rue"); 
			if( !fvalue->isEmpty() && fvalue != (*cgi).end()) { 
				aRue = **fvalue;
			} 
			//--------------------------R�cup�ration notes -------------------------
			fvalue = cgi.getElement("notes"); 
			if( !fvalue->isEmpty() && fvalue != (*cgi).end()) { 
				aNotes = **fvalue;
			} 
			//--------------------------R�cup�ration fluxlum -------------------------
			fvalue = cgi.getElement("fluxlum"); 
			if( !fvalue->isEmpty() && fvalue != (*cgi).end()) { 
				aFluxLum = **fvalue;
			} 
			//--------------------------R�cup�ration nbImage -------------------------
			fvalue = cgi.getElement("nbImage"); 
			if( !fvalue->isEmpty() && fvalue != (*cgi).end()) { 
				aNbImages = atoi((**fvalue).c_str()); // atoi => convertit un string en int
			} 
			//------------------------Récupération date---------------------------
			fvalue = cgi.getElement("date"); 
                        if( !fvalue->isEmpty() && fvalue != (*cgi).end()) { 
                                aDate = **fvalue;
                        } 


//fichier<<"\r\n" << env.getPostData(); no treated

			//Instanciation des classes Enregistrement.cpp BDD.cpp et Collecteur.cpp
			Enregistrement* enregistrement = new Enregistrement(aAlbedo, aFluxLum, aIdRaspberry,  aTypeAmpoule,  aTypeLampadaire,aHauteur, aLatitude,  aLongitude, aNbImages, aAgglo,  aRue,  aUlor, aDate, aNotes, puissance);


			Collecteur* monCollecteur = new Collecteur();


			//Enregistrement dans la BDD
			enregistrement=monCollecteur->creerEnregistrement(enregistrement);
			//----------------------------------------------------------------------


			monLogger->saveLog("Enregistrement : OK");

    return 0;
}
