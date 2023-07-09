import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "Morning skincare routine essentials! Starting the day with a gentle cleanser, followed by a hydrating toner, and finishing off with a nourishing moisturizer. #skincare #morningroutine #selfcare",
    image:
      "https://res.cloudinary.com/dbiove79b/image/upload/v1686553387/glow-hub/csms_j7awce.webp",
    likes: {
      likeCount: 2,
      likedBy: [
        { _id: uuid(), username: "RadiantSkinJourney" },
        { _id: uuid(), username: "BeautyInsideOut" },
      ],
      dislikedBy: [],
    },
    comments: [],
    username: "CleanBeautyRevolution",
    createdAt: "2023-06-07",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Sharing my favorite face mask for glowing skin! This mask is packed with natural ingredients like honey, turmeric, and aloe vera. It leaves my skin feeling refreshed and radiant. #skincare #facemask #glowingskin",
    image:
      "https://res.cloudinary.com/dbiove79b/image/upload/v1686558857/glow-hub/sheetMasks_aksegl.webp",
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: uuid(),
        firstName:"Lily",
        lastName:"Martin",
        avatarURL:"https://res.cloudinary.com/dbiove79b/image/upload/v1687451296/glow-hub/chris-jarvis-0Pf7fKRtDPI-unsplash_h5hipe.jpg",
        username: "CleanBeautyRevolution",
        text: "I recently tried a collagen-infused sheet mask and it worked wonders! My skin felt so plump and firm. Definitely worth a try! 💆",
        createdAt:"2023-09-17"
      },
    ],
    username: "RadiantSkinJourney",
    createdAt: "2023-09-04",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Switching to natural and organic skincare has been a game-changer for me. My skin feels healthier and I love knowing I'm using clean ingredients. Highly recommend giving it a try! #skincare #organicskincare #cleanbeauty",
    image:
      "https://res.cloudinary.com/dbiove79b/image/upload/v1686558856/glow-hub/naturalSkinCare_sangfw.webp",
    likes: {
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "CleanBeautyRevolution",
    createdAt: "2023-09-06",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Remember, a balanced diet is key to radiant skin. Incorporate more fruits, vegetables, and omega-3 rich foods like salmon into your meals. Your skin will thank you! 🥦🍓 #skincare #healthydiet #glowingskin",
    image:
      "https://res.cloudinary.com/dbiove79b/image/upload/v1686559134/glow-hub/healthyDiet_vamqke.webp",
    likes: {
      likeCount: 4,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "BeautyInsideOut",
    createdAt: "2020-10-16",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Age is just a number, and so is great skin! Embrace your journey and take care of your skin with a nourishing anti-aging routine. Confidence and glowing skin are timeless! 💫✨ #skincare #antiaging #confidence",
    image:
      "https://res.cloudinary.com/dbiove79b/image/upload/v1686558856/glow-hub/age_a9hw8j.webp",
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "RadiantSkinJourney",
    createdAt:"2020-06-17",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Quick tip: Exfoliating regularly helps remove dead skin cells, revealing a smoother and brighter complexion. But remember, don't overdo it! Find the right balance for your skin type. #skincare #exfoliation #glowingskin",
    image:
      "https://res.cloudinary.com/dbiove79b/image/upload/v1686558856/glow-hub/Exfoliating_tjvrkl.webp",
    likes: {
      likeCount: 10,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "CleanBeautyRevolution",
    createdAt: "2020-11-24",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Love spending time outdoors? Don't forget your sunscreen! Protect your skin from harmful UV rays to keep it healthy and youthful. Enjoy the sunshine responsibly! ☀️🌿 #skincare #sunprotection #sunsafety",
    image:
      "https://res.cloudinary.com/dbiove79b/image/upload/v1686558857/glow-hub/sunscreen_hidwm7.webp",
    likes: {
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "BeautyInsideOut",
    createdAt: "2020-04-11",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Did you know that antioxidants can help protect your skin from free radicals and premature aging? Incorporate antioxidant-rich foods like berries, green tea, and dark chocolate into your diet for a healthy and radiant complexion. 🍓🍵🍫 #skincare #antioxidants #healthyglow",
    image:
      "https://res.cloudinary.com/dbiove79b/image/upload/v1686558856/glow-hub/greenTeaChocolate_ogruby.webp",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "HealthyGlow",
    createdAt: "2023-08-25",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Treat yourself to a relaxing at-home spa day! Start with a warm bath, followed by a gentle scrub and a hydrating face mask. Take the time to unwind and rejuvenate your skin. You deserve it! 🛀💆✨ #skincare #selfcare #spaday",
    image:
      "https://res.cloudinary.com/dbiove79b/image/upload/v1686558856/glow-hub/homeSpa_hmwnun.webp",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "RadiantSkinJourney",
    createdAt: "2023-10-26",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Skincare is self-care. Take a few moments each day to pamper yourself with a calming skincare routine. Let it be a mindful and soothing experience for your body and mind. 🌸💆 #skincare #selfcare #mindfulness",
    image:
      "https://res.cloudinary.com/dbiove79b/image/upload/v1686558857/glow-hub/skinCareRoutine_rdpx0o.webp",
    likes: {
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "MindfulSkincare",
    createdAt: "2023-06-24",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Dealing with stubborn acne? I've found that incorporating salicylic acid into my routine has made a noticeable difference. It helps unclog pores and reduce breakouts. Have you tried it? #skincare #acne #salicylicacid",
    image:
      "https://res.cloudinary.com/dbiove79b/image/upload/v1686558858/glow-hub/salicylic-acid-skincare_nhxrzo.webp",
    likes: {
      likeCount: 1,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: uuid(),
        username: "MindfulSkincare",
        firstName:"Alex",
        lastName:"Wilson",
        avatarURL:"https://res.cloudinary.com/dbiove79b/image/upload/v1687451294/glow-hub/20309c_19a43effccee42cb874090567a72dfc3_mv2_dny5ql.jpg",
        text: "Salicylic acid has been a game-changer for me too! It's great for keeping breakouts at bay. I use a cleanser with salicylic acid, and it works wonders. 🙌",
        createdAt:"2023-05-16"
      },
      {
        _id: uuid(),
        firstName:"Sarah",
        lastName:"Thompson",
        avatarURL:"https://res.cloudinary.com/dbiove79b/image/upload/v1687451296/glow-hub/alexandra-kirr-Q_MYbs7KdcU-unsplash_nwq6zc.jpg",
        username: "RadiantSkinJourney",
        text: "I've been using a spot treatment with salicylic acid, and it's been effective in reducing the size of my pimples overnight. Definitely recommend giving it a try! 💪",
        createdAt:"2023-05-17"
      },
    ],
    username: "BeautyInsideOut",
    createdAt: "2023-05-15",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Glowing skin starts with a good skincare routine! Cleanse, exfoliate, tone, moisturize, and protect. Find the products and steps that work best for you, and enjoy the journey to healthy and radiant skin. ✨💕 #skincare #glowingskin #skincareroutine",
    image:
      "https://res.cloudinary.com/dbiove79b/image/upload/v1686558857/glow-hub/skinCare_ozjkbl.webp",
    likes: {
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "HealthyGlow",
    createdAt: "2020-05-30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Finding the right moisturizer is key to hydrated and supple skin. Look for ingredients like hyaluronic acid and ceramides that help lock in moisture. Your skin will thank you! 💧✨ #skincare #moisturizer #hydration",
    image:
      "https://res.cloudinary.com/dbiove79b/image/upload/v1686558857/glow-hub/rightMoisturizer_cdqlia.webp",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "MindfulSkincare",
    createdAt: "2020-06-08",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Want that post-workout glow? Remember to cleanse your face after exercising to remove sweat and dirt. Opt for a gentle cleanser to keep your skin clean and refreshed. #skincare #workoutglow #cleansing",
    image:
      "https://res.cloudinary.com/dbiove79b/image/upload/v1686558856/glow-hub/gentlecleanser_folk06.webp",
    likes: {
      likeCount: 4,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "RadiantSkinJourney",
    createdAt: "2023-12-13",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Remember, everyone's skin is unique. Embrace your natural beauty and focus on what makes you feel confident. Skincare is about self-care, not perfection. You're beautiful just the way you are! 💕✨ #skincare #selflove #confidence",
    image:
      "https://res.cloudinary.com/dbiove79b/image/upload/v1686558857/glow-hub/selfCare_i07bxz.webp",
    likes: {
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "MindfulSkincare",
    createdAt: "2022-05-26",
    updatedAt: formatDate(),
  },
];
