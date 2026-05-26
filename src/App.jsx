
import Router  from './Router.jsx'
import { useState } from 'react';
import { OnboardingModal } from './components/organisms/OnboardingModal/OnboardingModal';



function App() {
  // Estado para controlar el Onboarding
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleEnter = () => {
    setShowOnboarding(false); // Al pulsar "Entrar", cerramos el modal
  };

  return (
    <>
 

      {/* Si showOnboarding es true, mostramos el modal */}
      {showOnboarding && <OnboardingModal onEnter={handleEnter} />}
      
      {/* El resto de tu aplicación sigue aquí abajo */}
      <Router />
    </>
  );
}

export default App;