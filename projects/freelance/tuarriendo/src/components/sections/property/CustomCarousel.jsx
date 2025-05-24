import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState, useRef } from "react";

function CustomCarousel({images}) {
  const [isClient, setIsClient] = useState(false);
  const carouselRef = useRef(null);
 
  // Este efecto solo se ejecuta en el cliente
  useEffect(() => {
    setIsClient(true);
   
    // Prevenir click derecho solo en el carrusel
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };
   
    // Capturar y prevenir el arrastrar de imágenes solo en el carrusel
    const handleDragStart = (e) => {
      e.preventDefault();
    };
   
    // Capturar teclas para prevenir combinaciones como Ctrl+S solo en el carrusel
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) &&
          (e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        return false;
      }
    };

    const carouselElement = carouselRef.current;
    
    if (carouselElement) {
      // Añadir event listeners solo al carrusel
      carouselElement.addEventListener('contextmenu', handleContextMenu);
      carouselElement.addEventListener('dragstart', handleDragStart);
      carouselElement.addEventListener('keydown', handleKeyDown);
     
      // Limpiar event listeners al desmontar
      return () => {
        carouselElement.removeEventListener('contextmenu', handleContextMenu);
        carouselElement.removeEventListener('dragstart', handleDragStart);
        carouselElement.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, []);
   
  return (
    <Carousel ref={carouselRef}>
      <CarouselContent className="h-[35vh] md:h-[40vh] lg:max-h-[65vh] lg:h-auto lg:rounded-xl bg-third-400">
        {images.map((img, index) => (
          <CarouselItem key={index} className="relative">
            {/* Imagen real con object-fit para evitar deformación */}
            <img
              src={img}
              alt="Imagen del inmueble"
              className="w-full h-full object-cover"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              style={{ pointerEvents: isClient ? 'none' : 'auto' }}
            />
           
            {/* Marca de agua */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-3xl md:text-4xl lg:text-5xl font-bold opacity-40 rotate-[-30deg] select-none">
                tuarriendo.com.co
              </div>
            </div>
           
            {/* Capa de protección sobre toda la imagen */}
            <div
              className="absolute inset-0 z-10"
              onContextMenu={(e) => e.preventDefault()}
              onClick={(e) => e.stopPropagation()}
              style={{ cursor: 'default' }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 absolute z-20"/>
      <CarouselNext className="right-8 absolute z-20"/>
    </Carousel>
  );
}

export default CustomCarousel;