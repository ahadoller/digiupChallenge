import React from 'react';
import { Link } from 'react-router-dom';


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


interface ProduitItemProps {
  produit: Produit;
}

const ProduitItem: React.FC<ProduitItemProps> = ({ produit }) => {
  return (
    <div className="flex flex-col space-y-2 bg-gray-50 p-4 drop-shadow-lg shadow-lg rounded-md">
      <div className="text-xl h-32 text-gray-800 text-center font-extrabold">
        {produit?.title}
      </div>
      <img
        src={produit?.image}
        alt={produit?.title}
        className="w-full h-56 object-contain rounded-md mb-4"
      />

      <div className="flex items-center justify-between">
        <div className="text-2xl text-orange-500 font-extrabold">
          {produit?.price} €
        </div>
        <div className="text-md text-blue-800 font-extrabold">
          avis : {produit?.rating.rate} / 5
        </div>
      </div>
       {/* Le lien vers la page de détail */}
      <Link
        to={`/produit/${produit.id}`}
        className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        Voir Détails
      </Link>
    </div>
  );
};

export default ProduitItem;
