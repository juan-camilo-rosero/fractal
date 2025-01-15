import { addDocumentWithCustomId, deleteDocument } from "./db_functions";

/**
 * Function to create a new user with associated collections
 * @param {string} email - The email of the user (used as the user ID in the users collection)
 */

export const createUser = async (email) => {
  try {
    // Create a document in the courses collection
   /* await addDocumentWithCustomId(
      "courses",
      {
        0: {
          name: "Functions",
          type: "math",
          url: "functions",
          totalLessons: 3,
          completedLessons: 1,
          lessons: [
            {
              title: "Linear Functions",
              minutes: 16,
              img: "https://i.ytimg.com/vi/BtcKotD6Ni8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDhv8645uoEJ8-Ej-n1uwhLcGEyGg",
              completed: true,
              url: "/course/functions/linear-functions",
              video: "https://www.youtube.com/embed/BtcKotD6Ni8",
              course: "functions",
              summary:
                "Learn how linear functions represent a straight-line relationship between two variables and how to graph them effectively.",
            },
            {
              title: "Quadratic Functions",
              minutes: 24,
              img: "https://i.ytimg.com/vi/IlNAJl36-10/maxresdefault.jpg",
              completed: false,
              url: "/course/functions/quadratic-functions",
              video: "https://www.youtube.com/embed/Hq2Up_1Ih5E",
              course: "functions",
              summary:
                "Explore the properties of quadratic functions, including parabolas, vertex form, and solving quadratic equations.",
            },
            {
              title: "Exponential Functions",
              minutes: 11,
              img: "https://i.ytimg.com/vi/tAaDItpC8OI/maxresdefault.jpg",
              completed: false,
              url: "/course/functions/exponential-functions",
              video: "https://www.youtube.com/embed/3G5WluJ7LFA",
              course: "functions",
              summary:
                "Understand the behavior of exponential functions, including growth, decay, and their applications in real-world scenarios.",
            },
          ],
          video: "https://www.youtube.com/embed/52tpYl2tTqk",
          summary:
            "Functions are a fundamental concept in mathematics that describe the relationship between two sets of elements, often represented as inputs and outputs.",
        },
        1: {
          name: "Advanced Algebra",
          type: "math",
          url: "advanced-algebra",
          totalLessons: 3,
          completedLessons: 0,
          lessons: [
            {
              title: "Polynomials",
              minutes: 20,
              img: "https://i.ytimg.com/vi/8mavVKMhH24/maxresdefault.jpg",
              completed: false,
              url: "/course/advanced-algebra/polynomials",
              video: "https://www.youtube.com/embed/8mavVKMhH24",
              course: "advanced-algebra",
              summary:
                "Learn about polynomials, including operations, factoring techniques, and their role in algebraic equations.",
            },
            {
              title: "Logarithms",
              minutes: 18,
              img: "https://i.ytimg.com/vi/YGZcBt3eOzY/maxresdefault.jpg",
              completed: false,
              url: "/course/advanced-algebra/logarithms",
              video: "https://www.youtube.com/embed/YGZcBt3eOzY",
              course: "advanced-algebra",
              summary:
                "Understand logarithms, their properties, and how they relate to exponential functions in solving equations.",
            },
            {
              title: "Complex Numbers",
              minutes: 22,
              img: "https://i.ytimg.com/vi/c5w5jH7uyf4/maxresdefault.jpg",
              completed: false,
              url: "/course/advanced-algebra/complex-numbers",
              video: "https://www.youtube.com/embed/c5w5jH7uyf4",
              course: "advanced-algebra",
              summary:
                "Explore the concept of complex numbers, their operations, and their applications in solving quadratic equations.",
            },
          ],
          video: "https://www.youtube.com/embed/QQnFrjxTQEE",
          summary:
            "Advanced Algebra delves into the study of polynomial expressions, logarithmic equations, and complex numbers, building a foundation for higher mathematics.",
        },
        2: {
          name: "Calculus Basics",
          type: "math",
          url: "calculus-basics",
          totalLessons: 3,
          completedLessons: 0,
          lessons: [
            {
              title: "Limits and Continuity",
              minutes: 25,
              img: "https://i.ytimg.com/vi/pc4kn2jkgng/maxresdefault.jpg",
              completed: false,
              url: "/course/calculus-basics/limits-and-continuity",
              video: "https://www.youtube.com/embed/pc4kn2jkgng",
              course: "calculus-basics",
              summary:
                "Understand the foundational concepts of limits and continuity, essential for studying calculus.",
            },
            {
              title: "Introduction to Derivatives",
              minutes: 30,
              img: "https://i.ytimg.com/vi/TXjMV1GdhUs/maxresdefault.jpg",
              completed: false,
              url: "/course/calculus-basics/introduction-to-derivatives",
              video: "https://www.youtube.com/embed/TXjMV1GdhUs",
              course: "calculus-basics",
              summary:
                "Learn the basics of derivatives, including their interpretation as rates of change and their computation.",
            },
            {
              title: "Basic Integration",
              minutes: 28,
              img: "https://i.ytimg.com/vi/XYwQsvdEdfk/maxresdefault.jpg",
              completed: false,
              url: "/course/calculus-basics/basic-integration",
              video: "https://www.youtube.com/embed/XYwQsvdEdfk",
              course: "calculus-basics",
              summary:
                "Explore the concept of integration as the reverse process of differentiation and its applications.",
            },
          ],
          video: "https://www.youtube.com/embed/TVUNABw77NM",
          summary:
            "Calculus Basics introduces limits, derivatives, and integrals, forming the core principles for understanding change and accumulation in mathematics.",
        },
      },
      email
    );*/

    // Create a document in the progress collection
    await addDocumentWithCustomId("progress", { statistics: {} }, email);

    // Create a document in the users collection with references to the above documents
    await addDocumentWithCustomId(
      "users",
      {
        username: null,
        firstName: null,
        lastName: null,
        phone: null,
        school: null,
        exam: null,
        examDate: null,
        preparation: null,
        freeTime: null,
        profilePic: null,
      },
      email
    );

    console.log("User created successfully.");
  } catch (e) {
    console.error("Error creating user: ", e);
  }
};

/**
 * Function to delete a user and their associated collections
 * @param {string} email - The email of the user (used as the user ID in the users collection)
 */

export const deleteUser = async (email) => {
  try {
    // Delete the user's associated documents in the courses and progress collections
    await deleteDocument("courses", email);
    await deleteDocument("progress", email);

    // Delete the user document in the users collection
    await deleteDocument("users", email);

    console.log("User and associated data deleted successfully.");
  } catch (e) {
    console.error("Error deleting user: ", e);
  }
};
