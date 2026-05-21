import React, { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  FileText,
  Bell,
  Search,
  Menu,
  X,
  Plus,
  Trash2,
  Pencil,
  Eye,
  LogOut,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import {
  EXERCISES_URL,
  API_BASE,
  clearAdminSession,
  getHeaders,
  parseApiResponse,
} from "./api";

const usersSeed = [
  {
    id: 1,
    name: "Amina Trabelsi",
    email: "amina.trabelsi@nextyou.app",
    country: "Tunisia",
    flag: "🇹🇳",
    registrationDate: "2026-04-12",
    status: "Active",
    weight: 64,
    bmi: 22.1,
    goal: "Lean Muscle",
    plan: "Strength Split",
    checkIns: 18,
  },
  {
    id: 2,
    name: "Youssef Ben Amor",
    email: "youssef.benamor@nextyou.app",
    country: "Tunisia",
    flag: "🇹🇳",
    registrationDate: "2026-03-28",
    status: "Unverified",
    weight: 82,
    bmi: 26.9,
    goal: "Fat Loss",
    plan: "HIIT Burn",
    checkIns: 7,
  },
  {
    id: 3,
    name: "Claire Martin",
    email: "claire.martin@nextyou.app",
    country: "France",
    flag: "🇫🇷",
    registrationDate: "2026-04-10",
    status: "Active",
    weight: 58,
    bmi: 20.2,
    goal: "Performance",
    plan: "Athletic Engine",
    checkIns: 21,
  },
  {
    id: 4,
    name: "Julien Moreau",
    email: "julien.moreau@nextyou.app",
    country: "France",
    flag: "🇫🇷",
    registrationDate: "2026-04-01",
    status: "Active",
    weight: 77,
    bmi: 24.4,
    goal: "Body Recomposition",
    plan: "Hybrid Build",
    checkIns: 14,
  },
  {
    id: 5,
    name: "Maya Johnson",
    email: "maya.johnson@nextyou.app",
    country: "USA",
    flag: "🇺🇸",
    registrationDate: "2026-04-18",
    status: "Active",
    weight: 69,
    bmi: 23.8,
    goal: "Glute Strength",
    plan: "Lower Focus",
    checkIns: 11,
  },
  {
    id: 6,
    name: "Noah Williams",
    email: "noah.williams@nextyou.app",
    country: "USA",
    flag: "🇺🇸",
    registrationDate: "2026-03-21",
    status: "Unverified",
    weight: 88,
    bmi: 27.1,
    goal: "Fat Loss",
    plan: "Cardio Prime",
    checkIns: 4,
  },
  {
    id: 7,
    name: "Hannah Kruger",
    email: "hannah.kruger@nextyou.app",
    country: "Germany",
    flag: "🇩🇪",
    registrationDate: "2026-04-08",
    status: "Active",
    weight: 61,
    bmi: 21.4,
    goal: "Core Stability",
    plan: "Pilates Power",
    checkIns: 16,
  },
  {
    id: 8,
    name: "Lukas Meyer",
    email: "lukas.meyer@nextyou.app",
    country: "Germany",
    flag: "🇩🇪",
    registrationDate: "2026-04-06",
    status: "Active",
    weight: 80,
    bmi: 25.3,
    goal: "Strength",
    plan: "Push Pull Legs",
    checkIns: 19,
  },
  {
    id: 9,
    name: "Sara El Idrissi",
    email: "sara.idrissi@nextyou.app",
    country: "Morocco",
    flag: "🇲🇦",
    registrationDate: "2026-03-30",
    status: "Active",
    weight: 55,
    bmi: 19.8,
    goal: "Mobility",
    plan: "Flow Motion",
    checkIns: 10,
  },
  {
    id: 10,
    name: "Anas Chraibi",
    email: "anas.chraibi@nextyou.app",
    country: "Morocco",
    flag: "🇲🇦",
    registrationDate: "2026-04-03",
    status: "Unverified",
    weight: 84,
    bmi: 27.7,
    goal: "Weight Cut",
    plan: "MetCon Sprint",
    checkIns: 6,
  },
  {
    id: 11,
    name: "Olivia Brown",
    email: "olivia.brown@nextyou.app",
    country: "UK",
    flag: "🇬🇧",
    registrationDate: "2026-04-17",
    status: "Active",
    weight: 62,
    bmi: 21.7,
    goal: "Tone",
    plan: "Balanced Sculpt",
    checkIns: 12,
  },
  {
    id: 12,
    name: "Jack Thompson",
    email: "jack.thompson@nextyou.app",
    country: "UK",
    flag: "🇬🇧",
    registrationDate: "2026-03-29",
    status: "Active",
    weight: 79,
    bmi: 24.9,
    goal: "Athletic Endurance",
    plan: "Engine Builder",
    checkIns: 9,
  },
  {
    id: 13,
    name: "Sophia Lee",
    email: "sophia.lee@nextyou.app",
    country: "Canada",
    flag: "🇨🇦",
    registrationDate: "2026-04-04",
    status: "Unverified",
    weight: 57,
    bmi: 20.5,
    goal: "Flexibility",
    plan: "Stretch Lab",
    checkIns: 5,
  },
  {
    id: 14,
    name: "Liam Patel",
    email: "liam.patel@nextyou.app",
    country: "Canada",
    flag: "🇨🇦",
    registrationDate: "2026-04-09",
    status: "Active",
    weight: 83,
    bmi: 26.2,
    goal: "Muscle Gain",
    plan: "Mass Pro",
    checkIns: 17,
  },
  {
    id: 15,
    name: "Camila Rocha",
    email: "camila.rocha@nextyou.app",
    country: "Brazil",
    flag: "🇧🇷",
    registrationDate: "2026-03-27",
    status: "Active",
    weight: 60,
    bmi: 22,
    goal: "Definition",
    plan: "Shred Cycle",
    checkIns: 13,
  },
  {
    id: 16,
    name: "Lucas Almeida",
    email: "lucas.almeida@nextyou.app",
    country: "Brazil",
    flag: "🇧🇷",
    registrationDate: "2026-04-05",
    status: "Active",
    weight: 86,
    bmi: 27.3,
    goal: "Power",
    plan: "Strength Surge",
    checkIns: 15,
  },
  {
    id: 17,
    name: "Nour Hassan",
    email: "nour.hassan@nextyou.app",
    country: "Egypt",
    flag: "🇪🇬",
    registrationDate: "2026-04-11",
    status: "Active",
    weight: 59,
    bmi: 21,
    goal: "Posture",
    plan: "Core Restore",
    checkIns: 8,
  },
  {
    id: 18,
    name: "Karim Mostafa",
    email: "karim.mostafa@nextyou.app",
    country: "Egypt",
    flag: "🇪🇬",
    registrationDate: "2026-04-02",
    status: "Unverified",
    weight: 91,
    bmi: 28.1,
    goal: "Fat Loss",
    plan: "Sweat Ladder",
    checkIns: 3,
  },
  {
    id: 19,
    name: "Mariam Al Mansoori",
    email: "mariam.mansoori@nextyou.app",
    country: "UAE",
    flag: "🇦🇪",
    registrationDate: "2026-03-31",
    status: "Active",
    weight: 63,
    bmi: 22.4,
    goal: "General Fitness",
    plan: "Lifestyle Fit",
    checkIns: 11,
  },
  {
    id: 20,
    name: "Omar Al Falasi",
    email: "omar.falasi@nextyou.app",
    country: "UAE",
    flag: "🇦🇪",
    registrationDate: "2026-04-07",
    status: "Active",
    weight: 85,
    bmi: 26.8,
    goal: "Conditioning",
    plan: "Metabolic Grid",
    checkIns: 14,
  },
  {
    id: 21,
    name: "Emma Walker",
    email: "emma.walker@nextyou.app",
    country: "USA",
    flag: "🇺🇸",
    registrationDate: "2026-04-19",
    status: "Active",
    weight: 56,
    bmi: 20.1,
    goal: "Marathon Prep",
    plan: "Endurance Pulse",
    checkIns: 20,
  },
  {
    id: 22,
    name: "Adam Gharbi",
    email: "adam.gharbi@nextyou.app",
    country: "Tunisia",
    flag: "🇹🇳",
    registrationDate: "2026-04-14",
    status: "Active",
    weight: 76,
    bmi: 23.9,
    goal: "Strength",
    plan: "Power Matrix",
    checkIns: 12,
  },
  {
    id: 23,
    name: "Nina Fischer",
    email: "nina.fischer@nextyou.app",
    country: "Germany",
    flag: "🇩🇪",
    registrationDate: "2026-04-13",
    status: "Active",
    weight: 67,
    bmi: 22.9,
    goal: "Body Recomposition",
    plan: "Rebuild 360",
    checkIns: 10,
  },
  {
    id: 24,
    name: "Rayan Saidi",
    email: "rayan.saidi@nextyou.app",
    country: "Morocco",
    flag: "🇲🇦",
    registrationDate: "2026-04-16",
    status: "Unverified",
    weight: 90,
    bmi: 28,
    goal: "Weight Cut",
    plan: "Cut Protocol",
    checkIns: 5,
  },
];

const initialExercises = [
  {
    id: 1,
    name: "Incline Dumbbell Press",
    description: "Upper chest focused pressing movement with dumbbells.",
    muscleGroup: "chest",
    difficulty: "intermediate",
    duration: 15,
    equipment: "Dumbbells, Bench",
    instructions: "Press upward with controlled tempo, 3-4 sets of 10 reps.",
  },
  {
    id: 2,
    name: "Deadlift",
    description: "Compound posterior chain strength movement.",
    muscleGroup: "back",
    difficulty: "advanced",
    duration: 20,
    equipment: "Barbell",
    instructions:
      "Maintain neutral spine, drive through heels, 5 sets of 5 reps.",
  },
  {
    id: 3,
    name: "Goblet Squat",
    description: "Foundational leg movement for quads and glutes.",
    muscleGroup: "legs",
    difficulty: "beginner",
    duration: 12,
    equipment: "Dumbbell",
    instructions:
      "Hold weight at chest, descend below parallel, 4 sets of 12 reps.",
  },
  {
    id: 4,
    name: "Overhead Press",
    description: "Shoulder dominant vertical pushing exercise.",
    muscleGroup: "shoulders",
    difficulty: "intermediate",
    duration: 14,
    equipment: "Barbell",
    instructions: "Brace core and press overhead, 4 sets of 8 reps.",
  },
  {
    id: 5,
    name: "Hammer Curl",
    description: "Arm movement targeting brachialis and forearms.",
    muscleGroup: "arms",
    difficulty: "beginner",
    duration: 10,
    equipment: "Dumbbells",
    instructions: "Curl with neutral grip, avoid swinging, 3 sets of 12 reps.",
  },
  {
    id: 6,
    name: "Plank Hold",
    description: "Isometric core stabilization exercise.",
    muscleGroup: "core",
    difficulty: "beginner",
    duration: 8,
    equipment: "None",
    instructions: "Hold body in straight line, 4 rounds of 45 seconds.",
  },
  {
    id: 7,
    name: "Air Bike Intervals",
    description: "High intensity cardio intervals.",
    muscleGroup: "cardio",
    difficulty: "advanced",
    duration: 18,
    equipment: "Air Bike",
    instructions: "20s sprint and 40s easy for 12 rounds.",
  },
  {
    id: 8,
    name: "Lat Pulldown",
    description: "Vertical pull movement for lats and upper back.",
    muscleGroup: "back",
    difficulty: "intermediate",
    duration: 13,
    equipment: "Cable Machine",
    instructions: "Pull to upper chest, pause, 4 sets of 10 reps.",
  },
  {
    id: 9,
    name: "Walking Lunges",
    description: "Unilateral leg exercise for balance and strength.",
    muscleGroup: "legs",
    difficulty: "intermediate",
    duration: 14,
    equipment: "Dumbbells",
    instructions: "Long stride and upright torso, 3 sets of 20 steps.",
  },
  {
    id: 10,
    name: "Battle Rope Waves",
    description: "Power endurance movement with ropes.",
    muscleGroup: "cardio",
    difficulty: "advanced",
    duration: 10,
    equipment: "Battle Rope",
    instructions: "Alternating waves, 30s on and 30s off for 10 rounds.",
  },
  {
    id: 11,
    name: "Cable Fly",
    description: "Isolation movement for chest contraction.",
    muscleGroup: "chest",
    difficulty: "beginner",
    duration: 11,
    equipment: "Cable Machine",
    instructions: "Slight elbow bend, squeeze inward, 3 sets of 12 reps.",
  },
  {
    id: 12,
    name: "Hanging Knee Raise",
    description: "Dynamic core movement targeting lower abs.",
    muscleGroup: "core",
    difficulty: "intermediate",
    duration: 9,
    equipment: "Pull-up Bar",
    instructions: "Raise knees with control, 4 sets of 10 reps.",
  },
];

const countryData = [
  { country: "Tunisia", users: 120 },
  { country: "France", users: 95 },
  { country: "USA", users: 150 },
  { country: "Germany", users: 88 },
  { country: "Morocco", users: 76 },
  { country: "UK", users: 73 },
  { country: "Canada", users: 61 },
  { country: "Brazil", users: 69 },
  { country: "Egypt", users: 58 },
  { country: "UAE", users: 44 },
];

const topExercisesData = [
  { name: "Squat", count: 420 },
  { name: "Deadlift", count: 380 },
  { name: "Plank", count: 350 },
  { name: "Bench Press", count: 320 },
  { name: "Lunges", count: 295 },
  { name: "Lat Pulldown", count: 270 },
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "exercises", label: "Exercises", icon: Dumbbell },
  { id: "reports", label: "Reports", icon: FileText },
];

const defaultWorkoutSets = [
  { label: "Set 1", reps: "2", status: "done" },
  { label: "Set 2", reps: "2", status: "next" },
  { label: "Set 3", reps: "2", status: "locked" },
];

function createBlankExercise() {
  return {
    name: "",
    focus: "",
    difficulty: "Beginner",
    durationMin: 12,
    workoutData: {
      title: "",
      focus: "",
      focusDescription: "",
      bpm: 145,
      calories: 120,
      sets: defaultWorkoutSets.map((set) => ({ ...set })),
    },
  };
}

const pageTitles = {
  dashboard: "Performance Dashboard",
  users: "User Management",
  exercises: "Exercise Management",
  reports: "Fitness Reports",
};

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function timeAgo(isoDate) {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const hours = Math.floor((now - then) / (1000 * 60 * 60));
  if (hours < 24) return `${hours || 1}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const countryFlags = {
  Tunisia: "🇹🇳",
  France: "🇫🇷",
  USA: "🇺🇸",
  Germany: "🇩🇪",
  Morocco: "🇲🇦",
  UK: "🇬🇧",
  Canada: "🇨🇦",
  Brazil: "🇧🇷",
  Egypt: "🇪🇬",
  UAE: "🇦🇪",
};

const countryAliases = {
  USA: "United States",
  UK: "United Kingdom",
  UAE: "United Arab Emirates",
};

const WORLD_COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

function getCountryFlag(country) {
  const normalized = countryAliases[country] || country;
  return countryFlags[country] || countryFlags[normalized] || "🌍";
}

function normalizeCountryName(country) {
  if (!country) return "Other";
  return countryAliases[country] || country;
}

function formatDaysAgo(dateValue) {
  if (!dateValue) return "Today";
  const targetDate = new Date(dateValue);
  const diffMs = Date.now() - targetDate.getTime();
  const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  return days === 0 ? "Today" : `${days} days ago`;
}

function apiPath(path) {
  return `${API_BASE}${path}`;
}

async function adminFetch(path, options = {}, onAuthError) {
  const response = await fetch(apiPath(path), {
    ...options,
    headers: {
      ...getHeaders(),
      ...(options.headers || {}),
    },
  });

  try {
    return await parseApiResponse(response);
  } catch (error) {
    if (error.status === 401 || error.status === 403) {
      clearAdminSession();
      if (onAuthError) onAuthError();
    }
    throw error;
  }
}

function normalizeUserItem(user) {
  const profile = user.profile || {};
  const country = normalizeCountryName(
    profile.country || user.country || user.location || "Other",
  );
  const createdAt =
    user.createdAt || user.registrationDate || profile.createdAt;
  return {
    id: user._id || user.id,
    name:
      user.name ||
      user.fullName ||
      [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
      "Unknown user",
    email: user.email || profile.email || "",
    country,
    flag: user.flag || getCountryFlag(country),
    registrationDate: createdAt,
    status: user.status || (user.isVerified ? "Active" : "Unverified"),
    weight: user.weight || user.bodyAnalysis?.weight || profile.weight || 0,
    bmi: user.bmi || user.bodyAnalysis?.bmi || profile.bmi || 0,
    goal: user.goal || profile.goal || "",
    plan:
      user.plan || user.nutritionPlan?.name || user.trainingPlan?.name || "",
    checkIns: user.checkIns || user.checkInsCount || 0,
    bodyAnalysis: user.bodyAnalysis || profile.bodyAnalysis || {},
    nutritionPlan: user.nutritionPlan || profile.nutritionPlan || {},
    trainingPlan: user.trainingPlan || profile.trainingPlan || {},
    totalSessions: user.totalSessions || profile.totalSessions || 0,
  };
}

function normalizeExerciseItem(exercise) {
  const workoutData = exercise.workoutData || {};
  const focus =
    exercise.focus ||
    workoutData.focus ||
    exercise.muscleGroup ||
    exercise.muscle_group ||
    "General";
  const sets = Array.isArray(workoutData.sets)
    ? workoutData.sets.slice(0, 3).map((set, index) => ({
        label: set?.label || `Set ${index + 1}`,
        reps: String(set?.reps ?? "2"),
        status: set?.status || (index === 0 ? "done" : "locked"),
      }))
    : defaultWorkoutSets.map((set) => ({ ...set }));
  const durationMin = Number(exercise.durationMin ?? exercise.duration ?? 0);

  return {
    id: exercise._id || exercise.id,
    name: exercise.name || "Untitled exercise",
    focus,
    description: workoutData.focusDescription || exercise.description || "",
    muscleGroup: focus,
    difficulty: exercise.difficulty || "Beginner",
    duration: durationMin,
    durationMin,
    workoutData: {
      title: workoutData.title || exercise.name || "",
      focus: workoutData.focus || focus,
      focusDescription:
        workoutData.focusDescription || exercise.description || "",
      bpm: Number(workoutData.bpm ?? 145),
      calories: Number(workoutData.calories ?? 120),
      sets,
    },
  };
}

function normalizeReportItem(report) {
  const user = report.user || {};
  const profile = report.profile || {};
  const bodyAnalysis = report.bodyAnalysis || {};
  return {
    id: report._id || report.id,
    name: user.name || profile.name || report.name || "Unknown user",
    email: user.email || profile.email || report.email || "",
    country: profile.country || user.country || report.country || "Unknown",
    reportDate: report.createdAt || report.reportDate || profile.createdAt,
    bmi: bodyAnalysis.bmi ?? report.bmi ?? profile.bmi ?? 0,
    goal: profile.goal || report.goal || "",
  };
}

export default function AdminDashboard({ onLogout, onAuthError }) {
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [globalSearch, setGlobalSearch] = useState("");

  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    growthRate: 0,
    activeSessionsToday: 0,
    totalNutritionPlans: 0,
    totalTrainingPlans: 0,
  });
  const [dashboardRegistrations, setDashboardRegistrations] = useState([]);
  const [dashboardCountries, setDashboardCountries] = useState([]);
  const [dashboardTopExercises, setDashboardTopExercises] = useState([]);
  const [dashboardRecentUsers, setDashboardRecentUsers] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState("");

  const [users, setUsers] = useState([]);
  const [usersTotalPages, setUsersTotalPages] = useState(1);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [debouncedUserSearch, setDebouncedUserSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteUserTarget, setDeleteUserTarget] = useState(null);
  const [selectedUserReport, setSelectedUserReport] = useState(null);
  const [selectedUserReportLoading, setSelectedUserReportLoading] =
    useState(false);
  const [selectedUserReportError, setSelectedUserReportError] = useState("");

  const [exercises, setExercises] = useState([]);
  const [exercisesLoading, setExercisesLoading] = useState(true);
  const [exercisesError, setExercisesError] = useState("");
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
  const [editingExerciseId, setEditingExerciseId] = useState(null);
  const [exerciseToDelete, setExerciseToDelete] = useState(null);
  const [exerciseForm, setExerciseForm] = useState(createBlankExercise);
  const [exerciseModalError, setExerciseModalError] = useState("");
  const [exerciseSubmitting, setExerciseSubmitting] = useState(false);

  const [reports, setReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [reportsError, setReportsError] = useState("");
  const [reportStartDate, setReportStartDate] = useState("");
  const [reportEndDate, setReportEndDate] = useState("");

  const [toasts, setToasts] = useState([]);
  const [notifications] = useState(4);

  const filteredExercises = useMemo(() => {
    if (!globalSearch) return exercises;
    const q = globalSearch.toLowerCase();
    return exercises.filter(
      (ex) =>
        ex.name.toLowerCase().includes(q) ||
        ex.muscleGroup.toLowerCase().includes(q) ||
        ex.difficulty.toLowerCase().includes(q),
    );
  }, [exercises, globalSearch]);

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const inSearch =
        !globalSearch ||
        r.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
        r.email.toLowerCase().includes(globalSearch.toLowerCase()) ||
        r.goal.toLowerCase().includes(globalSearch.toLowerCase());
      return inSearch;
    });
  }, [reports, globalSearch]);

  function pushToast(type, message) {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }

  async function loadDashboard() {
    setDashboardLoading(true);
    setDashboardError("");

    try {
      const [
        statsData,
        registrationsData,
        countriesData,
        topExercisesData,
        recentUsersData,
      ] = await Promise.all([
        adminFetch("/stats", {}, onAuthError),
        adminFetch("/charts/registrations", {}, onAuthError),
        adminFetch("/charts/countries", {}, onAuthError),
        adminFetch("/charts/top-exercises", {}, onAuthError),
        adminFetch("/users?page=1&limit=5", {}, onAuthError),
      ]);

      const stats = statsData?.data || statsData;
      setDashboardStats({
        totalUsers: stats?.totalUsers ?? 0,
        growthRate: stats?.growthRate ?? 0,
        activeSessionsToday: stats?.activeSessionsToday ?? 0,
        totalNutritionPlans: stats?.totalNutritionPlans ?? 0,
        totalTrainingPlans: stats?.totalTrainingPlans ?? 0,
      });

      setDashboardRegistrations(
        (registrationsData?.data || registrationsData || []).map((item) => ({
          day: item.date || item.day,
          registrations: item.count ?? item.registrations ?? 0,
        })),
      );

      setDashboardCountries(
        WORLD_COUNTRIES.map((country) => {
          const apiItem = (countriesData?.data || countriesData || []).find(
            (item) => normalizeCountryName(item.country) === country,
          );

          return {
            country,
            users: apiItem?.count ?? apiItem?.users ?? 0,
          };
        }),
      );

      setDashboardTopExercises(
        (topExercisesData?.data || topExercisesData || []).map((item) => ({
          name: item.name,
          count: item.count ?? 0,
        })),
      );

      const recentUsers =
        recentUsersData?.users ||
        recentUsersData?.data?.users ||
        recentUsersData?.data ||
        recentUsersData ||
        [];
      setDashboardRecentUsers(recentUsers.map(normalizeUserItem));
    } catch (error) {
      setDashboardError(error?.message || "Failed to load dashboard data.");
      pushToast("error", error?.message || "Failed to load dashboard data.");
    } finally {
      setDashboardLoading(false);
    }
  }

  async function loadUsers(
    page = currentPage,
    search = debouncedUserSearch,
    country = countryFilter,
    status = statusFilter,
  ) {
    setUsersLoading(true);
    setUsersError("");
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "10",
        search,
        country: country === "all" ? "" : country,
        status:
          status === "Active"
            ? "verified"
            : status === "Unverified"
              ? "unverified"
              : "",
      });

      const data = await adminFetch(
        `/users?${params.toString()}`,
        {},
        onAuthError,
      );
      const list = data?.users || data?.data?.users || data?.data || [];
      setUsers(list.map(normalizeUserItem));
      setUsersTotalPages(data?.totalPages || data?.data?.totalPages || 1);
    } catch (error) {
      setUsersError(error?.message || "Failed to load users.");
      pushToast("error", error?.message || "Failed to load users.");
    } finally {
      setUsersLoading(false);
    }
  }

  async function loadExercises() {
    setExercisesLoading(true);
    setExercisesError("");
    try {
      const response = await fetch(EXERCISES_URL);
      const data = await parseApiResponse(response);
      const list = data?.exercises || data?.data || data || [];
      setExercises(list.map(normalizeExerciseItem));
    } catch (error) {
      setExercisesError(error?.message || "Failed to load exercises.");
      pushToast("error", error?.message || "Failed to load exercises.");
    } finally {
      setExercisesLoading(false);
    }
  }

  async function loadReports(
    startDate = reportStartDate,
    endDate = reportEndDate,
  ) {
    setReportsLoading(true);
    setReportsError("");
    try {
      const params = new URLSearchParams({ page: "1", limit: "10" });
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);
      const data = await adminFetch(
        `/reports?${params.toString()}`,
        {},
        onAuthError,
      );
      const list = data?.reports || data?.data || [];
      setReports(list.map(normalizeReportItem));
    } catch (error) {
      setReportsError(error?.message || "Failed to load reports.");
      pushToast("error", error?.message || "Failed to load reports.");
    } finally {
      setReportsLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
    loadExercises();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setDebouncedUserSearch(userSearch),
      400,
    );
    return () => window.clearTimeout(timer);
  }, [userSearch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedUserSearch, statusFilter, countryFilter]);

  useEffect(() => {
    loadUsers(currentPage, debouncedUserSearch, countryFilter, statusFilter);
  }, [currentPage, debouncedUserSearch, statusFilter, countryFilter]);

  useEffect(() => {
    loadReports(reportStartDate, reportEndDate);
  }, [reportStartDate, reportEndDate]);

  const pagedUsers = useMemo(() => {
    const q = globalSearch.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.country.toLowerCase().includes(q),
    );
  }, [users, globalSearch]);
  const totalPages = usersTotalPages;

  const countries = useMemo(() => ["all", ...WORLD_COUNTRIES], []);

  const activityFeed = useMemo(
    () =>
      [...dashboardRecentUsers]
        .sort(
          (a, b) =>
            new Date(b.registrationDate || b.createdAt || 0).getTime() -
            new Date(a.registrationDate || a.createdAt || 0).getTime(),
        )
        .slice(0, 5)
        .map((u) => ({
          ...u,
          action: "New registration",
        })),
    [dashboardRecentUsers],
  );

  const registrationsData = dashboardRegistrations;
  const statsTarget = dashboardStats;

  const [animatedStats, setAnimatedStats] = useState({
    totalUsers: 0,
    activeSessions: 0,
    nutritionPlans: 0,
    trainingPlans: 0,
  });

  useEffect(() => {
    const duration = 900;
    const steps = 30;
    let frame = 0;
    const tick = setInterval(() => {
      frame += 1;
      const progress = Math.min(frame / steps, 1);
      setAnimatedStats({
        totalUsers: Math.round((statsTarget.totalUsers || 0) * progress),
        activeSessions: Math.round(
          (statsTarget.activeSessionsToday || 0) * progress,
        ),
        nutritionPlans: Math.round(
          (statsTarget.totalNutritionPlans || 0) * progress,
        ),
        trainingPlans: Math.round(
          (statsTarget.totalTrainingPlans || 0) * progress,
        ),
      });
      if (progress >= 1) clearInterval(tick);
    }, duration / steps);

    return () => clearInterval(tick);
  }, [statsTarget]);

  function closeExerciseModal() {
    setExerciseModalOpen(false);
    setEditingExerciseId(null);
    setExerciseForm(createBlankExercise());
    setExerciseModalError("");
  }

  function openAddExercise() {
    setEditingExerciseId(null);
    setExerciseForm(createBlankExercise());
    setExerciseModalError("");
    setExerciseModalOpen(true);
  }

  function openEditExercise(exercise) {
    const normalized = normalizeExerciseItem(exercise);
    setEditingExerciseId(exercise.id);
    setExerciseForm({
      name: normalized.name,
      focus: normalized.focus,
      difficulty: normalized.difficulty,
      durationMin: normalized.durationMin || 12,
      workoutData: {
        title: normalized.workoutData?.title || normalized.name,
        focus: normalized.workoutData?.focus || normalized.focus,
        focusDescription:
          normalized.workoutData?.focusDescription || normalized.description,
        bpm: normalized.workoutData?.bpm ?? 145,
        calories: normalized.workoutData?.calories ?? 120,
        sets: (normalized.workoutData?.sets || defaultWorkoutSets).map(
          (set, index) => ({
            label: set?.label || `Set ${index + 1}`,
            reps: String(set?.reps ?? "2"),
            status: set?.status || (index === 0 ? "done" : "locked"),
          }),
        ),
      },
    });
    setExerciseModalError("");
    setExerciseModalOpen(true);
  }

  async function saveExercise(e) {
    e.preventDefault();
    setExerciseSubmitting(true);
    setExerciseModalError("");

    try {
      const body = {
        name: exerciseForm.name.trim(),
        focus: exerciseForm.focus.trim(),
        difficulty: exerciseForm.difficulty,
        durationMin: Math.max(1, Number(exerciseForm.durationMin) || 1),
        workoutData: {
          title: exerciseForm.workoutData.title.trim(),
          focus: exerciseForm.workoutData.focus.trim(),
          focusDescription: exerciseForm.workoutData.focusDescription.trim(),
          bpm: Number(exerciseForm.workoutData.bpm) || 0,
          calories: Number(exerciseForm.workoutData.calories) || 0,
          sets: (exerciseForm.workoutData.sets || []).map((set, index) => ({
            label: (set?.label || `Set ${index + 1}`).trim(),
            reps: String(set?.reps ?? "").trim(),
            status: set?.status || "locked",
          })),
        },
      };

      if (!body.name || !body.focus || !body.workoutData.title) {
        throw new Error("Name, focus, and workout title are required.");
      }

      if (!body.workoutData.focusDescription) {
        throw new Error("Workout description is required.");
      }

      if (editingExerciseId) {
        const data = await adminFetch(
          `/exercises/${editingExerciseId}`,
          {
            method: "PUT",
            body: JSON.stringify(body),
          },
          onAuthError,
        );
        const updated = normalizeExerciseItem(
          data?.exercise || data?.data || data || body,
        );
        setExercises((prev) =>
          prev.map((exercise) =>
            exercise.id === editingExerciseId
              ? { ...exercise, ...updated }
              : exercise,
          ),
        );
        loadDashboard();
        pushToast("success", "Exercise updated");
      } else {
        const data = await adminFetch(
          "/exercises",
          {
            method: "POST",
            body: JSON.stringify(body),
          },
          onAuthError,
        );
        const created = normalizeExerciseItem(
          data?.exercise || data?.data || data || body,
        );
        setExercises((prev) => [
          ...prev,
          { ...created, id: created.id || `exercise-${Date.now()}` },
        ]);
        loadDashboard();
        pushToast("success", "Exercise added");
      }

      closeExerciseModal();
    } catch (error) {
      setExerciseModalError(error?.message || "Unable to save exercise.");
      pushToast("error", error?.message || "Unable to save exercise.");
    } finally {
      setExerciseSubmitting(false);
    }
  }

  async function confirmDeleteUser() {
    if (!deleteUserTarget) return;
    try {
      await adminFetch(
        `/users/${deleteUserTarget.id}`,
        { method: "DELETE" },
        onAuthError,
      );
      setUsers((prev) => prev.filter((u) => u.id !== deleteUserTarget.id));
      setDeleteUserTarget(null);
      setSelectedUserReport((prev) =>
        prev && prev.id === deleteUserTarget.id ? null : prev,
      );
      loadDashboard();
      pushToast("success", "User removed");
    } catch (error) {
      pushToast("error", error?.message || "Unable to delete user.");
    }
  }

  async function confirmDeleteExercise() {
    if (!exerciseToDelete) return;
    try {
      await adminFetch(
        `/exercises/${exerciseToDelete.id}`,
        { method: "DELETE" },
        onAuthError,
      );
      setExercises((prev) =>
        prev.filter((ex) => ex.id !== exerciseToDelete.id),
      );
      setExerciseToDelete(null);
      loadDashboard();
      pushToast("success", "Exercise deleted");
    } catch (error) {
      pushToast("error", error?.message || "Unable to delete exercise.");
    }
  }

  async function viewUserReport(user) {
    setSelectedUserReportError("");
    setSelectedUserReportLoading(true);
    setSelectedUserReport(user);

    try {
      const data = await adminFetch(
        `/users/${user.id}/report`,
        {},
        onAuthError,
      );
      const report = data?.data || data || {};
      const mappedUser = normalizeUserItem({
        ...(report.user || {}),
        ...(report.profile || {}),
        bodyAnalysis: report.bodyAnalysis,
        checkInsCount: report.checkInsCount,
        nutritionPlan: report.nutritionPlan,
        trainingPlan: report.trainingPlan,
        totalSessions: report.totalSessions,
      });
      setSelectedUserReport({
        ...mappedUser,
        weight: report.bodyAnalysis?.weight ?? mappedUser.weight,
        bmi: report.bodyAnalysis?.bmi ?? mappedUser.bmi,
        plan:
          report.nutritionPlan?.name ||
          report.trainingPlan?.name ||
          mappedUser.plan,
        checkIns: report.checkInsCount ?? mappedUser.checkIns,
        nutritionPlan: report.nutritionPlan || mappedUser.nutritionPlan,
        trainingPlan: report.trainingPlan || mappedUser.trainingPlan,
        totalSessions: report.totalSessions ?? mappedUser.totalSessions,
      });
    } catch (error) {
      setSelectedUserReportError(error?.message || "Unable to load report.");
      pushToast("error", error?.message || "Unable to load report.");
    } finally {
      setSelectedUserReportLoading(false);
    }
  }

  function renderDashboard() {
    if (dashboardLoading) {
      return (
        <div className="space-y-6 view-anim">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="glass rounded-xl p-4">
                <div className="h-3 w-28 animate-pulse rounded bg-white/10" />
                <div className="mt-4 h-8 w-20 animate-pulse rounded bg-white/10" />
                <div className="mt-4 h-6 w-24 animate-pulse rounded-full bg-white/10" />
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <div className="glass rounded-xl p-4 xl:col-span-1">
              <div className="h-4 w-40 animate-pulse rounded bg-white/10" />
              <div className="mt-4 h-64 animate-pulse rounded-xl bg-white/5" />
            </div>
            <div className="glass rounded-xl p-4 xl:col-span-2">
              <div className="h-4 w-52 animate-pulse rounded bg-white/10" />
              <div className="mt-4 h-64 animate-pulse rounded-xl bg-white/5" />
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="glass rounded-xl p-4">
              <div className="h-4 w-40 animate-pulse rounded bg-white/10" />
              <div className="mt-4 h-72 animate-pulse rounded-xl bg-white/5" />
            </div>
            <div className="glass rounded-xl p-4">
              <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
              <div className="mt-4 space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-14 animate-pulse rounded-lg bg-white/5"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (dashboardError) {
      return (
        <div className="glass view-anim rounded-xl p-5 text-sm text-zinc-300">
          <div className="flex items-center justify-between gap-4">
            <p className="text-red-300">{dashboardError}</p>
            <button
              onClick={loadDashboard}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6 view-anim">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              key: "totalUsers",
              title: "Total Users",
              value: animatedStats.totalUsers,
              delta: `+${dashboardStats.growthRate || 0}% vs last month`,
            },
            {
              key: "activeSessions",
              title: "Active Sessions Today",
              value: animatedStats.activeSessions,
              delta: "Live from API",
            },
            {
              key: "nutritionPlans",
              title: "Nutrition Plans Generated",
              value: animatedStats.nutritionPlans,
              delta: "Live from API",
            },
            {
              key: "trainingPlans",
              title: "Training Plans Created",
              value: animatedStats.trainingPlans,
              delta: "Live from API",
            },
          ].map((card) => (
            <div key={card.key} className="glass rounded-xl p-4">
              <p className="text-xs tracking-[0.2em] text-zinc-400 uppercase">
                {card.title}
              </p>
              <p className="mt-2 font-mono text-3xl text-lime-300 glow-text">
                {card.value}
              </p>
              <p className="mt-2 inline-block rounded-full bg-lime-400/10 px-3 py-1 text-xs text-lime-300 ring-1 ring-lime-300/25">
                {card.delta}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="glass rounded-xl p-4 xl:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-200">
              Users by Country
            </h3>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardCountries}>
                  <CartesianGrid
                    strokeDasharray="2 4"
                    stroke="rgba(255,255,255,0.08)"
                  />
                  <XAxis
                    dataKey="country"
                    tick={{ fill: "#a1a1aa", fontSize: 11 }}
                  />
                  <YAxis tick={{ fill: "#a1a1aa", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      background: "#12131d",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10,
                    }}
                  />
                  <Bar dataKey="users" fill="#C6F135" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass rounded-xl p-4 xl:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-200">
              New Registrations Over Time
            </h3>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={registrationsData}>
                  <CartesianGrid
                    strokeDasharray="2 4"
                    stroke="rgba(255,255,255,0.08)"
                  />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "#a1a1aa", fontSize: 11 }}
                  />
                  <YAxis tick={{ fill: "#a1a1aa", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      background: "#12131d",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10,
                    }}
                  />
                  <Line
                    dataKey="registrations"
                    stroke="#C6F135"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 5, fill: "#C6F135" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="glass rounded-xl p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-200">
              Top Exercises Used
            </h3>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dashboardTopExercises}
                  layout="vertical"
                  margin={{ left: 20, right: 16, top: 8, bottom: 8 }}
                >
                  <CartesianGrid
                    strokeDasharray="2 4"
                    stroke="rgba(255,255,255,0.08)"
                  />
                  <XAxis
                    type="number"
                    tick={{ fill: "#a1a1aa", fontSize: 11 }}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fill: "#a1a1aa", fontSize: 11 }}
                    width={95}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#12131d",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10,
                    }}
                  />
                  <Bar dataKey="count" fill="#7EEA40" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass rounded-xl p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-200">
              Recent Activity
            </h3>
            <div className="mt-4 space-y-3">
              {activityFeed.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/2 p-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">
                      {activity.name}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {activity.flag} {activity.country} • {activity.action}
                    </p>
                  </div>
                  <span className="text-xs text-zinc-500">
                    {formatDaysAgo(
                      activity.registrationDate || activity.createdAt,
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderUsers() {
    if (usersLoading) {
      return (
        <div className="space-y-4 view-anim">
          <div className="glass flex flex-col gap-3 rounded-xl p-4 md:flex-row md:items-center">
            <div className="h-9 w-full max-w-sm animate-pulse rounded-lg bg-white/10" />
            <div className="h-9 w-36 animate-pulse rounded-lg bg-white/10" />
            <div className="h-9 w-36 animate-pulse rounded-lg bg-white/10" />
          </div>
          <div className="glass rounded-xl p-4">
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-12 animate-pulse rounded-lg bg-white/5"
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (usersError) {
      return (
        <div className="glass view-anim rounded-xl p-5 text-sm text-zinc-300">
          <div className="flex items-center justify-between gap-4">
            <p className="text-red-300">{usersError}</p>
            <button
              onClick={() =>
                loadUsers(
                  currentPage,
                  debouncedUserSearch,
                  countryFilter,
                  statusFilter,
                )
              }
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    if (!users.length) {
      return (
        <div className="glass view-anim rounded-xl p-8 text-center text-zinc-400">
          <p className="text-lg text-zinc-200">No data found</p>
          <p className="mt-1 text-sm">Try adjusting filters or search terms.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4 view-anim">
        <div className="glass flex flex-col gap-3 rounded-xl p-4 md:flex-row md:items-center">
          <div className="relative w-full md:max-w-sm">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Search users"
              className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-zinc-100 outline-none ring-lime-300/0 transition focus:ring-2"
            />
          </div>

          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-100 outline-none"
          >
            {countries.map((c) => (
              <option key={c} value={c} className="bg-[#11131b]">
                {c === "all" ? "All countries" : c}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-100 outline-none"
          >
            <option value="all" className="bg-[#11131b]">
              All status
            </option>
            <option value="Active" className="bg-[#11131b]">
              Active
            </option>
            <option value="Unverified" className="bg-[#11131b]">
              Unverified
            </option>
          </select>
        </div>

        <div className="glass overflow-auto rounded-xl">
          <table className="w-full min-w-60 text-left text-sm">
            <thead className="border-b border-white/10 bg-white/3 text-xs uppercase tracking-[0.12em] text-zinc-400">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Registration Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pagedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-white/5 text-zinc-200"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-content-center rounded-full bg-lime-300/10 font-mono text-xs text-lime-300 ring-1 ring-lime-300/30">
                        {initials(user.name)}
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-zinc-400">{user.email}</td>
                  <td className="px-4 py-3">
                    {user.flag} {user.country}
                  </td>
                  <td className="px-4 py-3 text-zinc-400">
                    {formatDate(user.registrationDate)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        user.status === "Active"
                          ? "bg-lime-400/15 text-lime-300 ring-1 ring-lime-300/30"
                          : "bg-amber-400/15 text-amber-300 ring-1 ring-amber-300/30"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => viewUserReport(user)}
                        className="rounded-lg border border-white/10 bg-white/5 p-2 text-zinc-200 transition hover:border-lime-300/40 hover:text-lime-300"
                        title="View Report"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteUserTarget(user)}
                        className="rounded-lg border border-white/10 bg-white/5 p-2 text-zinc-200 transition hover:border-red-300/40 hover:text-red-300"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass flex items-center justify-between rounded-xl px-4 py-3 text-sm text-zinc-300">
          <p>
            Showing {(currentPage - 1) * 10 + 1}-
            {Math.min(
              currentPage * 10,
              dashboardStats.totalUsers || users.length,
            )}{" "}
            of {dashboardStats.totalUsers || users.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-white/10 p-2 disabled:opacity-40"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="font-mono text-xs">
              {currentPage}/{totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-lg border border-white/10 p-2 disabled:opacity-40"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderExercises() {
    if (exercisesLoading) {
      return (
        <div className="space-y-4 view-anim">
          <div className="flex items-center justify-end">
            <div className="h-10 w-36 animate-pulse rounded-lg bg-white/10" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="glass rounded-xl p-4">
                <div className="h-5 w-48 animate-pulse rounded bg-white/10" />
                <div className="mt-3 h-12 animate-pulse rounded bg-white/5" />
                <div className="mt-4 h-8 animate-pulse rounded bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (exercisesError) {
      return (
        <div className="glass view-anim rounded-xl p-5 text-sm text-zinc-300">
          <div className="flex items-center justify-between gap-4">
            <p className="text-red-300">{exercisesError}</p>
            <button
              onClick={loadExercises}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    if (!filteredExercises.length) {
      return (
        <div className="glass view-anim rounded-xl p-8 text-center text-zinc-400">
          <p className="text-lg text-zinc-200">No data found</p>
          <p className="mt-1 text-sm">No exercises match the current search.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4 view-anim">
        <div className="flex items-center justify-end">
          <button
            onClick={openAddExercise}
            className="inline-flex items-center gap-2 rounded-lg bg-lime-300 px-4 py-2 text-sm font-semibold text-[#10120e] shadow-[0_0_24px_rgba(198,241,53,0.35)] transition hover:brightness-110"
          >
            <Plus size={16} /> Add Exercise
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredExercises.map((exercise) => (
            <div key={exercise.id} className="glass rounded-xl p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold text-zinc-100">
                  {exercise.name}
                </h3>
                <span className="rounded-full bg-cyan-300/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-cyan-200 ring-1 ring-cyan-200/25">
                  {exercise.focus || exercise.muscleGroup}
                </span>
              </div>
              <p className="mt-2 text-sm text-zinc-400">
                {exercise.description}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs capitalize ring-1 ${
                    String(exercise.difficulty).toLowerCase() === "advanced"
                      ? "bg-red-400/15 text-red-300 ring-red-300/30"
                      : String(exercise.difficulty).toLowerCase() ===
                          "intermediate"
                        ? "bg-amber-400/15 text-amber-300 ring-amber-300/30"
                        : "bg-lime-400/15 text-lime-300 ring-lime-300/30"
                  }`}
                >
                  {exercise.difficulty}
                </span>
                <span className="font-mono text-xs text-zinc-500">
                  {exercise.durationMin ?? exercise.duration} min
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => openEditExercise(exercise)}
                  className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200 transition hover:border-cyan-300/40 hover:text-cyan-200"
                >
                  <Pencil size={12} /> Edit
                </button>
                <button
                  onClick={() => setExerciseToDelete(exercise)}
                  className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200 transition hover:border-red-300/40 hover:text-red-300"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderReports() {
    if (reportsLoading) {
      return (
        <div className="space-y-4 view-anim">
          <div className="glass flex flex-col gap-3 rounded-xl p-4 md:flex-row md:items-center">
            <div className="h-9 w-40 animate-pulse rounded-lg bg-white/10" />
            <div className="h-9 w-40 animate-pulse rounded-lg bg-white/10" />
          </div>
          <div className="glass rounded-xl p-4">
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-12 animate-pulse rounded-lg bg-white/5"
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (reportsError) {
      return (
        <div className="glass view-anim rounded-xl p-5 text-sm text-zinc-300">
          <div className="flex items-center justify-between gap-4">
            <p className="text-red-300">{reportsError}</p>
            <button
              onClick={() => loadReports(reportStartDate, reportEndDate)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    if (!filteredReports.length) {
      return (
        <div className="glass view-anim rounded-xl p-8 text-center text-zinc-400">
          <p className="text-lg text-zinc-200">No data found</p>
          <p className="mt-1 text-sm">Try a different date range.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4 view-anim">
        <div className="glass flex flex-col gap-3 rounded-xl p-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2 text-sm">
            <label className="text-zinc-400">From</label>
            <input
              type="date"
              value={reportStartDate}
              onChange={(e) => setReportStartDate(e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-zinc-100 outline-none"
            />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <label className="text-zinc-400">To</label>
            <input
              type="date"
              value={reportEndDate}
              onChange={(e) => setReportEndDate(e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-zinc-100 outline-none"
            />
          </div>
        </div>

        <div className="glass overflow-auto rounded-xl">
          <table className="w-full min-w-53.75 text-left text-sm">
            <thead className="border-b border-white/10 bg-white/3 text-xs uppercase tracking-[0.12em] text-zinc-400">
              <tr>
                <th className="px-4 py-3">User Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Report Date</th>
                <th className="px-4 py-3">BMI</th>
                <th className="px-4 py-3">Goal</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-white/5 text-zinc-200"
                >
                  <td className="px-4 py-3">{report.name}</td>
                  <td className="px-4 py-3 text-zinc-400">{report.email}</td>
                  <td className="px-4 py-3 text-zinc-400">
                    {formatDate(report.reportDate)}
                  </td>
                  <td className="px-4 py-3 font-mono text-lime-300">
                    {report.bmi}
                  </td>
                  <td className="px-4 py-3">{report.goal}</td>
                  <td className="px-4 py-3">
                    <button
                      disabled
                      title="User downloads from their account"
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-lime-300/40 hover:text-lime-300"
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`dashboard-ui min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-[#0A0A0F] text-zinc-100" : "bg-slate-100 text-slate-900"
      }`}
    >
      <style>{`
        .brand-font {
          font-family: "Rajdhani", "Barlow Condensed", sans-serif;
          letter-spacing: 0.04em;
        }

        .mono-font {
          font-family: "IBM Plex Mono", "DM Mono", monospace;
        }

        .glass {
          background: #1c1c1c;
          border: 0;
          backdrop-filter: blur(12px);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
          transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
        }

        .glass:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 42px rgba(0, 0, 0, 0.52), 0 0 0 1px rgba(255, 69, 0, 0.08);
        }

        .glow-text {
          text-shadow: 0 0 22px rgba(255, 69, 0, 0.32);
        }

        .radial-bg {
          background-image:
            radial-gradient(circle at 10% 10%, rgba(255, 69, 0, 0.16), transparent 35%),
            radial-gradient(circle at 82% 16%, rgba(255, 69, 0, 0.08), transparent 28%),
            radial-gradient(circle at 30% 90%, rgba(255, 69, 0, 0.12), transparent 35%),
            linear-gradient(135deg, #000000 5%, #0f0f0f 38%, #000000 100%);
          position: relative;
          overflow: hidden;
        }

        .radial-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: radial-gradient(circle at 50% 40%, black 18%, transparent 82%);
          pointer-events: none;
          opacity: 0.18;
        }

        .dashboard-ui {
          background: #000000 !important;
          color: #ffffff !important;
        }

        .dashboard-ui [class*="bg-lime-300"],
        .dashboard-ui [class*="bg-lime-400"] {
          background-color: #ff4500 !important;
          color: #ffffff !important;
        }

        .dashboard-ui [class*="text-lime-300"],
        .dashboard-ui [class*="text-lime-400"],
        .dashboard-ui [class*="hover:text-lime-300"] {
          color: #ff4500 !important;
        }

        .dashboard-ui [class*="border-lime-300"],
        .dashboard-ui [class*="hover:border-lime-300"] {
          border-color: rgba(255, 69, 0, 0.35) !important;
        }

        .dashboard-ui [class*="ring-lime-300"] {
          --tw-ring-color: rgba(255, 69, 0, 0.3) !important;
        }

        .dashboard-ui [class*="bg-white/5"],
        .dashboard-ui [class*="bg-white/10"],
        .dashboard-ui [class*="bg-white/2"],
        .dashboard-ui [class*="bg-white/[0.02]"],
        .dashboard-ui [class*="bg-white/3"] {
          background-color: #2a2a2a !important;
        }

        .dashboard-ui [class*="border-white/10"],
        .dashboard-ui [class*="border-white/5"] {
          border-color: #2a2a2a !important;
        }

        .dashboard-ui [class*="text-zinc-100"],
        .dashboard-ui [class*="text-zinc-200"] {
          color: #ffffff !important;
        }

        .dashboard-ui [class*="text-zinc-300"],
        .dashboard-ui [class*="text-zinc-400"],
        .dashboard-ui [class*="text-zinc-500"] {
          color: #888888 !important;
        }

        .dashboard-ui aside nav button {
          color: #888888 !important;
        }

        .dashboard-ui aside nav button:hover {
          color: #ffffff !important;
          background: rgba(255, 255, 255, 0.04) !important;
        }

        .dashboard-ui aside nav button[class*="bg-lime-300/10"],
        .dashboard-ui aside nav button[class*="text-lime-300"] {
          color: #ff4500 !important;
          background: rgba(255, 69, 0, 0.08) !important;
          box-shadow: inset 0 0 0 1px rgba(255, 69, 0, 0.16);
        }

        .dashboard-ui input,
        .dashboard-ui select,
        .dashboard-ui textarea {
          background-color: #2a2a2a !important;
          border-color: #2a2a2a !important;
          color: #ffffff !important;
        }

        .dashboard-ui input::placeholder,
        .dashboard-ui textarea::placeholder {
          color: #888888;
        }

        .dashboard-ui input:focus,
        .dashboard-ui select:focus,
        .dashboard-ui textarea:focus {
          border-color: rgba(255, 69, 0, 0.55);
          box-shadow: 0 0 0 3px rgba(255, 69, 0, 0.12);
        }

        .dashboard-ui [class*="shadow-[0_0_24px_rgba(198,241,53,0.35)]"],
        .dashboard-ui [class*="shadow-[0_0_18px_rgba(198,241,53,0.18)]"] {
          box-shadow: 0 0 24px rgba(255, 69, 0, 0.28) !important;
        }

        .view-anim {
          animation: view-fade 260ms ease-out;
        }

        .dashboard-ui button {
          transition: all 200ms ease;
        }

        .dashboard-ui ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

        .dashboard-ui ::-webkit-scrollbar-thumb {
          background: linear-gradient(#ff4500, #b93a00);
          border-radius: 999px;
        }

        .dashboard-ui ::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.03);
        }

        @keyframes view-fade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
      `}</style>

      <div className="radial-bg min-h-screen">
        <div className="flex">
          <aside
            className={`fixed z-40 h-screen border-r border-white/10 bg-[#090b12]/95 p-3 backdrop-blur transition-all duration-300 lg:sticky lg:top-0 ${
              sidebarCollapsed ? "w-22" : "w-65"
            } ${sidebarOpen ? "left-0" : "-left-70 lg:left-0"}`}
          >
            <div className="flex h-full flex-col">
              <div className="mb-6 flex items-center justify-between">
                <div className="brand-font text-2xl font-bold text-lime-300">
                  {sidebarCollapsed ? "NY" : "NEXTYOU"}
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-md p-1 text-zinc-400 lg:hidden"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveView(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                        active
                          ? "bg-lime-300/10 text-lime-300 ring-1 ring-lime-300/30"
                          : "text-zinc-300 hover:bg-white/5"
                      }`}
                    >
                      <Icon size={16} />
                      {!sidebarCollapsed && <span>{item.label}</span>}
                    </button>
                  );
                })}
              </nav>

              <button
                onClick={() => setSidebarCollapsed((v) => !v)}
                className="mt-4 hidden rounded-lg border border-white/10 py-2 text-xs text-zinc-300 transition hover:border-lime-300/30 lg:block"
              >
                {sidebarCollapsed ? "Expand" : "Collapse"}
              </button>

              <div className="mt-auto rounded-xl border border-white/10 bg-white/2 p-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-content-center rounded-full bg-lime-300/15 text-sm text-lime-300 ring-1 ring-lime-300/30">
                    AD
                  </div>
                  {!sidebarCollapsed && (
                    <div>
                      <p className="text-sm text-zinc-200">Admin Team</p>
                      <p className="text-xs text-zinc-500">ops@nextyou.app</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={onLogout}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2 text-xs text-zinc-300 transition hover:border-red-300/30 hover:text-red-300"
                >
                  <LogOut size={13} /> {!sidebarCollapsed && "Logout"}
                </button>
              </div>
            </div>
          </aside>

          <div
            className={`flex-1 transition-all duration-300 ${
              sidebarCollapsed ? "lg:ml-22" : "lg:ml-65"
            }`}
          >
            <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0b0d15]/80 px-4 py-3 backdrop-blur sm:px-6">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="rounded-lg border border-white/10 p-2 text-zinc-200 lg:hidden"
                >
                  <Menu size={18} />
                </button>

                <h1 className="brand-font text-2xl font-semibold text-zinc-100">
                  {pageTitles[activeView]}
                </h1>

                <div className="relative ml-auto w-full max-w-xs">
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  />
                  <input
                    value={globalSearch}
                    onChange={(e) => setGlobalSearch(e.target.value)}
                    placeholder="Global search"
                    className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-zinc-100 outline-none ring-lime-300/0 transition focus:ring-2"
                  />
                </div>

                <button className="relative rounded-lg border border-white/10 p-2 text-zinc-200">
                  <Bell size={17} />
                  <span className="absolute -right-1 -top-1 rounded-full bg-lime-300 px-1.5 py-px font-mono text-[10px] text-[#11131a]">
                    {notifications}
                  </span>
                </button>

                <button
                  onClick={() => setDarkMode((d) => !d)}
                  className="rounded-lg border border-white/10 p-2 text-zinc-200"
                  title="Toggle mode"
                >
                  {darkMode ? <Sun size={17} /> : <Moon size={17} />}
                </button>
              </div>
            </header>

            <main className="mx-auto w-full max-w-400 p-4 sm:p-6">
              {activeView === "dashboard" && renderDashboard()}
              {activeView === "users" && renderUsers()}
              {activeView === "exercises" && renderExercises()}
              {activeView === "reports" && renderReports()}
            </main>
          </div>
        </div>
      </div>

      {deleteUserTarget && (
        <div className="fixed inset-0 z-50 grid place-content-center bg-black/60 p-4">
          <div className="glass w-full max-w-md rounded-xl p-5">
            <h3 className="brand-font text-xl text-zinc-100">Delete User</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Confirm removal of {deleteUserTarget.name}. This action cannot be
              undone.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setDeleteUserTarget(null)}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteUser}
                className="rounded-lg bg-red-500/85 px-4 py-2 text-sm font-medium text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {(selectedUserReport ||
        selectedUserReportLoading ||
        selectedUserReportError) && (
        <div className="fixed inset-0 z-50">
          <div
            onClick={() => {
              setSelectedUserReport(null);
              setSelectedUserReportError("");
              setSelectedUserReportLoading(false);
            }}
            className="absolute inset-0 bg-black/50"
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md border-l border-white/10 bg-[#0f1119]/95 p-5 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between">
              <h3 className="brand-font text-xl text-zinc-100">
                Fitness Report
              </h3>
              <button
                onClick={() => {
                  setSelectedUserReport(null);
                  setSelectedUserReportError("");
                  setSelectedUserReportLoading(false);
                }}
                className="rounded-lg border border-white/10 p-2 text-zinc-300"
              >
                <X size={15} />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              {selectedUserReportError && (
                <div className="rounded-lg border border-red-300/25 bg-red-400/10 px-3 py-2 text-sm text-red-300">
                  {selectedUserReportError}
                </div>
              )}

              {selectedUserReportLoading && (
                <>
                  <div className="glass rounded-lg p-3">
                    <div className="h-3 w-20 animate-pulse rounded bg-white/10" />
                    <div className="mt-2 h-4 w-40 animate-pulse rounded bg-white/10" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass rounded-lg p-3">
                      <div className="h-3 w-16 animate-pulse rounded bg-white/10" />
                      <div className="mt-2 h-4 w-20 animate-pulse rounded bg-white/10" />
                    </div>
                    <div className="glass rounded-lg p-3">
                      <div className="h-3 w-16 animate-pulse rounded bg-white/10" />
                      <div className="mt-2 h-4 w-20 animate-pulse rounded bg-white/10" />
                    </div>
                  </div>
                </>
              )}

              {!selectedUserReportLoading && selectedUserReport && (
                <>
                  <div className="glass rounded-lg p-3">
                    <p className="text-zinc-400">Name</p>
                    <p className="text-zinc-100">{selectedUserReport.name}</p>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <p className="text-zinc-400">Email</p>
                    <p className="text-zinc-100">{selectedUserReport.email}</p>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <p className="text-zinc-400">Country</p>
                    <p className="text-zinc-100">
                      {selectedUserReport.flag} {selectedUserReport.country}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass rounded-lg p-3">
                      <p className="text-zinc-400">Weight</p>
                      <p className="font-mono text-lime-300">
                        {selectedUserReport.weight} kg
                      </p>
                    </div>
                    <div className="glass rounded-lg p-3">
                      <p className="text-zinc-400">BMI</p>
                      <p className="font-mono text-lime-300">
                        {selectedUserReport.bmi}
                      </p>
                    </div>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <p className="text-zinc-400">Plan</p>
                    <p className="text-zinc-100">{selectedUserReport.plan}</p>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <p className="text-zinc-400">Nutrition Plan</p>
                    <p className="text-zinc-100">
                      {selectedUserReport.nutritionPlan?.name ||
                        selectedUserReport.plan}
                    </p>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <p className="text-zinc-400">Training Plan</p>
                    <p className="text-zinc-100">
                      {selectedUserReport.trainingPlan?.name ||
                        selectedUserReport.plan}
                    </p>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <p className="text-zinc-400">Goal</p>
                    <p className="text-zinc-100">{selectedUserReport.goal}</p>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <p className="text-zinc-400">Check-ins Count</p>
                    <p className="font-mono text-lime-300">
                      {selectedUserReport.checkIns}
                    </p>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <p className="text-zinc-400">Total Sessions</p>
                    <p className="font-mono text-lime-300">
                      {selectedUserReport.totalSessions}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {exerciseModalOpen && (
        <div className="fixed inset-0 z-50 grid place-content-center bg-black/60 p-4">
          <div className="glass max-h-[90vh] w-full max-w-xl overflow-auto rounded-xl p-5">
            <h3 className="brand-font text-xl text-zinc-100">
              {editingExerciseId ? "Edit Exercise" : "Add Exercise"}
            </h3>

            <form onSubmit={saveExercise} className="mt-4 space-y-3 text-sm">
              {exerciseModalError && (
                <p className="rounded-lg border border-red-300/25 bg-red-400/10 px-3 py-2 text-sm text-red-300">
                  {exerciseModalError}
                </p>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  value={exerciseForm.name}
                  onChange={(e) =>
                    setExerciseForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="name"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-zinc-100 outline-none"
                />

                <input
                  required
                  value={exerciseForm.focus}
                  onChange={(e) =>
                    setExerciseForm((p) => ({ ...p, focus: e.target.value }))
                  }
                  placeholder="focus (e.g. Quads • Glutes)"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-zinc-100 outline-none"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <select
                  value={exerciseForm.difficulty}
                  onChange={(e) =>
                    setExerciseForm((p) => ({
                      ...p,
                      difficulty: e.target.value,
                    }))
                  }
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-zinc-100 outline-none"
                >
                  {["Beginner", "Intermediate", "Advanced"].map((d) => (
                    <option key={d} value={d} className="bg-[#11131b]">
                      {d}
                    </option>
                  ))}
                </select>

                <input
                  required
                  min={1}
                  type="number"
                  value={exerciseForm.durationMin}
                  onChange={(e) =>
                    setExerciseForm((p) => ({
                      ...p,
                      durationMin: Number(e.target.value),
                    }))
                  }
                  placeholder="durationMin"
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-zinc-100 outline-none"
                />
              </div>

              <div className="rounded-lg border border-white/10 bg-white/2 p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-400">
                  workoutData
                </p>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    value={exerciseForm.workoutData.title}
                    onChange={(e) =>
                      setExerciseForm((p) => ({
                        ...p,
                        workoutData: {
                          ...p.workoutData,
                          title: e.target.value,
                        },
                      }))
                    }
                    placeholder="title"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-zinc-100 outline-none"
                  />

                  <input
                    required
                    value={exerciseForm.workoutData.focus}
                    onChange={(e) =>
                      setExerciseForm((p) => ({
                        ...p,
                        workoutData: {
                          ...p.workoutData,
                          focus: e.target.value,
                        },
                      }))
                    }
                    placeholder="focus"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-zinc-100 outline-none"
                  />
                </div>

                <textarea
                  required
                  rows={3}
                  value={exerciseForm.workoutData.focusDescription}
                  onChange={(e) =>
                    setExerciseForm((p) => ({
                      ...p,
                      workoutData: {
                        ...p.workoutData,
                        focusDescription: e.target.value,
                      },
                    }))
                  }
                  placeholder="focusDescription"
                  className="mt-3 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-zinc-100 outline-none"
                />

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    type="number"
                    value={exerciseForm.workoutData.bpm}
                    onChange={(e) =>
                      setExerciseForm((p) => ({
                        ...p,
                        workoutData: {
                          ...p.workoutData,
                          bpm: Number(e.target.value),
                        },
                      }))
                    }
                    placeholder="bpm"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-zinc-100 outline-none"
                  />

                  <input
                    required
                    type="number"
                    value={exerciseForm.workoutData.calories}
                    onChange={(e) =>
                      setExerciseForm((p) => ({
                        ...p,
                        workoutData: {
                          ...p.workoutData,
                          calories: Number(e.target.value),
                        },
                      }))
                    }
                    placeholder="calories"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-zinc-100 outline-none"
                  />
                </div>

                <div className="mt-3 space-y-2">
                  {exerciseForm.workoutData.sets.map((set, index) => (
                    <div key={index} className="grid gap-2 sm:grid-cols-3">
                      <input
                        value={set.label}
                        onChange={(e) =>
                          setExerciseForm((p) => ({
                            ...p,
                            workoutData: {
                              ...p.workoutData,
                              sets: p.workoutData.sets.map((item, i) =>
                                i === index
                                  ? { ...item, label: e.target.value }
                                  : item,
                              ),
                            },
                          }))
                        }
                        placeholder="label"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-zinc-100 outline-none"
                      />
                      <input
                        value={set.reps}
                        onChange={(e) =>
                          setExerciseForm((p) => ({
                            ...p,
                            workoutData: {
                              ...p.workoutData,
                              sets: p.workoutData.sets.map((item, i) =>
                                i === index
                                  ? { ...item, reps: e.target.value }
                                  : item,
                              ),
                            },
                          }))
                        }
                        placeholder="reps"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-zinc-100 outline-none"
                      />
                      <select
                        value={set.status}
                        onChange={(e) =>
                          setExerciseForm((p) => ({
                            ...p,
                            workoutData: {
                              ...p.workoutData,
                              sets: p.workoutData.sets.map((item, i) =>
                                i === index
                                  ? { ...item, status: e.target.value }
                                  : item,
                              ),
                            },
                          }))
                        }
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-zinc-100 outline-none"
                      >
                        {["done", "next", "locked"].map((status) => (
                          <option
                            key={status}
                            value={status}
                            className="bg-[#11131b]"
                          >
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeExerciseModal}
                  className="rounded-lg border border-white/10 px-4 py-2 text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={exerciseSubmitting}
                  className="rounded-lg bg-lime-300 px-4 py-2 font-medium text-[#0f1309]"
                >
                  {exerciseSubmitting
                    ? "Saving..."
                    : editingExerciseId
                      ? "Update"
                      : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {exerciseToDelete && (
        <div className="fixed inset-0 z-50 grid place-content-center bg-black/60 p-4">
          <div className="glass w-full max-w-md rounded-xl p-5">
            <h3 className="brand-font text-xl text-zinc-100">
              Delete Exercise
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              Confirm removal of {exerciseToDelete.name}.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setExerciseToDelete(null)}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteExercise}
                className="rounded-lg bg-red-500/85 px-4 py-2 text-sm font-medium text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-5 right-5 z-50 flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-lg border px-4 py-2 text-sm shadow-[0_0_18px_rgba(198,241,53,0.18)] ${
              toast.type === "success"
                ? "border-lime-300/30 bg-[#10160f]/95 text-lime-300"
                : toast.type === "error"
                  ? "border-red-300/30 bg-[#1a0f12]/95 text-red-300"
                  : "border-cyan-300/30 bg-[#0f141a]/95 text-cyan-300"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}
