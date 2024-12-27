"use client";

import { Product, ProductVariation } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/Button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { useState } from "react";
import cn from "classnames";
import Image from 'next/image';
import "./info.css";

interface InfoProps {
  data: Product;
  onImageSelect: (index: number) => void;
}

const Info: React.FC<InfoProps> = ({ data, onImageSelect }) => {
  const cart = useCart();
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(
    data.variations && data.variations.length > 0 ? data.variations[0] : null
  );
  const [isFavorite, setIsFavorite] = useState(false);

  const onAddToCart = () => {
    if (selectedVariation) {
      cart.addItem(data, selectedVariation);
    }
  };

  // Regrouper les variations par couleur et associer les images
  console.log("Images disponibles:", data.images);
  console.log("Variations disponibles:", data.variations);

  const colorVariations = data.variations.reduce((acc, variation) => {
    if (!acc[variation.colorId]) {
      // Trouver les images associées à cette variation par le variationId
      const variationImages = data.images.filter(img => img.variationId === variation.id);
      console.log(`Images pour la variation ${variation.id}:`, variationImages);
      
      const image = variationImages.length > 0 ? variationImages[0] : null;
      console.log(`Image sélectionnée pour la variation ${variation.id}:`, image);
      
      if (image) {
        acc[variation.colorId] = {
          colorId: variation.colorId,
          color: variation.color,
          image: image,
          imageIndex: data.images.findIndex(img => img.id === image.id)
        };
      }
    }
    return acc;
  }, {} as Record<string, { colorId: string; color: any; image?: any; imageIndex: number }>);

  console.log("Résultat final colorVariations:", colorVariations);

  return (
    <div className="info-container">
      {/* En-tête avec titre et favoris */}
      <div className="info-header">
        <div className="header-top">
          <h1 className="product-title">{data.name}</h1>
    <button 
  type="button"
  onClick={() => setIsFavorite(!isFavorite)}
  className="favorite-button"
  title="Add to favorites"
>
  <Heart 
    size={24} 
    className={cn(
      "favorite-icon",
      isFavorite ? "active" : "inactive"
    )} 
  />
</button>
        </div>

        <div className="rating-container">
          <div className="stars-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                className="star-icon"
              />
            ))}
          </div>
          <span className="review-count">({125} avis)</span>
        </div>

        <div className="price">
          <Currency value={data?.price} />
        </div>
      </div>

      {/* Description et avis */}
      <div className="description-section">
        <div>
          <h3 className="section-title">Description:</h3>
          <p className="description-text">{data.description}</p>
        </div>
      </div>

      {/* Couleurs disponibles */}
      <div className="colors-section">
        <h3 className="section-title">Couleurs disponibles:</h3>
        <div className="colors-grid">
          {Object.values(colorVariations).map(({ colorId, color, image, imageIndex }) => {
            console.log("Rendering color variation:", { colorId, color, image, imageIndex });
            return (
              <div 
                key={colorId}
                className={cn(
                  "color-item",
                  selectedVariation?.colorId === colorId ? "selected" : "unselected"
                )}
              >
                {image?.url && (
                  <Image
                    onClick={() => {
                      const variation = data.variations.find(v => v.colorId === colorId);
                      if (variation) {
                        setSelectedVariation(variation);
                        if (imageIndex !== -1) {
                          onImageSelect(imageIndex);
                        }
                      }
                    }}
                    src={image.url}
                    alt={`Couleur ${color?.name || ''}`}
                 
                    fill
                    style={{ objectFit: "contain" }}
                    className="color-image"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tailles */}
      {data.variations && data.variations.length > 0 && (
        <div className="sizes-section">
          <h3 className="section-title">Tailles:</h3>
          <div className="sizes-grid">
            {data.variations
              .filter(v => v.colorId === selectedVariation?.colorId)
              .map((variation) => (
                <button 
                  key={variation.id} 
                  onClick={() => setSelectedVariation(variation)}
                  className={cn(
                    "size-button",
                    selectedVariation?.id === variation.id && "selected",
                    variation.stock === 0 && "out-of-stock"
                  )}
                  disabled={variation.stock === 0}
                >
                  <span>{variation.size?.name}</span>
                  {variation.stock === 0 && (
                    <span className="out-of-stock-text">(Rupture)</span>
                  )}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Bouton d'ajout au panier */}
      <div className="add-to-cart-container">
        <Button 
          onClick={onAddToCart} 
          className="add-to-cart-button"
          disabled={!selectedVariation || selectedVariation.stock === 0}
        >
          Ajouter au panier
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Info;