"use client";
import { db } from "./firebase.config";
import {
  collection,
  doc,
  query,
  where,
  setDoc,
  updateDoc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

// Función para agregar un documento a la colección
const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (e) {
    console.error("Error al crear documento: ", e);
  }
};

// Función para agregar un documento con un ID personalizado
const addDocumentWithCustomId = async (collectionName, data, customId) => {
  try {
    const docRef = doc(collection(db, collectionName), customId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      alert("Ya existe otro artículo con ese título");
      return null;
    } else {
      await setDoc(docRef, data);
      return customId;
    }
  } catch (e) {
    console.error("Error al crear el documento: ", e);
  }
};

// Función para obtener todos los documentos de una colección
const getAllDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return documents;
  } catch (e) {
    console.error("Error al obtener documentos: ", e);
    return [];
  }
};

// Función para obtener múltiples documentos por sus IDs en el mismo orden del array de IDs
const getDocumentsByIds = async (collectionName, ids) => {
  try {
    const promises = ids.map(async (id) => {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log(`No existe el documento con id: ${id}`);
        return null;
      }
    });

    const documents = await Promise.all(promises);

    // Filtra documentos nulos en caso de que algún ID no exista
    return documents.filter((doc) => doc !== null);
  } catch (e) {
    console.error("Error al obtener documentos por IDs: ", e);
    return [];
  }
};

// Función para actualizar un documento que cumpla una condición (query)
const updateDocumentWithQuery = async (
  collectionName,
  key,
  operator,
  value,
  updates
) => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where(key, operator, value));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(
        "No se encontró ningún documento que cumpla con la condición."
      );
      return;
    }

    // Actualiza el primer documento que cumpla con la condición
    const docRef = querySnapshot.docs[0].ref;
    await updateDoc(docRef, updates);

    console.log("Documento actualizado correctamente.");
  } catch (e) {
    console.error("Error al actualizar documento con query: ", e);
  }
};

// Función para obtener un documento por su ID
const getDocument = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No existe el documento " + id);
      return undefined;
    }
  } catch (e) {
    console.error("Error al obtener documento ", e);
  }
};

// Función para actualizar un documento
const updateDocument = async (collectionName, id, updates) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, updates);
  } catch (e) {
    console.error("Error al actualizar documento ", e);
  }
};

// Función para agregar un elemento a un array en un documento
const addArrItem = async (collectionName, id, key, newData) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      [key]: arrayUnion(newData),
    });
  } catch (e) {
    console.error("Error al actualizar documento ", e);
  }
};

// Función para eliminar un elemento de un array en un documento
const removeArrItem = async (collectionName, id, key, newData) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      [key]: arrayRemove(newData),
    });
  } catch (e) {
    console.error("Error al actualizar documento ", e);
  }
};

// Función para obtener documentos con una query
const getDocumentsWithQuery = async (collectionName, key, operator, value) => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where(key, operator, value));

    const querySnapshot = await getDocs(q);

    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });

    return results;
  } catch (e) {
    console.error("Error al obtener documentos con query ", e);
  }
};

// Función para eliminar un documento
const deleteDocument = async (collectionName, id) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
  } catch (e) {
    console.error("Error al eliminar documento ", e);
  }
};

// Función para verificar si existe un documento por su ID
const documentExists = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    return docSnap.exists();
  } catch (e) {
    console.error("Error al verificar la existencia del documento: ", e);
    return false;
  }
};

// Función para verificar si existe un documento con un valor en un campo específico
const documentWithFieldExists = async (collectionName, key, value) => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where(key, "==", value));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty; // Retorna true si hay resultados, false si no
  } catch (e) {
    console.error("Error al verificar la existencia del documento: ", e);
    return false;
  }
};

/*-------------------------------- Nuevas Funciones --------------------------------*/

// Obtiene las propiedades de un usuario a partir de su ID
export const getUserProperties = async (id) => {
  try {
    // Primero obtenemos el usuario para conseguir su array de propiedades
    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.error("No existe el usuario con id:", id);
      return [];
    }

    const userData = userSnap.data();
    const propertyIds = userData.properties || [];

    // Si el usuario no tiene propiedades, retornamos un array vacío
    if (propertyIds.length === 0) {
      return [];
    }

    // Obtenemos todas las propiedades usando la función auxiliar
    const properties = await getDocumentsByIds("properties", propertyIds);
    return properties;
  } catch (e) {
    console.error("Error al obtener las propiedades del usuario:", e);
    return [];
  }
};

// Obtiene las propiedades arrendadas de un usuario a partir de su ID
export const getUserLessedProperties = async (id) => {
  try {
    // Primero obtenemos el usuario para conseguir su array de propiedades
    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.error("No existe el usuario con id:", id);
      return [];
    }

    const userData = userSnap.data();
    const propertyIds = userData.lessedProperties || [];

    console.log(propertyIds);
    console.log("-----------------");
    console.log(userData);

    // Si el usuario no tiene propiedades arrendadas, retornamos un array vacío
    if (propertyIds.length === 0) {
      return [];
    }

    // Obtenemos todas las propiedades usando la función auxiliar
    const properties = await getDocumentsByIds("properties", propertyIds);
    return properties;
  } catch (e) {
    console.error("Error al obtener las propiedades del usuario:", e);
    return [];
  }
};

// Crea una nueva propiedad y la asocia con el usuario
export const createProperty = async (userId, data) => {
  try {
    // Validar que el usuario existe
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.error("No existe el usuario con id:", userId);
      return null;
    }

    // Verificar si el usuario aún tiene propiedades disponibles para crear
    const userData = userSnap.data();
    if (
      userData.missingProperties !== undefined &&
      userData.missingProperties <= 0
    ) {
      console.error("El usuario ha alcanzado su límite de propiedades");
      return null;
    }

    // Crear la propiedad con los datos recibidos
    const propertyData = {
      ...data,
      owner: userId,
      // Aseguramos que los tipos de datos sean correctos
      age: parseInt(data.age),
      bathrooms: parseInt(data.bathrooms),
      price: parseFloat(data.price || data.rent), // Aceptamos tanto price como rent
      rooms: parseInt(data.rooms),
      squareMeters: parseFloat(data.squareMeters),
      parking: parseInt(data.parking || 0),
      // Aseguramos que amenities e images sean arrays
      amenities: Array.isArray(data.amenities) ? data.amenities : [],
      images: Array.isArray(data.images) ? data.images : [],
      // Aseguramos que el marker tenga lat y lng como números
      marker: {
        lat: parseFloat(data.marker?.lat || 0),
        lng: parseFloat(data.marker?.lng || 0),
      },
      // Añadimos fecha de creación
      createdAt: new Date().toISOString(),
    };

    // Crear la propiedad en Firestore
    const propertyRef = await addDoc(
      collection(db, "properties"),
      propertyData
    );
    const propertyId = propertyRef.id;

    // Crear el marker con la misma ID que la propiedad - INCLUYE EL TIPO
    const markerData = {
      lat: propertyData.marker.lat,
      lng: propertyData.marker.lng,
      price: propertyData.price,
      type: propertyData.type, // ← NUEVO: Agregamos el tipo de propiedad
      id: propertyId,
    };
    await setDoc(doc(db, "markers", propertyId), markerData);

    // Actualizar el array de propiedades del usuario y disminuir missingProperties
    const userUpdates = {
      properties: arrayUnion(propertyId),
    };

    // Solo decrementamos missingProperties si existe y es mayor que 0
    if (
      userData.missingProperties !== undefined &&
      userData.missingProperties > 0
    ) {
      userUpdates.missingProperties = userData.missingProperties - 1;
    }

    await updateDoc(userRef, userUpdates);

    return propertyId;
  } catch (e) {
    console.error("Error al crear la propiedad:", e);
    return null;
  }
};

// Actualiza una propiedad existente
export const updateProperty = async (id, data) => {
  try {
    const propertyRef = doc(db, "properties", id);
    const propertySnap = await getDoc(propertyRef);

    if (!propertySnap.exists()) {
      console.error("No existe la propiedad con id:", id);
      return false;
    }

    const updatedData = {};

    if (data.age !== undefined) updatedData.age = parseInt(data.age);
    if (data.bathrooms !== undefined)
      updatedData.bathrooms = parseInt(data.bathrooms);
    if (data.price !== undefined) updatedData.price = parseFloat(data.price);
    if (data.rooms !== undefined) updatedData.rooms = parseInt(data.rooms);
    if (data.squareMeters !== undefined)
      updatedData.squareMeters = parseFloat(data.squareMeters);
    if (data.amenities !== undefined)
      updatedData.amenities = Array.isArray(data.amenities)
        ? data.amenities
        : [];
    if (data.images !== undefined)
      updatedData.images = Array.isArray(data.images) ? data.images : [];
    if (data.city !== undefined) updatedData.city = data.city;
    if (data.neighborhood !== undefined)
      updatedData.neighborhood = data.neighborhood;
    if (data.state !== undefined) updatedData.state = data.state;
    if (data.strata !== undefined) updatedData.strata = data.strata;
    if (data.type !== undefined) updatedData.type = data.type;

    // Actualizar marker si hay cambios en marker, price o type
    if (data.marker || data.price !== undefined || data.type !== undefined) {
      const markerRef = doc(db, "markers", id);
      const markerUpdates = {};

      if (data.marker) {
        markerUpdates.lat = parseFloat(data.marker.lat);
        markerUpdates.lng = parseFloat(data.marker.lng);
        updatedData.marker = {
          lat: parseFloat(data.marker.lat),
          lng: parseFloat(data.marker.lng),
        };
      }

      if (data.price !== undefined) {
        markerUpdates.price = parseFloat(data.price);
      }

      // ← NUEVO: Actualizar el tipo en el marker también
      if (data.type !== undefined) {
        markerUpdates.type = data.type;
      }

      await updateDoc(markerRef, markerUpdates);
    }

    await updateDoc(propertyRef, updatedData);
    return true;
  } catch (e) {
    console.error("Error al actualizar la propiedad:", e);
    return false;
  }
};

// Elimina una propiedad y la quita del array del propietario
export const deleteProperty = async (id) => {
  try {
    // Obtenemos la propiedad para identificar al propietario
    const propertyRef = doc(db, "properties", id);
    const propertySnap = await getDoc(propertyRef);

    if (!propertySnap.exists()) {
      console.error("No existe la propiedad con id:", id);
      return false;
    }

    const propertyData = propertySnap.data();
    const ownerId = propertyData.owner;

    // Eliminar la propiedad del array del propietario
    if (ownerId) {
      const userRef = doc(db, "users", ownerId);
      await updateDoc(userRef, {
        properties: arrayRemove(id),
      });
    }

    // Eliminar el documento de la propiedad
    await deleteDoc(propertyRef);

    // Eliminar el marker asociado
    const markerRef = doc(db, "markers", id);
    await deleteDoc(markerRef);

    return true;
  } catch (e) {
    console.error("Error al eliminar la propiedad:", e);
    return false;
  }
};

// Función para obtener una propiedad por su ID
export const getProperty = async (id) => {
  try {
    const propertyRef = doc(db, "properties", id);
    const propertySnap = await getDoc(propertyRef);

    if (propertySnap.exists()) {
      return { id: propertySnap.id, ...propertySnap.data() };
    } else {
      console.error("No existe la propiedad con id:", id);
      return null;
    }
  } catch (e) {
    console.error("Error al obtener la propiedad:", e);
    return null;
  }
};

// Crea un nuevo usuario
export const createUser = async (data) => {
  try {
    // Verificar si ya existe un usuario con ese email
    const userExists = await documentWithFieldExists(
      "users",
      "email",
      data.email
    );
    if (userExists) {
      console.error("Ya existe un usuario con ese email");
      return null;
    }

    // Preparamos los datos del usuario
    const userData = {
      email: data.email,
      hasPermission: data.hasPermission || false,
      name: data.name,
      properties: data.properties || [],
      lessedProperties: data.lessedProperties || [],
      role: data.role || "propietario",
      phone: data.phone || "",
      idNumber: data.idNumber || "",
      missingProperties: data.missingProperties,
    };

    // Validamos que el rol sea uno de los permitidos
    const validRoles = [
      "propietario",
      "inmobiliaria",
      "agente inmobiliario",
      "arrendatario",
    ];
    if (!validRoles.includes(userData.role)) {
      userData.role = "propietario"; // Valor por defecto si el rol no es válido
    }

    // Crear el usuario en Firestore
    const userRef = await addDoc(collection(db, "users"), userData);
    return userRef.id;
  } catch (e) {
    console.error("Error al crear el usuario:", e);
    return null;
  }
};

// Obtiene la información de un usuario por su email
export const getUserData = async (email) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No existe usuario con el email:", email);
      return null;
    }

    // Retornamos el primer usuario que coincida con el email
    const userDoc = querySnapshot.docs[0];
    return {
      id: userDoc.id,
      ...userDoc.data(),
    };
  } catch (e) {
    console.error("Error al obtener usuario por email:", e);
    return null;
  }
};

// Actualiza los datos de un usuario
export const updateUser = async (id, data) => {
  try {
    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.error("No existe el usuario con id:", id);
      return false;
    }

    // Filtramos los campos que se pueden actualizar
    const updatedData = {};
    if (data.name !== undefined) updatedData.name = data.name;
    if (data.tel !== undefined) updatedData.tel = data.tel;
    if (data.role !== undefined) {
      // Validamos que el rol sea uno de los permitidos
      const validRoles = ["propietario", "inmobiliaria", "agente inmobiliario"];
      updatedData.role = validRoles.includes(data.role)
        ? data.role
        : "propietario";
    }
    // No permitimos actualizar directamente email, hasPermission o properties por seguridad

    await updateDoc(userRef, updatedData);
    return true;
  } catch (e) {
    console.error("Error al actualizar el usuario:", e);
    return false;
  }
};

// Elimina un usuario y todas sus propiedades asociadas
export const deleteUser = async (id) => {
  try {
    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.error("No existe el usuario con id:", id);
      return false;
    }

    const userData = userSnap.data();
    const propertyIds = userData.properties || [];

    // Eliminamos todas las propiedades asociadas al usuario
    for (const propertyId of propertyIds) {
      try {
        // Eliminar el documento de la propiedad
        await deleteDoc(doc(db, "properties", propertyId));
        // Eliminar el marker asociado
        await deleteDoc(doc(db, "markers", propertyId));
      } catch (err) {
        console.error(`Error al eliminar la propiedad ${propertyId}:`, err);
        // Continuamos con las demás propiedades
      }
    }

    // Finalmente eliminamos el usuario
    await deleteDoc(userRef);
    return true;
  } catch (e) {
    console.error("Error al eliminar el usuario:", e);
    return false;
  }
};

// Obtiene el ID de un usuario a partir de su email
export const getUserId = async (email) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No existe usuario con el email:", email);
      return null;
    }

    // Retornamos el ID del primer usuario que coincida con el email
    return querySnapshot.docs[0].id;
  } catch (e) {
    console.error("Error al obtener ID de usuario por email:", e);
    return null;
  }
};

// Aprueba a un usuario (hasPermission = true)
export const approveUser = async (id) => {
  try {
    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.error("No existe el usuario con id:", id);
      return false;
    }

    await updateDoc(userRef, {
      hasPermission: true,
    });
    return true;
  } catch (e) {
    console.error("Error al aprobar el usuario:", e);
    return false;
  }
};

// Desaprueba a un usuario (hasPermission = false)
export const disapproveUser = async (id) => {
  try {
    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.error("No existe el usuario con id:", id);
      return false;
    }

    await updateDoc(userRef, {
      hasPermission: false,
    });
    return true;
  } catch (e) {
    console.error("Error al desaprobar el usuario:", e);
    return false;
  }
};

// Obtiene todos los markers de propiedades
export const getPropertiesMarkers = async () => {
  try {
    const markersRef = collection(db, "markers");
    const querySnapshot = await getDocs(markersRef);

    const markers = [];
    querySnapshot.forEach((doc) => {
      markers.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return markers;
  } catch (e) {
    console.error("Error al obtener los markers de propiedades:", e);
    return [];
  }
};

// Obtiene todos los usuarios de la colección "users"
export const getUsers = async () => {
  try {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);

    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return users;
  } catch (e) {
    console.error("Error al obtener usuarios:", e);
    return [];
  }
};

// Obtiene todos los usuarios que no han sido aprobados (hasPermission = false)
export const getDisapprovedUsers = async () => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("hasPermission", "==", false));
    const querySnapshot = await getDocs(q);

    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return users;
  } catch (e) {
    console.error("Error al obtener usuarios no aprobados:", e);
    return [];
  }
};

// Obtiene el tipo de usuario basado en su email

export const getUserType = async (email) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No existe usuario con el email:", email);
      return null; // o podrías retornar "guest" o "unknown"
    }

    const userData = querySnapshot.docs[0].data();
    return userData.role || "user"; // retorna el rol o "user" por defecto
  } catch (e) {
    console.error("Error al obtener el tipo de usuario:", e);
    return null;
  }
};

export const isAdmin = async (email) => {
  const userType = await getUserType(email);
  return userType === "admin";
};

export const isArrendador = async (email) => {
  const userType = await getUserType(email);
  return userType === "arrendador";
};

// Verifica si un usuario tiene permiso (hasPermission = true)
export const hasPermission = async (email) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No existe usuario con el email:", email);
      return false;
    }

    const userData = querySnapshot.docs[0].data();
    return userData.hasPermission === true;
  } catch (e) {
    console.error("Error al verificar permisos del usuario:", e);
    return false;
  }
};

// Función para agregar una reseña a una propiedad
export const addPropertyReview = async (propertyId, reviewData) => {
  try {
    const propertyRef = doc(db, "properties", propertyId);
    const propertySnap = await getDoc(propertyRef);

    if (!propertySnap.exists()) {
      console.error("No existe la propiedad con id:", propertyId);
      return false;
    }

    // Crear un ID único para la reseña basado en el userId
    const reviewId = reviewData.userId;

    // Obtener las reseñas actuales
    const currentData = propertySnap.data();
    const currentReviews = currentData.reviews || {};

    // Agregar la nueva reseña
    const updatedReviews = {
      ...currentReviews,
      [reviewId]: reviewData,
    };

    // Actualizar la propiedad con las reseñas
    await updateDoc(propertyRef, {
      reviews: updatedReviews,
    });

    return true;
  } catch (e) {
    console.error("Error al agregar reseña:", e);
    return false;
  }
};

// Función para obtener una reseña específica de un usuario para una propiedad
export const getPropertyReview = async (propertyId, userId) => {
  try {
    const propertyRef = doc(db, "properties", propertyId);
    const propertySnap = await getDoc(propertyRef);

    if (!propertySnap.exists()) {
      console.error("No existe la propiedad con id:", propertyId);
      return null;
    }

    const propertyData = propertySnap.data();
    const reviews = propertyData.reviews || {};

    // Retornar la reseña del usuario específico
    return reviews[userId] || null;
  } catch (e) {
    console.error("Error al obtener reseña:", e);
    return null;
  }
};

// Función para actualizar una reseña existente
export const updatePropertyReview = async (propertyId, userId, reviewData) => {
  try {
    const propertyRef = doc(db, "properties", propertyId);
    const propertySnap = await getDoc(propertyRef);

    if (!propertySnap.exists()) {
      console.error("No existe la propiedad con id:", propertyId);
      return false;
    }

    // Obtener las reseñas actuales
    const currentData = propertySnap.data();
    const currentReviews = currentData.reviews || {};

    // Verificar que la reseña existe
    if (!currentReviews[userId]) {
      console.error("No existe reseña del usuario para esta propiedad");
      return false;
    }

    // Actualizar la reseña específica
    const updatedReviews = {
      ...currentReviews,
      [userId]: reviewData,
    };

    // Actualizar la propiedad
    await updateDoc(propertyRef, {
      reviews: updatedReviews,
    });

    return true;
  } catch (e) {
    console.error("Error al actualizar reseña:", e);
    return false;
  }
};

// Función para eliminar una reseña específica
export const deletePropertyReview = async (propertyId, userId) => {
  try {
    const propertyRef = doc(db, "properties", propertyId);
    const propertySnap = await getDoc(propertyRef);

    if (!propertySnap.exists()) {
      console.error("No existe la propiedad con id:", propertyId);
      return false;
    }

    // Obtener las reseñas actuales
    const currentData = propertySnap.data();
    const currentReviews = currentData.reviews || {};

    // Verificar que la reseña existe
    if (!currentReviews[userId]) {
      console.error("No existe reseña del usuario para esta propiedad");
      return false;
    }

    // Crear un objeto sin la reseña del usuario
    const { [userId]: removedReview, ...updatedReviews } = currentReviews;

    // Actualizar la propiedad
    await updateDoc(propertyRef, {
      reviews: updatedReviews,
    });

    return true;
  } catch (e) {
    console.error("Error al eliminar reseña:", e);
    return false;
  }
};

// Función para obtener todas las reseñas de una propiedad
export const getPropertyReviews = async (propertyId) => {
  try {
    const propertyRef = doc(db, "properties", propertyId);
    const propertySnap = await getDoc(propertyRef);

    if (!propertySnap.exists()) {
      console.error("No existe la propiedad con id:", propertyId);
      return {};
    }

    const propertyData = propertySnap.data();
    return propertyData.reviews || {};
  } catch (e) {
    console.error("Error al obtener reseñas:", e);
    return {};
  }
};

// Función para obtener estadísticas de reseñas de una propiedad
export const getPropertyReviewStats = async (propertyId) => {
  try {
    const reviews = await getPropertyReviews(propertyId);
    const reviewArray = Object.values(reviews);

    if (reviewArray.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      };
    }

    const totalRating = reviewArray.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = totalRating / reviewArray.length;

    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviewArray.forEach((review) => {
      ratingDistribution[review.rating]++;
    });

    return {
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews: reviewArray.length,
      ratingDistribution,
    };
  } catch (e) {
    console.error("Error al obtener estadísticas de reseñas:", e);
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };
  }
};
