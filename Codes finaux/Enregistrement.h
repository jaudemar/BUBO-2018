#include <exception>
#include <string>
#include "Lampadaire.h"
#include "Ampoule.h"
#include "Galerie.h"
#include "Geolocalisation.h"
#include "Horodatage.h"

#include "GPS.h"
using namespace std;

#ifndef __Enregistrement_h__
#define __Enregistrement_h__


	class Enregistrement
	{
		/**
		 * identifiant d'enregistrement bas� sur l'instant exact de mesure
		 */
		private: string _identifiant;
		private: string _agglomeration;
		private: string _rue;
		private: string _notes;
				 int ID;
		private: Lampadaire* lampadaire;
		private: Galerie* galerie;
		private: Geolocalisation* geolocalisation;
		private: Ampoule* ampoule;
		private: Horodatage* horodatage;

		public: Enregistrement(string aIdRaspberry, GPS * unGPS) ;
				Enregistrement( GPS * unGPS);
				Enregistrement(int aId, string aAlbedo, string aFluxLum, string aIdRaspberry, string aTypeAmpoule, string aTypeLampadaire, string aHauteur, double aLatitude,  double aLongitude, int aNbImages, string aAgglo, string aRue, int aUlor, string aDate, string aNotes, int puissance);
				Enregistrement(string aAlbedo, string aFluxLum, string aIdRaspberry, string aTypeAmpoule, string aTypeLampadaire, string aHauteur, double aLatitude, double aLongitude,  int aNbImages, string aAgglo, string aRue, int aUlor, string aDate, string aNotes,int aPuissance);

		/// <summary>
		/// Cette m�thode permet de r�cup�rer les donn�es r�utilisables pour un nouvel enregistrement.
		/// </summary>
		public: void getDonneesCommunes();

		//public: void calculerIdentifiant(char heure[6],char date[6]);

		//public: string creerIdentifiant();

		public: int caracteriserAmpoule(float aIntensiteLumineuse);

		/// <summary>
		/// Cette m�thode permet d'extraire la latitude et la longitude sous la forme d'un tableau de 10 caract�res ASCII. Elles seront exprim�es en degr�s (avec 6 chiffres apr�s la virgule).
		/// Exemple d'une adresse dans la ville de Plougastel-Daoulas :
		/// Latitude = 48.347487�
		/// Longitude = -4.465502�
		/// Le symbole � n'est pas contenu dans le tableau.
		/// <returns> Valeurs de retour :
		/// ALERTE = -2 : Signifie que le GPS n'�tait pas pr�t lors de la capture et � transmis le caract�re 'V' dans le deuxi�me champs apr�s l'identifiant.
		/// ERREURCHECKSUM = -3 : Le Checksum de la trame captur�e est erron�
		/// ECHECCAPTURE = -4 : La trame RMC n'a pas �t� captur�e dans la salve captur�e</returns> 
		/// </summary>
		public: int localiser() ;

		public: int localiser(char aLatitude_[10], char aLongitude[10], GPS * unGPS) ;

		public: void getPosition(char aLatitude[], char aLongitude[]);
		public: int getIdentifiant();
		public: string getBuboID();
		public: void setPosition(char aLatitude[], char aLongitude[]); //pour récupérer valeurs GPS de l'IHM
		public: void setAgglomeration(string aAgglomeration);

		public: string getAgglomeration();

		public: void setNotes(string aNotes);

		public: string getNotes();

		public: void setRue(string aRue);

		public: string getRue();

				void setLampadaire(string type, string hauteur, int ulor,string albedo);
				void setGalerie(int nbrePhotos);
				void setGeolocalisation(char aLatitude_[10], char aLongitude[10]);
				void setHorodatage(char date[6]);
				void setAmpoule(string type,string intensiteLumineuse,int puissance);
				void getAmpoule(string &type, string  &intensiteLumineuse, int &puissance);

				void getLampadaire(string &type, string &hauteur, int &ulor, string  &albedo);
				void getGalerie(int &nbrePhotos);

				void getHorodatage(char date[6]);

		/// <summary>
		/// Cette m�thode permet de r�cup�rer les coordonn�es d'un enregistrement.
		///	Les informations sont alors retourn�es dans les deux param�tres : 
		/// <param> premier param�tre = latitude</param>
		/// <param> second param�tre = longitude </param>
		/// </summary>		
				void getGeolocalisation(char aLatitude_[10], char aLongitude[10]);


	};


#endif
