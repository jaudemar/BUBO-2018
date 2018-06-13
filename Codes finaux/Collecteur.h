#include <exception>
#include <string>
#include <vector>
using namespace std;

#ifndef __Collecteur_h__
#define __Collecteur_h__

#include "Enregistrement.h"
#include "GPS.h"
#define PBACCESIDENT -1
#define PBLECTUREIDENT -2
#define IDENTNOTFIND -3

	class Collecteur
	{
		private: string _identifiant;
				 GPS *unGPS;
		private: std::vector<Enregistrement*> _lampadairesProches;
		private: std::vector<Enregistrement*> listeEnregistrements;
		public: Collecteur();
		public: int recupererIdentifiantRaspberry();

		public: void creerEnregistrementVirtuel();
				void supprimerEnregistrementVirtuel();
			Enregistrement*  creerEnregistrement(Enregistrement *aDonnee);
		public: string geolocaliser();

		public: string geolocaliser(int identifiant);

		public: string obtenirIntensiteLumineuse();

		public: string obtenirIntensiteLumineuse(int identifiant);

		public: vector<Enregistrement*> chercherEnregistrements();

		public: void comparerPosition();

		public: void ajouterLampadairesProches();

		public: string getDonneesEnregistrement(char aLatitude[], char aLongitude[]);

		public: int modifier(int aId, string aAlbedo, string aFluxLum, string aIdRaspberry, string aTypeAmpoule, string aTypeLampadaire, string aHauteur, double aLatitude, double aLongitude,int aNbImages, string aAgglo, string aRue, int aUlor, string aDate, string aNotes);

		public: void modifier(Enregistrement *aDonnee);

		public: void supprimerEnregistrement(int ID);
				string getIdentifiant();
				vector<Enregistrement*> getlisteEnregistrements();
	};


#endif
