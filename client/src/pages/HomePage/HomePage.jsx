// import { useContext } from "react";
// import { AuthContext } from "../../context/auth.context";
// import { BiListUl, BiSolidDiscount } from "react-icons/bi";
// import { MdCampaign } from "react-icons/md";
// import { BiSolidCategoryAlt } from "react-icons/bi";
// import { Link } from "react-router-dom";

// function HomePage() {
//   const { user } = useContext(AuthContext);

//   const cards = [
//     { title: "Items", description: "Manage your menu items", icon: <BiListUl className="text-3xl text-primary-600" />, link: "/items" },
//     { title: "Coupons", description: "Create and manage discount codes", icon: <BiSolidDiscount className="text-3xl text-primary-600" />, link: "/discounts/coupons" },
//     { title: "Campaigns", description: "Run marketing campaigns", icon: <MdCampaign className="text-3xl text-primary-600" />, link: "/discounts/campaigns" },
//     { title: "Categories", description: "Organize your menu categories", icon: <BiSolidCategoryAlt className="text-3xl text-primary-600" />, link: "/dietary" },
//   ];

//   return (
//     <div className="py-6">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">
//           {user ? `Hello, ${user.name}!` : 'Dashboard'}
//         </h1>
//         <p className="text-gray-500 mt-2">Welcome to your restaurant management dashboard.</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {cards.map((card) => (
//           <Link key={card.title} to={card.link}>
//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary-200 transition-all duration-300 cursor-pointer group">
//               <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
//                 {card.icon}
//               </div>
//               <h3 className="font-semibold text-gray-800 text-lg mb-1">{card.title}</h3>
//               <p className="text-gray-500 text-sm">{card.description}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default HomePage;

// import { useContext } from "react";
// import { AuthContext } from "../../context/auth.context";
// import { BiListUl, BiSolidDiscount } from "react-icons/bi";
// import { MdCampaign } from "react-icons/md";
// import { BiSolidCategoryAlt } from "react-icons/bi";
// import { Link } from "react-router-dom";

// function HomePage() {
//   const { user } = useContext(AuthContext);

//   const cards = [
//     {
//       title: "Items",
//       description: "Manage your menu items",
//       icon: <BiListUl className="text-2xl" />,
//       link: "/items",
//       gradient: "from-orange-400 to-rose-500",
//       bg: "bg-orange-50",
//       border: "border-orange-100",
//       iconBg: "bg-gradient-to-br from-orange-400 to-rose-500",
//       stat: "Menu",
//     },
//     {
//       title: "Coupons",
//       description: "Create and manage discount codes",
//       icon: <BiSolidDiscount className="text-2xl" />,
//       link: "/discounts/coupons",
//       gradient: "from-violet-500 to-purple-600",
//       bg: "bg-violet-50",
//       border: "border-violet-100",
//       iconBg: "bg-gradient-to-br from-violet-500 to-purple-600",
//       stat: "Discounts",
//     },
//     {
//       title: "Campaigns",
//       description: "Run marketing campaigns",
//       icon: <MdCampaign className="text-2xl" />,
//       link: "/discounts/campaigns",
//       gradient: "from-sky-400 to-blue-600",
//       bg: "bg-sky-50",
//       border: "border-sky-100",
//       iconBg: "bg-gradient-to-br from-sky-400 to-blue-600",
//       stat: "Marketing",
//     },
//     {
//       title: "Categories",
//       description: "Organize your menu categories",
//       icon: <BiSolidCategoryAlt className="text-2xl" />,
//       link: "/dietary",
//       gradient: "from-emerald-400 to-teal-600",
//       bg: "bg-emerald-50",
//       border: "border-emerald-100",
//       iconBg: "bg-gradient-to-br from-emerald-400 to-teal-600",
//       stat: "Dietary",
//     },
//   ];

//   const now = new Date();
//   const hour = now.getHours();
//   const greeting =
//     hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       {/* Hero Section */}
//       <div className="relative mb-10 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-10 shadow-2xl">
//         {/* Background decoration */}
//         <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500 opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
//         <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500 opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

//         <div className="relative z-10">
//           <div className="flex items-center gap-2 mb-4">
//             <span className="inline-flex items-center gap-1.5 bg-white/10 text-white/80 text-xs font-medium px-3 py-1 rounded-full border border-white/10">
//               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//               System Online
//             </span>
//           </div>

//           <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
//             {greeting},{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">
//               {user ? user.name : "Chef"}
//             </span>{" "}
//             👋
//           </h1>
//           <p className="text-gray-400 text-lg">
//             Welcome to your restaurant management dashboard.
//           </p>

//           <div className="flex gap-6 mt-8">
//             <div className="text-center">
//               <p className="text-2xl font-bold text-white">4</p>
//               <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">Modules</p>
//             </div>
//             <div className="w-px bg-white/10" />
//             <div className="text-center">
//               <p className="text-2xl font-bold text-white">3</p>
//               <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">Services</p>
//             </div>
//             <div className="w-px bg-white/10" />
//             <div className="text-center">
//               <p className="text-2xl font-bold text-emerald-400">●</p>
//               <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">Active</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Section title */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h2 className="text-xl font-bold text-gray-800">Quick Access</h2>
//           <p className="text-gray-400 text-sm mt-0.5">Manage all aspects of your restaurant</p>
//         </div>
//       </div>

//       {/* Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
//         {cards.map((card, index) => (
//           <Link key={card.title} to={card.link}>
//             <div
//               className={`group relative bg-white rounded-2xl p-6 border ${card.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden`}
//               style={{ animationDelay: `${index * 80}ms` }}
//             >
//               {/* Background gradient on hover */}
//               <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

//               {/* Top badge */}
//               <div className="flex items-center justify-between mb-5">
//                 <div className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center text-white shadow-lg`}>
//                   {card.icon}
//                 </div>
//                 <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${card.bg} text-gray-500 border ${card.border}`}>
//                   {card.stat}
//                 </span>
//               </div>

//               <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-gray-900">
//                 {card.title}
//               </h3>
//               <p className="text-gray-400 text-sm leading-relaxed">{card.description}</p>

//               {/* Arrow */}
//               <div className="mt-4 flex items-center gap-1 text-gray-400 group-hover:text-gray-600 transition-colors">
//                 <span className="text-xs font-medium">Go to {card.title}</span>
//                 <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>

//       {/* Footer info */}
//       <div className="mt-10 flex items-center justify-center gap-2 text-gray-300 text-xs">
//         <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
//         <span>Restauranty · Running on AKS · {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
//       </div>
//     </div>
//   );
// }

// export default HomePage;

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { BiListUl, BiSolidDiscount } from "react-icons/bi";
import { MdCampaign } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
 
function HomePage() {
  const { user } = useContext(AuthContext);
 
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
 
  const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
 
  const cards = [
    {
      title: "Items",
      description: "Manage your menu items",
      icon: <BiListUl />,
      link: "/items",
      emoji: "🍽️",
      tag: "Menu",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      tagColor: "text-orange-600 border-orange-200",
    },
    {
      title: "Coupons",
      description: "Create and manage discount codes",
      icon: <BiSolidDiscount />,
      link: "/discounts/coupons",
      emoji: "🎟️",
      tag: "Discounts",
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
      tagColor: "text-red-600 border-red-200",
    },
    {
      title: "Campaigns",
      description: "Run marketing campaigns",
      icon: <MdCampaign />,
      link: "/discounts/campaigns",
      emoji: "📢",
      tag: "Marketing",
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      tagColor: "text-violet-600 border-violet-200",
    },
    {
      title: "Categories",
      description: "Organize your menu categories",
      icon: <BiSolidCategoryAlt />,
      link: "/dietary",
      emoji: "🗂️",
      tag: "Dietary",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      tagColor: "text-emerald-600 border-emerald-200",
    },
  ];
 
  return (
    <div className="min-h-screen bg-[#FAFAF8] p-7">
      <div className="max-w-4xl mx-auto">
 
        {/* HERO */}
        <div className="relative mb-7 rounded-2xl overflow-hidden bg-[#1C1C19] px-10 py-9">
          {/* Subtle warm glow top-right */}
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-orange-500 opacity-10 blur-3xl pointer-events-none" />
 
          <div className="relative z-10 flex items-end justify-between gap-6">
            {/* Left */}
            <div>
              <span className="inline-flex items-center gap-1.5 bg-white/[0.07] border border-white/[0.12] rounded-full px-3 py-1 text-[10px] font-semibold tracking-widest uppercase text-white/50 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                System Online
              </span>
 
              <h1 className="text-4xl font-bold text-white leading-tight mb-2" style={{ fontFamily: "'Georgia', serif" }}>
                {greeting},<br />
                <span className="italic text-orange-400">
                  {user ? user.name : "Chef"}
                </span>{" "}
                👋
              </h1>
 
              <p className="text-white/40 text-sm font-light">
                Restaurant management dashboard · all running smoothly
              </p>
            </div>
 
            {/* Right — date/time decoration */}
            <div className="text-right shrink-0 hidden sm:block">
              <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">{dateStr}</p>
              <p className="text-3xl font-bold text-white/10 tracking-tight">{timeStr}</p>
            </div>
          </div>
        </div>
 
        {/* SECTION LABEL */}
        <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-4">
          Quick Access
        </p>
 
        {/* CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
          {cards.map((card) => (
            <Link key={card.title} to={card.link} className="block group">
              <div className="bg-white border border-black/[0.07] rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.06] hover:border-black/[0.12]">
                {/* Top row */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${card.iconBg} ${card.iconColor}`}>
                    {card.emoji}
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${card.tagColor} opacity-60`}>
                    {card.tag}
                  </span>
                </div>
 
                {/* Text */}
                <p className="font-semibold text-gray-900 text-base mb-1">{card.title}</p>
                <p className="text-gray-400 text-sm font-light leading-relaxed mb-5">{card.description}</p>
 
                {/* Arrow */}
                <div className="flex items-center gap-1.5 text-gray-300 group-hover:text-gray-500 transition-all duration-200 group-hover:gap-2.5">
                  <span className="text-xs font-medium">Go to {card.title}</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
 
        {/* FOOTER */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Restauranty · Running on AKS
          </div>
          <span className="text-xs text-gray-200">v1.0</span>
        </div>
 
      </div>
    </div>
  );
}
 
export default HomePage;