import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

const PageProduit: React.FC = () => {
  const { id } = useParams();
  const [produit, setProduit] = useState<Produit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduit = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduit(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

   
    if (id) {
      fetchProduit();
    }
  }, [id]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!produit) {
    return <div>Produit introuvable</div>;
  }

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
           
         
        </div>
  );
};

export default PageProduit;
