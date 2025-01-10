import { addDocumentWithCustomId, deleteDocument } from "./db_functions";

/**
 * Function to create a new user with associated collections
 * @param {string} email - The email of the user (used as the user ID in the users collection)
 */

export const createUser = async (email) => {
  try {
    // Create a document in the courses collection
    await addDocumentWithCustomId(
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
              name: "Linear Functions",
              video: "https://www.youtube.com/watch?v=BtcKotD6Ni8",
              url: "/course/functions/linear-functions",
              summary:
                "Linear functions are mathematical relationships that create straight-line graphs on a coordinate plane. They are described by the equation f(x) = mx + b, where m is the slope and b is the y-intercept. These functions have a constant rate of change and are widely used in real-world scenarios such as physics and economics.",
              completed: true,
            },
            {
              name: "Quadratic Functions",
              video: "https://www.youtube.com/watch?v=1oAijhj6L5g",
              url: "/course/functions/quadratic-functions",
              summary:
                "Quadratic functions represent parabolic relationships and are defined by the equation f(x) = ax^2 + bx + c. They are used to model various phenomena, such as projectile motion and optimization problems.",
              completed: false,
            },
            {
              name: "Exponential Functions",
              video: "https://www.youtube.com/watch?v=4vqhI4sSQFo",
              url: "/course/functions/exponential-functions",
              summary:
                "Exponential functions involve growth or decay at a constant percentage rate and are represented by the equation f(x) = a * b^x. They are critical in fields like biology, finance, and physics.",
              completed: false,
            },
          ],
        },
        1: {
          name: "Climate Change",
          type: "science",
          url: "climate-change",
          totalLessons: 3,
          completedLessons: 1,
          lessons: [
            {
              name: "Causes of Climate Change",
              url: "https://www.youtube.com/watch?v=vP3pbh_-pu8",
              summary:
                "This lesson explores the natural and human-induced factors contributing to climate change, including greenhouse gas emissions, deforestation, and industrial activities.",
              completed: true,
            },
            {
              name: "Impacts of Climate Change",
              url: "https://www.youtube.com/watch?v=G4H1N_yXBiA",
              summary:
                "Learn about the effects of climate change on ecosystems, sea levels, weather patterns, and human health. The lesson highlights the importance of mitigation and adaptation strategies.",
              completed: false,
            },
            {
              name: "Solutions to Climate Change",
              url: "https://www.youtube.com/watch?v=6VUPIX7yEOM",
              summary:
                "This lesson discusses strategies to combat climate change, including renewable energy adoption, energy efficiency, reforestation, and international agreements like the Paris Accord.",
              completed: false,
            },
          ],
        },
        2: {
          name: "The Cold War",
          type: "history",
          url: "the-cold-war",
          totalLessons: 3,
          completedLessons: 1,
          lessons: [
            {
              name: "Origins of the Cold War",
              url: "https://www.youtube.com/watch?v=wVqziNV7dGY",
              summary:
                "The Cold War began after World War II due to ideological conflicts between the United States and the Soviet Union. This lesson covers the historical context and key events that led to the rivalry.",
              completed: true,
            },
            {
              name: "Major Events of the Cold War",
              url: "https://www.youtube.com/watch?v=HPPR2bLm45o",
              summary:
                "Explore pivotal moments such as the Cuban Missile Crisis, the Vietnam War, and the Space Race, highlighting the tensions and competition between superpowers.",
              completed: false,
            },
            {
              name: "End of the Cold War",
              url: "https://www.youtube.com/watch?v=zH7BneN7TMc",
              summary:
                "Learn how the Cold War concluded with the fall of the Berlin Wall, the dissolution of the Soviet Union, and the rise of a new world order in the late 20th century.",
              completed: false,
            },
          ],
        },
        3: {
          name: "Types of Text",
          url: "types-of-text",
          totalLessons: 3,
          completedLessons: 1,
          lessons: [
            {
              name: "Narrative Texts",
              url: "https://www.youtube.com/watch?v=3b4gNlP3zcM",
              summary:
                "Narrative texts tell a story or recount events. This lesson covers the structure and elements of narratives, including characters, plot, and setting.",
              completed: true,
            },
            {
              name: "Expository Texts",
              url: "https://www.youtube.com/watch?v=9GyTQRTmZdk",
              summary:
                "Expository texts aim to inform or explain. They are structured to present facts, data, and clear arguments, often using headings and subheadings for clarity.",
              completed: false,
            },
            {
              name: "Persuasive Texts",
              url: "https://www.youtube.com/watch?v=8Pa7Vyrn8y8",
              summary:
                "Persuasive texts are designed to convince the reader of a particular viewpoint. They use rhetorical devices, evidence, and strong arguments to achieve their goal.",
              completed: false,
            },
          ],
        },
      },
      email
    );

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
