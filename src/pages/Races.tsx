import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MapPin, Calendar } from 'lucide-react';
import type { Race } from '../types/f1';

const Races = () => {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await fetch('https://api.openf1.org/v1/sessions');
        if (!response.ok) throw new Error('Erreur lors du chargement des données');
        const data = await response.json();
        
        // Validate and transform the data
        const validRaces = data.filter((race: any) => 
          race && 
          typeof race.date_start === 'string' && 
          race.date_start.trim() !== '' &&
          race.location &&
          race.country_name &&
          race.session_type &&
          race.session_name
        ).map((race: any) => ({
          date: race.date_start,
          circuit: race.location,
          country: race.country_name,
          round: race.round,
          session: race.session_type,
          name: race.session_name,
        }));
        
        setRaces(validRaces);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Date à confirmer';
    
    try {
      const date = parseISO(dateString);
      if (isNaN(date.getTime())) {
        return 'Date à confirmer';
      }
      return format(date, "d MMMM yyyy 'à' HH'h'mm", { locale: fr });
    } catch (err) {
      console.error('Error formatting date:', err);
      return 'Date à confirmer';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Calendrier des Courses</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {races.map((race, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative h-48">
                <img
                  src={`https://media.gettyimages.com/id/1495903821/fr/photo/barcelona-spain-max-verstappen-of-the-netherlands-driving-the-oracle-red-bull-racing-rb19.jpg?s=2048x2048&w=gi&k=20&c=c4JkMImUj6y1sN3jUG-OVvof047Fppprgov2k4jSd9Q=`}
                  alt={race.circuit}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h2 className="text-white text-xl font-bold">{race.circuit}</h2>
                  <p className="text-white/80">{race.country}</p>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Calendar className="h-5 w-5" />
                  <span>{formatDate(race.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  <span>{race.session} {race.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Races;