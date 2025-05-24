"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PiImageDuotone } from "react-icons/pi";
import { uploadMultipleImages } from "@/lib/storage_functions";
import { FaTrash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function ImageInput({ images, onImagesChange }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (selectedFiles.length > 0) {
      const newPreviewImages = Array.from(selectedFiles).map(file => ({
        url: URL.createObjectURL(file),
        file: file,
        name: file.name
      }));
      
      setPreviewImages(newPreviewImages);
      
      // Iniciar la carga automáticamente cuando se seleccionan archivos
      handleUpload(selectedFiles);
    }

    return () => {
      previewImages.forEach(preview => URL.revokeObjectURL(preview.url));
    };
  }, [selectedFiles]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      // No es necesario llamar a handleUpload aquí ya que se ejecutará en el useEffect
    }
  };

  const handleRemovePreview = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setSelectedFiles(prev => {
      const newFiles = Array.from(prev);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleRemoveUploaded = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onImagesChange(newImages);
  };

  const handleUpload = async (filesToUpload) => {
    if (!filesToUpload || filesToUpload.length === 0) return;
    
    setIsUploading(true);
    setProgress(0);
    
    try {
      const progressCallback = (progressValue) => {
        setProgress(progressValue);
      };
      
      const imageUrls = await uploadMultipleImages(
        filesToUpload, 
        "properties/", 
        progressCallback
      );

      console.log("Imágenes subidas:", imageUrls);
      
      // Actualizar el array de imágenes en el componente padre
      const updatedImages = [...(images || []), ...imageUrls];
      onImagesChange(updatedImages);
    } catch (error) {
      console.error("Error al subir imágenes:", error);
    } finally {
      setIsUploading(false);
      // Limpiar los archivos seleccionados y previsualizaciones después de completar la carga
      setSelectedFiles([]);
      setPreviewImages([]);
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="images" className="text-xl font-semibold">
        Imágenes
      </Label>
      
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purpus-blue-500 pointer-events-none z-10">
          <PiImageDuotone size={20} />
        </div>
        <Input
          id="images"
          type="file"
          multiple
          accept="image/*"
          className="w-full pl-10 py-3 !h-auto"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </div>
      
      {isUploading && (
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <AiOutlineLoading3Quarters className="animate-spin text-purpus-blue-500" />
          <span>Subiendo imágenes... {progress}%</span>
        </div>
      )}
      
      {previewImages.length > 0 && !isUploading && (
        <div className="space-y-2">
          <div className="text-sm text-gray-500">
            {previewImages.length} archivo(s) seleccionado(s)
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
            {previewImages.map((preview, index) => (
              <div key={index} className="relative rounded-md overflow-hidden border">
                <img 
                  src={preview.url} 
                  alt={`Preview ${index}`} 
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePreview(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  disabled={isUploading}
                >
                  <FaTrash size={12} />
                </button>
                <div className="p-1 text-xs truncate bg-gray-100">
                  {preview.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {images && images.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium">Imágenes subidas ({images.length})</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((url, index) => (
              <div key={index} className="relative rounded-md overflow-hidden border">
                <img 
                  src={url} 
                  alt={`Uploaded ${index}`} 
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveUploaded(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageInput;