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
              title: "Linear Functions",
              minutes: 16,
              img: "https://i.ytimg.com/vi/BtcKotD6Ni8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDhv8645uoEJ8-Ej-n1uwhLcGEyGg",
              completed: true,
              url: "/course/functions/linear-functions",
              video: "https://www.youtube.com/watch?v=BtcKotD6Ni8",
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
              video: "https://www.youtube.com/watch?v=Hq2Up_1Ih5E",
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
              video: "https://www.youtube.com/watch?v=3G5WluJ7LFA",
              course: "functions",
              summary:
                "Understand the behavior of exponential functions, including growth, decay, and their applications in real-world scenarios.",
            },
          ],
          video: "https://www.youtube.com/embed/52tpYl2tTqk",
          summary: "Functions are a fundamental concept in mathematics that describe the relationship between two sets of elements, often represented as inputs and outputs. A function assigns each input value from its domain to a single output value in its range. They are typically expressed as equations, such as f(x)=x2f(x)=x2, where f(x)f(x) represents the output for any given input xx. Functions play a critical role in various branches of mathematics, including algebra, calculus, and statistics, serving as the backbone for modeling and analyzing real-world phenomena. Their versatility makes them essential in fields ranging from physics to economics.",
          completed: false,
        },
        1: {
          name: "Climate Change",
          type: "science",
          url: "climate-change",
          totalLessons: 3,
          completedLessons: 1,
          lessons: [
            {
              title: "Causes of Climate Change",
              minutes: 15,
              img: "https://i.ytimg.com/vi/vP3pbh_-pu8/maxresdefault.jpg",
              completed: true,
              url: "/course/climate-change/causes-of-climate-change",
              video: "https://www.youtube.com/watch?v=vP3pbh_-pu8",
              course: "climate-change",
              summary:
                "Discover the natural and human activities that drive climate change, including greenhouse gases and deforestation.",
            },
            {
              title: "Impacts of Climate Change",
              minutes: 20,
              img: "https://i.ytimg.com/vi/G4H1N_yXBiA/maxresdefault.jpg",
              completed: false,
              url: "/course/climate-change/impacts-of-climate-change",
              video: "https://www.youtube.com/watch?v=G4H1N_yXBiA",
              course: "climate-change",
              summary:
                "Learn about the consequences of climate change on ecosystems, weather patterns, and global sea levels.",
            },
            {
              title: "Solutions to Climate Change",
              minutes: 18,
              img: "https://i.ytimg.com/vi/6VUPIX7yEOM/maxresdefault.jpg",
              completed: false,
              url: "/course/climate-change/solutions-to-climate-change",
              video: "https://www.youtube.com/watch?v=6VUPIX7yEOM",
              course: "climate-change",
              summary:
                "Explore strategies to mitigate climate change, including renewable energy, conservation, and international agreements.",
            },
          ],
          video: "https://www.youtube.com/embed/QlQ-MEZgRGY",
          summary:
            "Climate change refers to long-term alterations in global or regional climate patterns, often associated with an increase in Earth's average temperature. This phenomenon is primarily driven by human activities, such as the burning of fossil fuels, deforestation, and industrial processes, which release greenhouse gases like carbon dioxide and methane into the atmosphere. These gases trap heat, causing a variety of environmental impacts, including rising sea levels, more frequent extreme weather events, and disruptions to ecosystems. Addressing climate change requires global cooperation and innovative solutions to transition toward sustainable practices.",
          completed: false,
        },
        2: {
          name: "The Cold War",
          type: "history",
          url: "the-cold-war",
          totalLessons: 3,
          completedLessons: 1,
          lessons: [
            {
              title: "Origins of the Cold War",
              minutes: 19,
              img: "https://i.ytimg.com/vi/wVqziNV7dGY/maxresdefault.jpg",
              completed: true,
              url: "/course/the-cold-war/origins-of-the-cold-war",
              video: "https://www.youtube.com/watch?v=wVqziNV7dGY",
              course: "the-cold-war",
              summary:
                "Understand how ideological differences between the US and USSR led to the start of the Cold War after WWII.",
            },
            {
              title: "Major Events of the Cold War",
              minutes: 25,
              img: "https://i.ytimg.com/vi/HPPR2bLm45o/maxresdefault.jpg",
              completed: false,
              url: "/course/the-cold-war/major-events-of-the-cold-war",
              video: "https://www.youtube.com/watch?v=HPPR2bLm45o",
              course: "the-cold-war",
              summary:
                "Examine key events like the Cuban Missile Crisis and the Space Race that defined the Cold War era.",
            },
            {
              title: "End of the Cold War",
              minutes: 17,
              img: "https://i.ytimg.com/vi/zH7BneN7TMc/maxresdefault.jpg",
              completed: false,
              url: "/course/the-cold-war/end-of-the-cold-war",
              video: "https://www.youtube.com/watch?v=zH7BneN7TMc",
              course: "the-cold-war",
              summary:
                "Learn about the conclusion of the Cold War, marked by the fall of the Berlin Wall and the dissolution of the USSR.",
            },
          ],
          video: "https://www.youtube.com/embed/-QopdZ7G8ww",
          summary:
            "The Cold War was a period of political and ideological tension between the United States and the Soviet Union that lasted from the mid-20th century until the early 1990s. Unlike traditional wars, it was characterized by proxy conflicts, espionage, and an arms race, particularly in the development of nuclear weapons. The conflict was fueled by the opposing ideologies of capitalism and communism, shaping international relations and alliances across the globe. Despite the absence of direct military confrontation between the superpowers, the Cold War had profound effects on global politics, economics, and culture, leaving a lasting legacy on the modern world.",
          completed: false,
        },
        3: {
          name: "Types of Text",
          url: "types-of-text",
          totalLessons: 3,
          completedLessons: 1,
          lessons: [
            {
              title: "Narrative Texts",
              minutes: 14,
              img: "https://i.ytimg.com/vi/3b4gNlP3zcM/maxresdefault.jpg",
              completed: true,
              url: "/course/types-of-text/narrative-texts",
              video: "https://www.youtube.com/watch?v=3b4gNlP3zcM",
              course: "types-of-text",
              summary:
                "Learn how narrative texts tell a story with characters, a plot, and a structured sequence of events.",
            },
            {
              title: "Expository Texts",
              minutes: 12,
              img: "https://i.ytimg.com/vi/9GyTQRTmZdk/maxresdefault.jpg",
              completed: false,
              url: "/course/types-of-text/expository-texts",
              video: "https://www.youtube.com/watch?v=9GyTQRTmZdk",
              course: "types-of-text",
              summary:
                "Understand how expository texts provide information and explanations through clear and factual writing.",
            },
            {
              title: "Persuasive Texts",
              minutes: 16,
              img: "https://i.ytimg.com/vi/8Pa7Vyrn8y8/maxresdefault.jpg",
              completed: false,
              url: "/course/types-of-text/persuasive-texts",
              video: "https://www.youtube.com/watch?v=8Pa7Vyrn8y8",
              course: "types-of-text",
              summary:
                "Discover the techniques used in persuasive texts to convince readers through logical arguments and emotional appeal.",
            },
          ],
          video: "https://www.youtube.com/embed/-LULx42tOA4",
          summary:
            "Texts come in a variety of forms, each serving a unique purpose and audience. Broadly, texts can be classified as narrative, descriptive, expository, or persuasive. Narrative texts tell stories, often focusing on characters and events, while descriptive texts aim to create vivid imagery for the reader. Expository texts are informative, presenting facts, explanations, or instructions, and persuasive texts are designed to convince the audience of a particular viewpoint or action. Understanding the different types of text is essential for effective communication, as it allows writers to choose the most appropriate structure and style for their message.",
          completed: false,
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
