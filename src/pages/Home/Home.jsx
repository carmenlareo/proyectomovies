import { useState } from 'react';
import { HeaderApp } from '../../components/templates/HeaderApp/HeaderApp'; // Verifica tu ruta de importación
//import { MovieCard } from '../../components/organisms/MovieCard/MovieCard';
import PopularMovies from '../../components/organisms/PopularMovies/PopularMovies';

export function Home() {
  // Declaramos los datos maestros aquí
  const categories = ['All', 'Action', 'Comedy', 'Drama', 'Sci-Fi'];
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div style={{ backgroundColor: '#0b0e14', minHeight: '100vh' }}>

      {/* Le pasamos los datos al Header para que los dibuje en su interior */}
      <HeaderApp
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={(selected) => setActiveCategory(selected)}
      />
      <main>
        {/* En el futuro aquí podrías añadir un BannerMol o un FooterOrganism */}
        <PopularMovies />
      </main>

    </div>

   
  );
}


