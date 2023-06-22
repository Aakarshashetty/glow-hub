import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Lily",
    lastName: "Martin",
    username: "CleanBeautyRevolution",
    password: "lily123",
    bio:"Skincare blogger | Sharing tips, tricks, and product recommendations for achieving that radiant glow | Let's unlock your skin's true potential! ✨💫 #skincareblogger #glowingskin",
    bookmarks:[],
    followers: [],
    following:[],
    createdAt: formatDate(),
    updatedAt: formatDate(),

  },
  {
    _id: uuid(),
    firstName: "Emily",
    lastName: "Johnson",
    username: "HealthyGlow",
    password: "emily123",
    bio:"Skincare enthusiast | Sharing my journey to healthy and glowing skin | Passionate about clean beauty and self-care | Join me on this skincare adventure! ✨🌿 #skincarelover #selfcareadvocate",
    bookmarks: [],
    followers: [],
   following:[],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Sarah",
    lastName: "Thompson",
    username: "RadiantSkinJourney",
    password: "sarah123",
    bio:"Licensed Esthetician | Helping you achieve radiant skin from the inside out | Sharing skincare tips, product reviews, and expert advice | Let's glow together! 🌟✨ #esthetics #skincareexpert",
    bookmarks: [],
    followers: [],
     following:[],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Mia",
    lastName: "Rodriguez",
    username: "BeautyInsideOut",
    password: "mia123",
    bio:" Embracing the power of natural beauty | Clean and green skincare advocate | Lover of DIY skincare recipes | Let nature nourish your skin! 🌿💚 #naturalbeauty #cleanbeauty",
    bookmarks: [],
    followers: [],
    following:[],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Alex",
    lastName: "Wilson",
    username: "MindfulSkincare",
    password: "alex123",
    bio:"Obsessed with all things skincare | Testing and reviewing the latest products | Documenting my skincare journey and discoveries | Let's geek out over skincare! 💆‍♀️💖 #skincareaddict #productjunkie",
    bookmarks: [],
    followers: [],
    following:[],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
