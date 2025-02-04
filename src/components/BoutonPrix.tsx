import React from "react";

interface BoutonPrixProps {
 
  label: string;
 
  onClick: () => void;
 
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
