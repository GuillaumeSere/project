import React from 'react';
import { ChevronDown, Calendar, Trophy, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1504707748692-419802cf939d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6">
            Vivez la Passion de la F1
          </h1>
          <p className="text-xl md:text-2xl text-center mb-8 max-w-3xl">
            Découvrez les dernières statistiques, suivez les courses à venir et restez informé
            sur le championnat du monde de Formule 1.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/races"
              className="bg-red-600 text-white px-8 py-3 rounded-full font-medium hover:bg-red-700 transition"
            >
              Prochaines Courses
            </Link>
            <Link
              to="/standings"
              className="border-2 border-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-red-600 transition"
            >
              Classements
            </Link>
          </div>

          <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="absolute bottom-8 animate-bounce"
            aria-label="Scroll down"
          >
            <ChevronDown className="h-8 w-8" />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Tout ce qu'il faut savoir sur la F1
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Calendrier des Courses</h3>
              <p className="text-gray-600">
                Consultez les dates et circuits des prochaines courses de la saison.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Classements en Direct</h3>
              <p className="text-gray-600">
                Suivez les classements des pilotes et des constructeurs en temps réel.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flag className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Actualités F1</h3>
              <p className="text-gray-600">
                Restez informé des dernières nouvelles du monde de la Formule 1.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;