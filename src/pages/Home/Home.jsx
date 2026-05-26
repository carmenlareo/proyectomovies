import { useState } from 'react';
import { HeaderApp } from '../../components/templates/HeaderApp/HeaderApp'; // Verifica tu ruta de importación
import { MovieCard } from '../../components/organisms/MovieCard/MovieCard';

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

      {/* Contenido principal de las películas */}
      <div style={{ padding: '0px' }}>
        <h3 style={{ color: 'white', marginBottom: '0px', fontFamily: 'sans-serif', fontSize: '20px' }}>
          Popular: {activeCategory}
        </h3>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
         <MovieCard   title="The Salvation"
                        genre="Acción"
                        year={2022}
                        imageUrl="https://media.themoviedb.org/t/p/w220_and_h330_face/fj1FAiS6OHidg1O1T6z2356fD6u.jpg"
                    />
           <MovieCard   title="Mortsl Kombat"
                        genre="Acción"
                        year={2021}
                        imageUrl="https://www.themoviedb.org/t/p/w600_and_h900_face/2acqTZDykiX8U4oDVBIsNcm5O2o.jpg"
                    />
                     <MovieCard   title="Hoppers"
                        genre="Acción"
                        year={2026}
                        imageUrl="https://www.themoviedb.org/t/p/w600_and_h900_face/hJRMZZv1WUKWMYQ73VB8hdFq8tq.jpg"
                    />
                    <MovieCard   title="Avatar"
                        genre="Acción"
                        year={2025}
                        imageUrl="https://www.themoviedb.org/t/p/w600_and_h900_face/4n1U0Mwn7djux6VKNYDRWPgS2x6.jpg"
                    />
           <MovieCard   title="The Salvation"
                        genre="Acción"
                        year={2022}
                        imageUrl="https://media.themoviedb.org/t/p/w220_and_h330_face/fj1FAiS6OHidg1O1T6z2356fD6u.jpg"
                    />
                     <MovieCard   title="The Salvation"
                        genre="Acción"
                        year={2022}
                        imageUrl="https://media.themoviedb.org/t/p/w220_and_h330_face/fj1FAiS6OHidg1O1T6z2356fD6u.jpg"
                    />
          {/* Aquí puedes meter más MovieCards */}
        </div>
      </div>

    </div>
  );
}

           
