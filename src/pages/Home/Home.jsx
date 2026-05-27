import { useState } from 'react';
import { HeaderApp } from '../../components/templates/HeaderApp/HeaderApp'; 
import PopularMovies from '../../components/organisms/PopularMovies/PopularMovies';

export function Home() {
  // Datos maestros de categorías
  const categories = ['All', 'Action', 'Comedy', 'Drama', 'Sci-Fi'];
  
  // 1. Añadimos el estado para la categoría y el nuevo estado para la búsqueda
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 2. Función manejadora de búsqueda con Console Logs de rastreo
  const handleSearch = (query) => {
    console.log("2. [HOME] Recibió la palabra clave desde el Header:", query);
    setSearchQuery(query);

    // Tip de UX: Si busca algo escrito, volvemos automáticamente a 'All' 
    // para que el filtro por género de TMDB no bloquee los resultados de la búsqueda.
    if (query.trim() !== '') {
      setActiveCategory('All');
    }
  };

  return (
    <div style={{ backgroundColor: '#0b0e14', minHeight: '100vh' }}>

      {/* 3. Conectamos la prop onSearch al HeaderApp */}
      <HeaderApp
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={(selected) => {
          console.log("Cambio de categoría a:", selected);
          setActiveCategory(selected);
        }}
        onSearch={handleSearch} /* <-- Mapeo del cable conductor */
      />

      <main>
        {/* 4. Enviamos tanto la categoría activa como la query de búsqueda al organismo */}
        <PopularMovies 
          activeCategory={activeCategory} 
          searchQuery={searchQuery} /* <-- Conexión final con el Intersection Observer */
        />
      </main>

    </div>
  );
}