export interface Destination {
  id: number;
  title: string;
  location: string;
  rating: string;
  reviews: string;
  season: string;
  image: string;
  category: string;
  crowd: "Low" | "Medium" | "High";
  crowdColor: string;
}

export const ALL_DESTINATIONS: Destination[] = [
  // --- TEMPLES & SPIRITUAL ---
  { id: 1, title: "Meenakshi Temple", location: "Madurai, Tamil Nadu", rating: "4.9", reviews: "28k", season: "Oct - Mar", image: "/Tourism/Meenakshi Temple(Madurai, Tamil Nadu).jpeg", category: "Temples", crowd: "High", crowdColor: "bg-red-500" },
  { id: 2, title: "Golden Temple", location: "Amritsar, Punjab", rating: "5.0", reviews: "45k", season: "Sep - Mar", image: "/Tourism/Golden Temple(Amritsar, Punjab).jpeg", category: "Temples", crowd: "High", crowdColor: "bg-red-500" },
  { id: 3, title: "Kedarnath Temple", location: "Uttarakhand", rating: "4.9", reviews: "15k", season: "May - Oct", image: "/Tourism/Kedarnath Temple(Uttarakhand).jpeg", category: "Temples", crowd: "High", crowdColor: "bg-red-500" },
  { id: 4, title: "Konark Sun Temple", location: "Odisha", rating: "4.7", reviews: "12k", season: "Sep - Mar", image: "/Tourism/Konark Sun Temple(Odisha).jpeg", category: "Temples", crowd: "Medium", crowdColor: "bg-yellow-500" },
  { id: 5, title: "Varanasi Ghats", location: "Uttar Pradesh", rating: "4.8", reviews: "38k", season: "Nov - Feb", image: "/Tourism/Varanasi Ghats(Uttar Pradesh).jpeg", category: "Heritage", crowd: "High", crowdColor: "bg-red-500" },
  { id: 6, title: "Brihadisvara Temple", location: "Thanjavur, TN", rating: "4.9", reviews: "9k", season: "Oct - Mar", image: "/Tourism/Brihadisvara Temple (Thanjavur, Tamil Nadu).jpg", category: "Temples", crowd: "Medium", crowdColor: "bg-yellow-500" },
  { id: 7, title: "Akshardham", location: "Delhi", rating: "4.8", reviews: "31k", season: "Oct - Mar", image: "/Tourism/Akshardham(Delhi).jpg", category: "Temples", crowd: "High", crowdColor: "bg-red-500" },
  { id: 8, title: "Sanchi Stupa", location: "Madhya Pradesh", rating: "4.8", reviews: "8k", season: "Nov - Mar", image: "/Tourism/Sanchi Stupa (Madhya Pradesh).jpeg", category: "Temples", crowd: "Low", crowdColor: "bg-green-500" },

  // --- ADVENTURE & MOUNTAINS ---
  { id: 9, title: "Leh Ladakh", location: "Ladakh", rating: "4.8", reviews: "3k", season: "Jun - Sep", image: "/Tourism/Leh Ladakh (Ladakh).jpeg", category: "Adventure", crowd: "Low", crowdColor: "bg-green-500" },
  { id: 10, title: "Manali", location: "Himachal Pradesh", rating: "4.6", reviews: "27k", season: "Dec - Feb", image: "/Tourism/Manali(Himachal Pradesh).jpeg", category: "Adventure", crowd: "High", crowdColor: "bg-red-500" },
  { id: 11, title: "Gulmarg", location: "Jammu & Kashmir", rating: "4.8", reviews: "8k", season: "Dec - Mar", image: "/Tourism/Gulmar (Jammu & Kashmir).jpeg", category: "Adventure", crowd: "Medium", crowdColor: "bg-yellow-500" },
  { id: 12, title: "Spiti Valley", location: "Himachal Pradesh", rating: "4.9", reviews: "2k", season: "Jun - Sep", image: "/Tourism/Spiti Valley (Himachal Pradesh).jpeg", category: "Adventure", crowd: "Low", crowdColor: "bg-green-500" },
  { id: 13, title: "Rohtang Pass", location: "Himachal Pradesh", rating: "4.5", reviews: "19k", season: "May - Oct", image: "/Tourism/Rohtang Pass (Himachal Pradesh).jpeg", category: "Adventure", crowd: "High", crowdColor: "bg-red-500" },
  { id: 14, title: "Solang Valley", location: "Manali", rating: "4.6", reviews: "20k", season: "Dec - Mar", image: "/Tourism/Solang Valley(Manali, Himachal Pradesh).jpeg", category: "Adventure", crowd: "High", crowdColor: "bg-red-500" },
  { id: 15, title: "Bir Billing", location: "Himachal Pradesh", rating: "4.7", reviews: "4k", season: "Oct - Jun", image: "/Tourism/Bir Billing(Himachal Pradesh).jpeg", category: "Adventure", crowd: "Medium", crowdColor: "bg-yellow-500" },
  { id: 16, title: "Rishikesh", location: "Uttarakhand", rating: "4.7", reviews: "22k", season: "Mar - May", image: "/Tourism/Rishikesh(Uttarakhand).jpeg", category: "Adventure", crowd: "Medium", crowdColor: "bg-yellow-500" },

  // --- HERITAGE & HISTORIC ---
  { id: 17, title: "Taj Mahal", location: "Agra, UP", rating: "4.9", reviews: "85k", season: "Oct - Mar", image: "/Tourism/Taj Mahal(Agra, Uttar Pradesh).jpeg", category: "Heritage", crowd: "High", crowdColor: "bg-red-500" },
  { id: 18, title: "Amer Fort", location: "Jaipur, Rajasthan", rating: "4.7", reviews: "33k", season: "Oct - Mar", image: "/Tourism/Amer Fort(Jaipur, Rajasthan).jpeg", category: "Heritage", crowd: "High", crowdColor: "bg-red-500" },
  { id: 19, title: "Hampi Ruins", location: "Karnataka", rating: "4.8", reviews: "14k", season: "Nov - Feb", image: "/Tourism/Hampi Ruins (Karnataka).jpeg", category: "Heritage", crowd: "Medium", crowdColor: "bg-yellow-500" },
  { id: 20, title: "Ajanta Caves", location: "Maharashtra", rating: "4.7", reviews: "9k", season: "Jun - Mar", image: "/Tourism/Ajanta Caves (Maharashtra).jpeg", category: "Heritage", crowd: "Medium", crowdColor: "bg-yellow-500" },
  { id: 21, title: "Mysore Palace", location: "Karnataka", rating: "4.8", reviews: "42k", season: "Oct - Mar", image: "/Tourism/Mysore Palace(Karnataka).jpeg", category: "Heritage", crowd: "High", crowdColor: "bg-red-500" },
  { id: 22, title: "Jaisalmer Fort", location: "Rajasthan", rating: "4.8", reviews: "18k", season: "Nov - Jan", image: "/Tourism/Jaisalmer Fort(Rajasthan).jpeg", category: "Heritage", crowd: "Medium", crowdColor: "bg-yellow-500" },
  { id: 23, title: "Udaipur Lakes", location: "Rajasthan", rating: "4.8", reviews: "19k", season: "Oct - Mar", image: "/Tourism/Udaipur Lakes (Rajasthan).jpeg", category: "Heritage", crowd: "Medium", crowdColor: "bg-yellow-500" },
  { id: 24, title: "Fatehpur Sikri", location: "Agra, UP", rating: "4.6", reviews: "12k", season: "Oct - Mar", image: "/Tourism/Fatehpur Sikri(Agra, Uttar Pradesh).jpeg", category: "Heritage", crowd: "Medium", crowdColor: "bg-yellow-500" },
  { id: 25, title: "Mahabalipuram", location: "Tamil Nadu", rating: "4.7", reviews: "11k", season: "Oct - Mar", image: "/Tourism/Mahabalipuram (Tamil Nadu).jpeg", category: "Heritage", crowd: "Medium", crowdColor: "bg-yellow-500" },
  { id: 26, title: "Khajuraho", location: "Madhya Pradesh", rating: "4.7", reviews: "10k", season: "Oct - Mar", image: "/Tourism/Khajuraho (Madhya Pradesh).jpeg", category: "Heritage", crowd: "Medium", crowdColor: "bg-yellow-500" },
  { id: 27, title: "Gwalior Fort", location: "Madhya Pradesh", rating: "4.6", reviews: "9k", season: "Sep - Mar", image: "/Tourism/Gwalior Fort(Madhya Pradesh).jpeg", category: "Heritage", crowd: "Medium", crowdColor: "bg-yellow-500" },
  { id: 28, title: "Chittorgarh Fort", location: "Rajasthan", rating: "4.9", reviews: "18k", season: "Oct - Mar", image: "/Tourism/Chittorgarh Fort (Rajasthan).jpeg", category: "Heritage", crowd: "Medium", crowdColor: "bg-yellow-500" },

  // --- BEACHES & ISLANDS ---
  { id: 29, title: "Havelock Island", location: "Andaman Islands", rating: "4.9", reviews: "5k", season: "Nov - Apr", image: "/Tourism/Havelock Island (Andaman Islands).jpeg", category: "Beaches", crowd: "Low", crowdColor: "bg-green-500" },
  { id: 30, title: "Palolem Beach", location: "South Goa", rating: "4.6", reviews: "12k", season: "Nov - Mar", image: "/Tourism/Palolem Beach (South Goa).jpeg", category: "Beaches", crowd: "Medium", crowdColor: "bg-yellow-500" },
  { id: 31, title: "Varkala Beach", location: "Kerala", rating: "4.7", reviews: "7k", season: "Dec - Mar", image: "/Tourism/Varkala Beach(Kerala).jpeg", category: "Beaches", crowd: "Medium", crowdColor: "bg-yellow-500" },
  { id: 32, title: "Radhanagar Beach", location: "Andaman Islands", rating: "4.9", reviews: "4k", season: "Oct - May", image: "/Tourism/Radhanagar Beach (Andaman Islands).jpeg", category: "Beaches", crowd: "Low", crowdColor: "bg-green-500" },
  { id: 33, title: "Gokarna", location: "Karnataka", rating: "4.5", reviews: "8k", season: "Nov - Feb", image: "/Tourism/Gokarna (Karnataka).jpeg", category: "Beaches", crowd: "Low", crowdColor: "bg-green-500" },

  // --- WILDLIFE ---
  { id: 34, title: "Jim Corbett", location: "Uttarakhand", rating: "4.6", reviews: "19k", season: "Nov - Jun", image: "/Tourism/Jim Corbett (Uttarakhand).jpeg", category: "Wildlife", crowd: "Medium", crowdColor: "bg-yellow-500" },
  { id: 35, title: "Kaziranga", location: "Assam", rating: "4.8", reviews: "6k", season: "Nov - Apr", image: "/Tourism/Kaziranga(Assam).jpeg", category: "Wildlife", crowd: "Low", crowdColor: "bg-green-500" },
  { id: 36, title: "Ranthambore", location: "Rajasthan", rating: "4.7", reviews: "12k", season: "Oct - Jun", image: "/Tourism/Ranthambore (Rajasthan).jpeg", category: "Wildlife", crowd: "Medium", crowdColor: "bg-yellow-500" },
  { id: 37, title: "Gir Forest", location: "Gujarat", rating: "4.5", reviews: "10k", season: "Dec - Mar", image: "/Tourism/Gir Forest (Gujarat).jpeg", category: "Wildlife", crowd: "Medium", crowdColor: "bg-yellow-500" },

  // --- HIDDEN GEMS & NATURE ---
  { id: 38, title: "Munnar Tea Gardens", location: "Kerala", rating: "4.8", reviews: "32k", season: "Sep - Mar", image: "/Tourism/Munnar Tea Gardens (Kerala).jpeg", category: "Hidden Gems", crowd: "Medium", crowdColor: "bg-yellow-500" },
  { id: 39, title: "Ziro Valley", location: "Arunachal", rating: "4.7", reviews: "1k", season: "Mar - Oct", image: "/Tourism/Ziro Valley(Arunachal Pradesh).jpeg", category: "Hidden Gems", crowd: "Low", crowdColor: "bg-green-500" },
  { id: 40, title: "Coorg", location: "Karnataka", rating: "4.7", reviews: "14k", season: "Oct - Mar", image: "/Tourism/Coorg(Karnataka).jpeg", category: "Hidden Gems", crowd: "Medium", crowdColor: "bg-yellow-500" },
  { id: 41, title: "Alleppey Houseboats", location: "Kerala", rating: "4.8", reviews: "21k", season: "Nov - Feb", image: "/Tourism/Alleppey Houseboats(Kerala).jpeg", category: "Hidden Gems", crowd: "Medium", crowdColor: "bg-yellow-500" },
  { id: 42, title: "Majuli Island", location: "Assam", rating: "4.9", reviews: "3k", season: "Oct - Mar", image: "/Tourism/Majuli Island (Assam).jpeg", category: "Hidden Gems", crowd: "Low", crowdColor: "bg-green-500" },
  { id: 43, title: "Cherrapunji", location: "Meghalaya", rating: "4.7", reviews: "7k", season: "Sep - May", image: "/Tourism/Cherrapunji (Meghalaya).jpeg", category: "Hidden Gems", crowd: "Low", crowdColor: "bg-green-500" },
  { id: 44, title: "Dal Lake", location: "Srinagar, Jammu & Kashmir", rating: "4.7", reviews: "22k", season: "May - Nov", image: "/Tourism/Dal Lake (Srinagar, Jammu & Kashmir).jpeg", category: "Nature", crowd: "Medium", crowdColor: "bg-yellow-500" },
  { id: 45, title: "Naini Lake", location: "Nainital, Uttarakhand", rating: "4.5", reviews: "25k", season: "Mar - Jun", image: "/Tourism/Naini Lake(Nainital, Uttarakhand).jpeg", category: "Nature", crowd: "High", crowdColor: "bg-red-500" },
  { id: 46, title: "Pangong Lake", location: "Ladakh", rating: "4.9", reviews: "6k", season: "Jun - Sep", image: "/Tourism/Pangong Lake(Ladakh).jpeg", category: "Adventure", crowd: "Low", crowdColor: "bg-green-500" },

  // --- FESTIVALS & CULTURE ---
  { id: 47, title: "Pushkar Fair", location: "Rajasthan", rating: "4.7", reviews: "9k", season: "November", image: "/Tourism/Pushkar Fair (Rajasthan).jpeg", category: "Festivals", crowd: "High", crowdColor: "bg-red-500" },
  { id: 48, title: "Rann of Kutch", location: "Gujarat", rating: "4.8", reviews: "13k", season: "Nov - Feb", image: "/Tourism/Rann of Kutch(Gujarat).jpeg", category: "Festivals", crowd: "Medium", crowdColor: "bg-yellow-500" },
  { id: 49, title: "Durga Puja", location: "Kolkata", rating: "4.9", reviews: "50k", season: "October", image: "/Tourism/Durga Puja(Kolkata, West Bengal).jpeg", category: "Festivals", crowd: "High", crowdColor: "bg-red-500" },
  { id: 50, title: "Jaisalmer Sam Dunes", location: "Rajasthan", rating: "4.8", reviews: "15k", season: "Nov - Feb", image: "/Tourism/Jaisalmer Sam Dunes (Rajasthan).jpeg", category: "Adventure", crowd: "Medium", crowdColor: "bg-yellow-500" },
];