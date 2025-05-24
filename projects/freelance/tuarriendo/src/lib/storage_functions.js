"use client";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import { app } from "./firebase.config"; // Asegúrate de que firebase.config exporte app

// Inicializar Storage
const storage = getStorage(app);

/**
 * Sube una imagen a Firebase Storage y devuelve su URL pública
 * @param {File} file - El archivo de imagen a subir
 * @param {string} path - La ruta dentro de Storage (ej: "properties/")
 * @returns {Promise<string>} - URL pública de la imagen
 */
export const uploadImage = async (file, path = "images/") => {
  try {
    if (!file) {
      throw new Error("No se proporcionó ningún archivo");
    }

    // Crear una referencia única para la imagen usando timestamp y nombre original
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
    const storageRef = ref(storage, `${path}${fileName}`);
    
    // Subir la imagen
    const snapshot = await uploadBytes(storageRef, file);
    
    // Obtener la URL pública
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error("Error al subir imagen:", error);
    throw error;
  }
};

/**
 * Sube múltiples imágenes a Firebase Storage y devuelve un array con sus URLs públicas
 * @param {File[]} files - Array de archivos de imagen a subir
 * @param {string} path - La ruta dentro de Storage (ej: "properties/")
 * @param {Function} progressCallback - Función opcional para reportar el progreso (recibe un número del 0 al 100)
 * @returns {Promise<string[]>} - Array de URLs públicas
 */
export const uploadMultipleImages = async (files, path = "images/", progressCallback = null) => {
  try {
    if (!files || files.length === 0) {
      return [];
    }
    
    const urls = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = await uploadImage(file, path);
      urls.push(url);
      
      // Reportar progreso si se proporcionó una función de callback
      if (progressCallback && typeof progressCallback === 'function') {
        const progress = Math.round(((i + 1) / files.length) * 100);
        progressCallback(progress);
      }
    }
    
    return urls;
  } catch (error) {
    console.error("Error al subir múltiples imágenes:", error);
    throw error;
  }
};

/**
 * Elimina una imagen de Firebase Storage por su URL
 * @param {string} url - URL de la imagen a eliminar
 * @returns {Promise<boolean>} - true si se eliminó correctamente
 */
export const deleteImage = async (url) => {
  try {
    // Extraer la ruta del storage de la URL
    const storageRef = ref(storage, extractPathFromUrl(url));
    
    // Eliminar el archivo
    await deleteObject(storageRef);
    
    return true;
  } catch (error) {
    console.error("Error al eliminar imagen:", error);
    return false;
  }
};

/**
 * Extrae la ruta del storage de una URL de Firebase Storage
 * @param {string} url - URL completa de Firebase Storage
 * @returns {string} - Ruta relativa en Storage
 */
const extractPathFromUrl = (url) => {
  try {
    // La URL de Firebase Storage tiene este formato:
    // https://firebasestorage.googleapis.com/v0/b/PROJECT_ID.appspot.com/o/PATH?token=TOKEN
    const encodedPath = url.split('/o/')[1].split('?')[0];
    const path = decodeURIComponent(encodedPath);
    return path;
  } catch (error) {
    console.error("Error al extraer ruta de URL:", error);
    return '';
  }
};

/**
 * Función para reemplazar los placeholders de imágenes con URLs reales después de subir las imágenes
 * @param {Object} data - Datos del formulario con placeholders
 * @param {File[]} files - Array de archivos de imágenes
 * @param {string} path - Ruta de Storage
 * @param {Function} progressCallback - Callback para reportar progreso
 * @returns {Promise<Object>} - Datos del formulario con URLs reales
 */
export const processFormWithImages = async (data, files, path = "properties/", progressCallback = null) => {
  try {
    // Si no hay archivos, devolver los datos sin modificar
    if (!files || files.length === 0) {
      return data;
    }
    
    // Subir las imágenes y obtener las URLs
    const imageUrls = await uploadMultipleImages(files, path, progressCallback);
    
    // Crear una copia del objeto de datos
    const processedData = { ...data };
    
    // Reemplazar el array de imágenes con las URLs reales
    processedData.images = imageUrls;
    
    return processedData;
  } catch (error) {
    console.error("Error al procesar formulario con imágenes:", error);
    throw error;
  }
};