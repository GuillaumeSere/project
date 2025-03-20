import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import type { Driver, Team } from '../types/f1';

const Standings = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [activeTab, setActiveTab] = useState<'drivers' | 'constructors'>('drivers');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const [driversResponse, constructorsResponse] = await Promise.all([
          fetch('https://api.openf1.org/v1/drivers'),
          fetch('https://api.openf1.org/v1/constructors')
        ]);

        // Vérification de la réponse HTTP pour chaque requête
        if (!driversResponse.ok || !constructorsResponse.ok) {
          throw new Error('Erreur lors du chargement des données');
        }

        // Extraction des données JSON de chaque réponse
        const driversData = await driversResponse.json();
        const constructorsData = await constructorsResponse.json();

        // Transformation des données brutes en format attendu par l'application
        const formattedDrivers = driversData.map((driver:any)=> ({
          number: driver.driver_number,
          firstName: driver.first_name,
          lastName: driver.last_name,
          team: driver.team_name,
          points: driver.session_key,
          headshotUrl: driver.headshot_url,
        }));

        const formattedTeams = constructorsData.map((team:any)=> ({
          name: team.name,
          points: team.points, // Supposons que points existe déjà dans les données brutes pour simplifier
        }));

        // Mise à jour des états avec les données formatées
        setDrivers(formattedDrivers);
        setTeams(formattedTeams);
      } catch (err) {
        // Gestion de l'erreur en cas d'échec de la récupération des données
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        // Réinitialisation de l'indicateur de chargement après la fin de la fonction
        setLoading(false);
      }
    };

    // Appel de la fonction de récupération des données au montage du composant
    fetchStandings();
  }, []);

  // Affichage du composant de chargement si les données sont en cours de chargement
  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  // Affichage du message d'erreur si une erreur survient lors du chargement des données
  if (error) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  // Affichage du composant principal avec les données récupérées
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Trophy className="h-8 w-8 text-red-600" />
          <h1 className="text-4xl font-bold">Classements</h1>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full shadow-md p-1">
            <button
              className={`px-6 py-2 rounded-full transition ${
                activeTab === 'drivers'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:text-red-600'
              }`}
              onClick={() => setActiveTab('drivers')}
            >
              Pilotes
            </button>
            <button
              className={`px-6 py-2 rounded-full transition ${
                activeTab === 'constructors'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:text-red-600'
              }`}
              onClick={() => setActiveTab('constructors')}
            >
              Constructeurs
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {activeTab === 'drivers' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Numéro
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pilote
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Écurie
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {drivers.map((driver, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {driver.number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <img src={driver.headshotUrl} />
                        {driver.firstName} {driver.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {driver.team}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {driver.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Écurie
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {teams.map((team, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {team.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {team.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Standings;