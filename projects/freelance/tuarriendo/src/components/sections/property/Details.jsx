"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProperty } from "@/lib/db_functions";
import { Skeleton } from "@/components/ui/skeleton";
import { RiBuilding2Line } from "react-icons/ri";
import { PiStarFill } from "react-icons/pi";
import CustomCarousel from './CustomCarousel'
import { Map, APIProvider, AdvancedMarker } from "@vis.gl/react-google-maps";

const formatPriceToCOP = (precio) => {
  return precio
    .toLocaleString("es-CO", { style: "currency", currency: "COP" })
    .replace(",00", "");
};

// Mapeo de ciudades para traducir correctamente
const cityTranslations = {
  "bogota": "Bogotá",
  "ibague": "Ibagué",
  "armenia": "Armenia",
  "manizales": "Manizales",
  "pereira": "Pereira"
};

// Mapeo de comodidades en inglés a español con íconos
const amenitiesTranslations = {
  "pool": { name: "Piscina", icon: "🏊‍♀️" },
  "gym": { name: "Gimnasio", icon: "💪" },
  "parking": { name: "Estacionamiento", icon: "🚗" },
  "security": { name: "Seguridad 24/7", icon: "🔒" },
  "pet_friendly": { name: "Admite mascotas", icon: "🐕" },
  "furnished": { name: "Amoblado", icon: "🛋️" },
  "balcony": { name: "Balcón", icon: "🌅" },
  "garden": { name: "Jardín", icon: "🌳" },
  "bbq": { name: "Zona de BBQ", icon: "🔥" },
  "playground": { name: "Área de juegos", icon: "🎪" },
  "laundry": { name: "Lavandería", icon: "👕" },
  "elevator": { name: "Ascensor", icon: "🛗" },
  "storage": { name: "Bodega", icon: "📦" }
};

// Mapeo de tipos de propiedades en inglés a español
const propertyTypeTranslations = {
  "apartment": "Apartamento",
  "house": "Casa",
  "studio": "Apartaestudio",
  "local": "Local",
  "office": "Oficina",
  "medical": "Consultorio",
  "roomie": "Roomie"
};

// Componente para mostrar una reseña individual
const ReviewCard = ({ review }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Obtener solo el nombre (antes del @) o usar "Usuario anónimo"
  const getDisplayName = (userName) => {
    if (!userName) return 'Usuario anónimo';
    if (userName.includes('@')) {
      return userName.split('@')[0];
    }
    return userName;
  };

  return (
    <div className="bg-third-200 p-6 rounded-lg border-2 border-secondary-500">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
        <div>
          <h4 className="font-semibold text-primary-500 text-lg">
            {/*getDisplayName(review.userName)*/}
            Anónimo
          </h4>
          <p className="text-sm text-gray-500">
            {formatDate(review.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {[1, 2, 3, 4, 5].map((star) => (
            <PiStarFill
              key={star}
              className={`text-lg ${
                star <= review.rating ? 'text-secondary-500' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm font-medium text-gray-600 whitespace-nowrap">
            {review.rating}/5
          </span>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">
        {review.comment}
      </p>
      {review.updatedAt && review.updatedAt !== review.createdAt && (
        <p className="text-xs text-gray-400 mt-2">
          Editado el {formatDate(review.updatedAt)}
        </p>
      )}
    </div>
  );
};

// Componente para mostrar el resumen de calificaciones
const ReviewsSummary = ({ reviews }) => {
  const reviewsArray = Object.values(reviews);
  const totalReviews = reviewsArray.length;
  const averageRating = reviewsArray.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

  // Contar reseñas por estrellas
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => 
    reviewsArray.filter(review => review.rating === rating).length
  );

  return (
    <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-6 mx-4 lg:mx-0 rounded-lg border-2 border-primary-200 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
            <span className="text-4xl font-bold text-primary-500">
              {averageRating.toFixed(1)}
            </span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <PiStarFill
                  key={star}
                  className={`text-xl ${
                    star <= Math.round(averageRating) ? 'text-secondary-500' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600 font-medium">
            Basado en {totalReviews} reseña{totalReviews !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex-1 lg:max-w-sm">
          {ratingCounts.map((count, index) => {
            const stars = 5 - index;
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            
            return (
              <div key={stars} className="flex items-center gap-3 mb-2">
                <span className="text-sm text-gray-600 w-16 whitespace-nowrap">
                  {stars} estrella{stars !== 1 ? 's' : ''}
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-secondary-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function PropertyInfo() {
  const { id } = useParams();
  const [data, setData] = useState(undefined);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const propertyData = await getProperty(id);

      if (!propertyData) {
        setFetchError(true);
      } else {
        setData(propertyData);
      }
    };

    fetchData();
  }, []);

  // Función para traducir ciudad
  const translateCity = (city) => {
    return cityTranslations[city.toLowerCase()] || city;
  };

  // Función para traducir comodidades
  const translateAmenity = (amenity) => {
    return amenitiesTranslations[amenity] || { name: amenity, icon: "🏠" };
  };

  // Función para traducir tipo de propiedad
  const translatePropertyType = (type) => {
    return propertyTypeTranslations[type] || type;
  };
  
  // Función para mostrar barrio y ciudad
  const formatLocation = (neighborhood, city) => {
    if (neighborhood && neighborhood.trim() !== "") {
      return `Barrio ${neighborhood}, ${translateCity(city)}`;
    }
    return translateCity(city);
  };

  // Verificar si hay reseñas
  const hasReviews = data?.reviews && Object.keys(data.reviews).length > 0;

  return (
    <div>
      {fetchError ? (
        <div className="min-h-screen">
          <p>Hubo un error al obtener la información</p>
        </div>
      ) : data ? (
        <div>
          <div className="flex flex-col w-full min-h-screen lg:w-[65vw] lg:max-w-[100rem] lg:pt-20 lg:px-16">
          <div className="w-full min-h-[35vh] md:min-h-[40vh] lg:min-h-[65vh]">
            <CustomCarousel images={data.images?.length > 0 ? data.images : ["/placeholder.webp"]} />
          </div>
            <div className="bg-third-200 w-full -mt-8 z-10 pb-20 rounded-t-2xl pt-8 px-8 md:px-12 lg:px-0 lg:-mt-0 lg:rounded-none">
              <p className="text-xl font-semibold text-black/50 md:text-2xl lg:hidden mb-6">
                {translatePropertyType(data.type)}
              </p>
              <p className="text-3xl font-semibold text-primary-500 hidden lg:block mb-8">
                {translatePropertyType(data.type)} en {data.neighborhood ? `${data.neighborhood}, ` : ''}{translateCity(data.city)} - {formatPriceToCOP(data.price)}
              </p>
              <p className="my-6 text-primary-500 text-3xl font-semibold md:text-4xl lg:hidden">
                {formatPriceToCOP(data.price)}
              </p>
              <p className="text-xl font-semibold text-black/50 md:text-2xl lg:hidden mb-8">
                {formatLocation(data.neighborhood, data.city)}
              </p>
              <div className="w-full p-6 flex flex-col md:flex-row md:py-0 items-center border-2 border-secondary-500 rounded-xl mt-8 md:px-0 lg:mt-10 mx-4 lg:mx-0">
                <div className="flex items-center gap-5 mb-5 md:px-8 md:mb-0">
                  <RiBuilding2Line className="text-5xl text-primary-500" />
                  <div className="flex flex-col items-center">
                    <p className="text-2xl font-semibold text-primary-500">
                      {data.squareMeters}m²
                    </p>
                    <p className="font-semibold text-sm text-black/50">
                      Área construida
                    </p>
                  </div>
                </div>
                <div className="flex w-full pt-5 border-t-2 md:border-none border-secondary-500 items-center justify-between md:px-0 md:py-0 md:flex-1">
                  <div className="flex flex-col items-center md:border-l-2 md:border-r-2 md:border-secondary-500 md:px-8 md:py-3 md:flex-1">
                    <p className="text-primary-500 text-2xl font-semibold">
                      {data.bathrooms}
                    </p>
                    <p className="text font-medium text-black/50">baños</p>
                  </div>
                  <div className="flex md:flex-1 flex-col items-center md:border-r-2 md:border-secondary-500 md:px-8 md:py-3">
                    <p className="text-primary-500 text-2xl font-semibold">
                      {data.rooms}
                    </p>
                    <p className="text font-medium text-black/50">
                      habitaciones
                    </p>
                  </div>
                  <div className="flex md:flex-1 flex-col items-center md:px-8 md:py-3">
                    <p className="text-primary-500 text-2xl font-semibold">
                      {data.strata}
                    </p>
                    <p className="text font-medium text-black/50">estrato</p>
                  </div>
                </div>
              </div>
              <div className="w-full mt-20 mx-4 lg:mx-0">
                <h2 className="text-center my-10 font-semibold text-2xl text-primary-500 lg:text-left lg:text-3xl">
                  Detalles del inmueble:
                </h2>
                <ul className="text-xl font-medium text-black/75 list-disc px-4 flex flex-col gap-3 lg:text-2xl">
                  {data.strata && <li>Estrato: {data.strata}</li>}
                  {data.squareMeters && <li>Área construida: {data.squareMeters}m²</li>}
                  {data.state && <li>Estado: {data.state}</li>}
                  {data.age && <li>Antigüedad: {data.age}</li>}
                  {data.type && <li>Tipo de inmueble: {translatePropertyType(data.type)}</li>}
                  {data.rooms && <li>Número de habitaciones: {data.rooms}</li>}
                  {data.bathrooms && <li>Número de baños: {data.bathrooms}</li>}
                  <li>
                    Parqueaderos: {data.parkings ? data.parkings : "ninguno"}
                  </li>
                </ul>
              </div>
              <div className="w-full mt-20 mx-4 lg:mx-0">
                <h2 className="text-center my-10 font-semibold text-2xl text-primary-500 lg:text-left lg:text-3xl">
                  Comodidades:
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {data.amenities.map((amenity) => {
                    const amenityData = translateAmenity(amenity);
                    return (
                      <div key={amenity} className="bg-white border-2 border-secondary-500 rounded-lg p-4 text-center hover:bg-secondary-50 transition-colors">
                        <div className="text-3xl mb-2">{amenityData.icon}</div>
                        <p className="text-sm font-medium text-primary-500">{amenityData.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Sección de Reseñas */}
              {hasReviews && (
                <div className="w-full mt-20">
                  <h2 className="text-center my-10 font-semibold text-2xl text-primary-500 lg:text-left lg:text-3xl mx-4 lg:mx-0">
                    Reseñas y Calificaciones:
                  </h2>
                  
                  {/* Resumen de calificaciones */}
                  <ReviewsSummary reviews={data.reviews} />
                  
                  {/* Lista de reseñas */}
                  <div className="space-y-6 mx-4 lg:mx-0">
                    {Object.values(data.reviews)
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                      .map((review, index) => (
                        <ReviewCard key={review.userId || index} review={review} />
                      ))}
                  </div>
                </div>
              )}
              
              <div className="mt-20 mx-4 lg:mx-0">
                <h2 className="text-center my-10 font-semibold text-2xl text-primary-500 lg:text-left lg:text-3xl">
                  Ubicación:
                </h2>
                <div className="w-full h-60 lg:h-96">
                  <APIProvider
                    className="w-full h-full"
                    apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
                  >
                    <Map
                      id="map"
                      defaultCenter={{
                        lat: data.marker.lat,
                        lng: data.marker.lng,
                      }}
                      defaultZoom={15}
                      mapId={process.env.NEXT_PUBLIC_MAP_ID}
                      scrollwheel={true}
                    >
                      {/* Aquí se agrega el marcador */}
                      <AdvancedMarker
                        position={{
                          lat: data.marker.lat,
                          lng: data.marker.lng,
                        }}
                      />
                    </Map>
                  </APIProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full min-h-screen flex flex-col lg:w-[65vw] lg:max-w-[100rem] lg:pt-20 lg:px-16">
          <div className="flex flex-col w-full bg-gray-500 lg:bg-transparent lg:rounded-xl">
            <Skeleton className="w-full h-[35vh] md:h-[40vh] lg:h-[65vh] lg:rounded-xl bg-third-400 object-cover" />
            <div className="bg-third-200 w-full -mt-8 z-10 pb-20 rounded-t-2xl pt-6 px-8 md:px-12 lg:px-0 lg:-mt-0 lg:rounded-none">
              <Skeleton className="w-32 h-8 rounded-md bg-third-400 lg:hidden" />
              <Skeleton className="w-full lg:w-3/5 h-12 rounded-md mt-6 lg:mt-0 bg-third-400" />
              <Skeleton className="w-3/4 h-10 rounded-md mt-6 lg:mt-0 bg-third-400 lg:hidden" />
              <Skeleton className="w-full h-36 lg:h-24 mt-10 rounded-xl bg-third-400" />
              <Skeleton className="w-3/4 h-10 rounded-md mt-10 lg:mt-0 bg-third-400 lg:hidden" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyInfo;