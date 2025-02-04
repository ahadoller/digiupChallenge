
import FormulaireRecherche from '../../components/formulaire-recherche';
import Produits from '../../components/produits';
import { useState } from 'react';

const HomePage = () => {
  
  const [searchParams, setSearchParams] = useState({
    nbProduits: 10,
    min: 0,
    max: 100,
  });

  function handleSearch(nbProduits: number, min: number, max: number): void {
    console.log(`Recherche de ${nbProduits} produits avec un prix entre ${min} et ${max}`);
    setSearchParams({ nbProduits, min, max });
  };

  return (
    <div>
      {/* Formulaire affiché uniquement sur la page d’accueil */}
      <FormulaireRecherche onSearch={handleSearch} />

      {/* Passage des paramètres de recherche au composant Produits */}
      <Produits 
        nbProduits={searchParams.nbProduits} 
        minPrice={searchParams.min} 
        maxPrice={searchParams.max} 
      />
    </div>
  );
};

export default HomePage;
