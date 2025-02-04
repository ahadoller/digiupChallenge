import React from "react";

interface BoutonPrixProps {
  /** Texte ou symbole à afficher sur le bouton (ex: "-", "+") */
  label: string;
  /** Action à déclencher lorsqu’on clique sur le bouton */
  onClick: () => void;
  /** Classe CSS facultative pour personnaliser le style */
  className?: string;
}

const BoutonPrix: React.FC<BoutonPrixProps> = ({ label, onClick, className }) => {
  return (
    <button 
      type="button" 
      onClick={onClick} 
      className={className}
    >
      {label}
    </button>
  );
};

export default BoutonPrix;
