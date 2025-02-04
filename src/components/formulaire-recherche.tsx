import { useState } from 'react';
import { toast } from 'react-hot-toast';
import BoutonPrix from './BoutonPrix'; // <-- Import du composant

interface FormulaireRechercheProps {
  // Vous pouvez également passer une fonction onSearch(nbProduits, min, max) 
  // pour renvoyer les valeurs validées au composant parent (App ou autre).
  onSearch?: (nbProduits: number, min: number, max: number) => void;
}

const FormulaireRecherche = ({ onSearch }: FormulaireRechercheProps) => {
  const [totalProduits, setTotalProduits] = useState<number>(10);
  const [prixMinimum, setPrixMinimum] = useState<number>(0);
  const [prixMaximum, setPrixMaximum] = useState<number>(100);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // === Vérifications de base ===
    if (isNaN(totalProduits) || isNaN(prixMinimum) || isNaN(prixMaximum)) {
      toast.error("Veuillez saisir des valeurs numériques valides.");
      return;
    }

    if (totalProduits <= 0) {
      toast.error("Le nombre de produits doit être supérieur à 0.");
      return;
    }

    if (prixMinimum < 0 || prixMaximum < 0) {
      toast.error("Le prix minimum et le prix maximum ne doivent pas être négatifs.");
      return;
    }

    if (prixMaximum < prixMinimum) {
      toast.error("Le prix maximum doit être supérieur ou égal au prix minimum.");
      return;
    }

    // === Si tout est OK, on peut appeler onSearch() du parent ===
    if (onSearch) {
      onSearch(totalProduits, prixMinimum, prixMaximum);
    } else {
      toast.success("Recherche validée !");
    }
  };

  // Fonctions pour incrémenter / décrémenter le prix minimum et le prix maximum
  const decrementMin = () => setPrixMinimum(prixMinimum - 10);
  const incrementMin = () => setPrixMinimum(prixMinimum + 10);
  const decrementMax = () => setPrixMaximum(prixMaximum - 10);
  const incrementMax = () => setPrixMaximum(prixMaximum + 10);

  return (
    <div className="flex items-center bg-gray-100 text-gray-900 p-4">
      <form 
        onSubmit={handleSubmit} 
        className="flex space-x-24 items-center justify-center flex-1"
      >
        {/* Nombre de produits */}
        <div className="flex space-x-4 items-center">
          <label className="font-lg font-bold" htmlFor="totalProduits">
            Nombre de produits :{" "}
          </label>
          <input
            id="totalProduits"
            name="totalProduits"
            type="number"
            min={1}
            value={totalProduits}
            onChange={(e) => setTotalProduits(Number(e.target.value))}
            className="h-8 rounded-md w-24 text-black text-xl font-semibold text-center"
          />
        </div>

        <div className="flex space-x-20">
          {/* Prix minimum */}
          <div className="flex space-x-1 items-center">
            <label className="font-lg font-bold" htmlFor="prixMinimum">
              Prix minimum
            </label>
            {/* Remplacement du bouton "-" par BoutonPrix */}
            <BoutonPrix
              label="-"
              onClick={decrementMin}
              className="w-8 h-8 bg-orange-400 text-xl rounded-md font-extrabold"
            />
            <input
              id="prixMinimum"
              name="prixMinimum"
              type="number"
              value={prixMinimum}
              onChange={(e) => setPrixMinimum(Number(e.target.value))}
              className="h-8 rounded-md bg-white w-24 p-2 text-xl text-center"
            />
            {/* Remplacement du bouton "+" par BoutonPrix */}
            <BoutonPrix
              label="+"
              onClick={incrementMin}
              className="w-8 h-8 bg-orange-500 text-xl rounded-md font-extrabold"
            />
          </div>

          {/* Prix maximum */}
          <div className="flex space-x-1 items-center">
            <label className="font-lg font-bold" htmlFor="prixMaximum">
              Prix Maximum
            </label>
            <BoutonPrix
              label="-"
              onClick={decrementMax}
              className="w-8 h-8 bg-orange-400 text-2xl rounded-md font-extrabold"
            />
            <input
              id="prixMaximum"
              name="prixMaximum"
              type="number"
              value={prixMaximum}
              onChange={(e) => setPrixMaximum(Number(e.target.value))}
              className="h-8 bg-white rounded-md w-24 p-2 text-xl text-center"
            />
            <BoutonPrix
              label="+"
              onClick={incrementMax}
              className="w-8 h-8 bg-orange-500 text-2xl rounded-md font-extrabold"
            />
          </div>
        </div>

       
        <button
          type="submit"
          className="px-4 cursor-pointer font-bold py-1 text-white text-xl bg-green-600 rounded-lg"
        >
          Rechercher
        </button>
      </form>
    </div>
  );
};

export default FormulaireRecherche;
