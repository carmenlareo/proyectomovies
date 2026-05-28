## ProyectoMovies

Aplicación web pensada para cinéfilos y amantes del cine.

El objetivo principal es ofrecer un espacio personalizado donde cualquier usuario pueda:

- Buscar y descubrir películas de forma fácil y visual.
- Consultar información detallada sobre películas.
- Crear y gestionar una lista de favoritas.

## Equipo

Proyecto desarrollado en el bootcamp FemCoders por:

 👩 Carmen Lareo 

## Tecnologías

- **React 19** + **Vite**
- **React Router DOM** — navegación entre páginas
- **Axios** — llamadas a la API
- **CSS Modules** — estilos encapsulados por componente
- **Tmdb API** — datos de Peliculas tiempo real

## Funcionalidades

- Carga de peliculas Api tmdb
- Buscador de peliculas por genero comedy, drama y Sci-fi action en los botones menu header.
- Scroll infinito
- Seleccion de Peliculas favoritas y muestra en la pagina likes.
- Buscador manual de peliculas por palabras.


## Estructura del proyecto

```
## Estructura del proyecto

```text
├── node_modules/
├── public/
└── src/
    ├── api/
    ├── components/
    │   ├── atoms/
    │   │   ├── CategoryButton/
    │   │   └── FavoriteButton/
    │   ├── molecules/
    │   ├── organisms/
    │   │   ├── CategoryCarousel/
    │   │   ├── MovieCard/
    │   │   ├── MovieDetailModal/
    │   │   ├── MovieSearch/
    │   │   ├── OnboardingModal/
    │   │   ├── PersonDetailModal/
    │   │   └── PopularMovies/
    │   └── templates/
    │       ├── HeaderApp/
    │       └── NavigationFooter/
    ├── context/
    ├── hooks/
    ├── pages/
    ├── router/
    └── styles/

```
## Notion

https://carmenlareo.notion.site/ProyectoMovies-364b12446b1e804b98f1fa4f918314da?source=copy_link

## Instalación

```bash
npm install
npm run dev
```

## API utilizada

**Tmdb API** — datos de Peliculas tiempo real

