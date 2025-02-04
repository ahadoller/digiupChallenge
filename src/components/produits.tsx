// Produits.tsx
import axios from 'axios';
import { useState, useEffect } from 'react';
import ProduitItem from './ProduitItem';

// Type de données pour un produit
interface Produit {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Props attendues par le composant Produits
interface ProduitsProps {
  nbProduits: number;
  minPrice: number;
  maxPrice: number;
}

const Produits = ({ nbProduits, minPrice, maxPrice }: ProduitsProps) => {
  // Stocke l'ensemble des produits récupérés depuis l'API
  const [allProduits, setAllProduits] = useState<Produit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tri, setTri] = useState<string>(''); // Pour le tri : 'asc' ou 'desc'

  // Récupère les produits depuis l'API
  const fetchProduits = async () => {
    try {
      setLoading(true);
      // Ici, on récupère TOUS les produits (ou vous pouvez adapter le limit)
      const response = await axios.get('https://fakestoreapi.com/products');
      setAllProduits(response.data);
    } catch (err) {
      setError("Erreur lors du chargement des produits. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduits();
  }, []);

  // Applique le filtrage en fonction des prix passés en props
  let produitsFiltres = allProduits.filter(
    (produit) => produit.price >= minPrice && produit.price <= maxPrice
  );

  // Applique le tri si sélectionné
  if (tri === 'asc') {
    produitsFiltres = produitsFiltres.sort((a, b) => a.price - b.price);
  } else if (tri === 'desc') {
    produitsFiltres = produitsFiltres.sort((a, b) => b.price - a.price);
  }

  // Limite le nombre de produits affichés selon nbProduits
  const produitsAffiches = produitsFiltres.slice(0, nbProduits);

  return (
    <div>
      <div className="flex justify-between items-center px-12 py-6">
        <h1 className="text-2xl font-bold">Boutique en Ligne</h1>

        <form>
          <select
            className="px-2 border border-black text-black text-xl"
            onChange={(e) => setTri(e.target.value)}
            value={tri}
          >
            <option value="">Trier par :</option>
            <option value="asc">Prix croissant</option>
            <option value="desc">Prix décroissant</option>
          </select>
        </form>
      </div>

      {/* Affichage des états de chargement ou d'erreur */}
      {loading ? (
        <div className="text-center text-xl font-bold">Chargement...</div>
      ) : error ? (
        <div className="text-center text-red-600 text-xl font-bold">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-16">
          {produitsAffiches.length > 0 ? (
            produitsAffiches.map((produit) => (
              <div key={produit.id}>
                <ProduitItem produit={produit} />
              </div>
            ))
          ) : (
            <p>Aucun produit ne correspond aux critères.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Produits;
