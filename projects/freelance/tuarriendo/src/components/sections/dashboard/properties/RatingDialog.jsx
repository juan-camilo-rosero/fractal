"use client";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { PiStarDuotone, PiStarFill } from "react-icons/pi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { addPropertyReview, getPropertyReview, getUserId, updatePropertyReview } from "@/lib/db_functions";

const RatingDialog = ({ property, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [existingReview, setExistingReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userId, setUserId] = useState(""); // Cambiado de 'id' a 'userId' para mayor claridad
  const { user } = useContext(UserContext);

  // Obtener el ID del usuario cuando el usuario esté disponible
  useEffect(() => {
    const fetchUserId = async () => {
      if (user?.email && !userId) {
        try {
          const id = await getUserId(user.email);
          setUserId(id);
        } catch (err) {
          console.error("Error al obtener ID del usuario:", err);
          setError("Error al cargar la información del usuario");
        }
      }
    };

    fetchUserId();
  }, [user?.email, userId]);

  // Debug: Agregar logs para verificar los datos
  useEffect(() => {
    console.log("Debug - Usuario:", user);
    console.log("Debug - Propiedad:", property);
    console.log("Debug - UserId:", userId);
  }, [user, property, userId]);

  // Cargar reseña existente cuando se abre el dialog y tenemos userId
  useEffect(() => {
    const loadExistingReview = async () => {
      if (isOpen && userId && property?.id) {
        try {
          setIsLoading(true);
          const review = await getPropertyReview(property.id, userId);
          if (review) {
            setExistingReview(review);
            setRating(review.rating);
            setComment(review.comment || "");
          } else {
            // Reset si no hay reseña existente
            setExistingReview(null);
            setRating(0);
            setComment("");
          }
        } catch (err) {
          console.error("Error al cargar reseña:", err);
          setError("Error al cargar la reseña existente");
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadExistingReview();
  }, [isOpen, userId, property?.id]);

  const handleSubmit = async () => {
    // Validaciones
    if (rating === 0) {
      setError("Por favor selecciona una calificación");
      return;
    }

    if (comment.trim().length < 10) {
      setError("El comentario debe tener al menos 10 caracteres");
      return;
    }

    if (!userId) {
      setError("Error: No se pudo obtener la información del usuario");
      return;
    }

    if (!property?.id) {
      setError("Error: Información de la propiedad no válida");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const reviewData = {
        rating: rating,
        comment: comment.trim(),
        userId,
        userName: user.name || user.email,
        propertyId: property.id,
        createdAt: new Date().toISOString(),
      };

      let success = false;
      if (existingReview) {
        // Actualizar reseña existente
        reviewData.updatedAt = new Date().toISOString();
        success = await updatePropertyReview(property.id, userId, reviewData);
      } else {
        // Crear nueva reseña
        success = await addPropertyReview(property.id, reviewData);
      }

      if (success) {
        setSuccess(existingReview ? "Reseña actualizada correctamente" : "Reseña enviada correctamente");
        setTimeout(() => {
          setIsOpen(false);
          setSuccess("");
        }, 2000);
      } else {
        setError("Error al guardar la reseña. Inténtalo de nuevo.");
      }
    } catch (err) {
      console.error("Error al enviar reseña:", err);
      setError("Error al enviar la reseña. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setError("");
    setSuccess("");
    // No resetear los campos aquí, se resetearán cuando se vuelva a abrir
  };

  const StarRating = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="text-2xl hover:scale-110 transition-transform"
            disabled={isLoading}
          >
            {star <= rating ? (
              <PiStarFill className="text-secondary-500" />
            ) : (
              <PiStarDuotone className="text-gray-300 hover:text-secondary-200" />
            )}
          </button>
        ))}
      </div>
    );
  };

  // No mostrar el dialog si no tenemos la información básica del usuario
  if (!user?.email) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setIsOpen(true)}>
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {existingReview ? "Editar calificación" : "Calificar propiedad"}
          </DialogTitle>
          <DialogDescription>
            {existingReview 
              ? "Modifica tu calificación y comentario sobre esta propiedad"
              : "Comparte tu experiencia con esta propiedad"
            }
          </DialogDescription>
        </DialogHeader>

        {(isLoading || !userId) && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        )}

        {!isLoading && userId && (
          <div className="grid gap-4 py-4">
            {/* Información de la propiedad */}
            <div className="bg-gray-50 p-3 rounded-md">
              <h4 className="font-medium text-sm text-gray-700">Propiedad:</h4>
              <p className="text-sm">{property?.address || "Dirección no disponible"}</p>
            </div>

            {/* Calificación con estrellas */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Calificación <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <StarRating />
                <span className="text-sm text-gray-600 ml-2">
                  {rating > 0 ? `${rating} estrella${rating > 1 ? 's' : ''}` : 'Sin calificar'}
                </span>
              </div>
            </div>

            {/* Comentario */}
            <div className="space-y-2">
              <label htmlFor="comment" className="text-sm font-medium">
                Comentario <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="comment"
                placeholder="Comparte tu experiencia con esta propiedad (mínimo 10 caracteres)..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="resize-none"
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500">
                {comment.length}/500 caracteres
              </p>
            </div>

            {/* Mensajes de error y éxito */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !userId || rating === 0 || comment.trim().length < 10}
          >
            {isLoading 
              ? "Guardando..." 
              : existingReview 
                ? "Actualizar reseña" 
                : "Enviar reseña"
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RatingDialog;