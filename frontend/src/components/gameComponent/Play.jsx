// import React, { useEffect, useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'

// const Confetti = ({ show }) => {
//   if (!show) return null
//   const pieces = Array.from({ length: 12 })
//   return (
//     <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
//       {pieces.map((_, i) => (
//         <motion.div
//           key={i}
//           initial={{ y: -20, opacity: 0, rotate: 0 }}
//           animate={{ y: 300 + Math.random() * 200, opacity: 1, rotate: Math.random() * 360 }}
//           transition={{ duration: 1 + Math.random(), ease: 'easeOut' }}
//           className="absolute text-2xl"
//           style={{ left: `${Math.random() * 90}%` }}
//         >
//           🎉
//         </motion.div>
//       ))}
//     </div>
//   )
// }

// export default function Play() {
//   const [showOffer, setShowOffer] = useState(false)
//   const [inGame, setInGame] = useState(false)
//   const [choice, setChoice] = useState(null) // 'positive' | 'negative' | null
//   const [showSurprise, setShowSurprise] = useState(false)
//   const [showHint, setShowHint] = useState(false)

//   useEffect(() => {
    
//     // Only show the play offer once ever; show immediately if not asked
//     const alreadyAsked = localStorage.getItem('playOfferShown') === 'true'
//     if (!alreadyAsked) {
//       setShowOffer(true)
//       localStorage.setItem('playOfferShown', 'true')
//     }

//     return () => {}
//   }, [])

//   function handleStart() {
//     setShowOffer(false)
//     setInGame(true)
//   }

//   function handleDecline() {
//     setShowOffer(false)
//     localStorage.setItem('playOfferShown', 'true')
//   }

//   function handleDrop(decision) {
//     setChoice(decision)
//     if (decision === 'positive') {
//       setShowSurprise(true)
//       setShowHint(false)
//     } else {
//       setShowHint(true)
//       setShowSurprise(false)
//     }
//   }

//   // name input removed per request

//   return (
//     <div className="fixed top-0 left-0 w-full z-40">
//       {/* backdrop that blurs page content beneath the overlay; non-interactive */}
//       <AnimatePresence>
//         {showOffer && (
//           <motion.div
//             key="page-blur"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 z-10 pointer-events-none backdrop-blur-sm bg-black/10"
//           />
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {showOffer && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto"
//           >
//             <motion.div className="absolute inset-0 bg-black/50 pointer-events-none" />

//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               transition={{ duration: 0.25 }}
//               className=" relative z-10 w-full max-w-2xl rounded-xl bg-[#0c1c2bd3] p-7 shadow-lg text-white pointer-events-auto"
//             >
//               <h3 className="text-2xl font-semibold mb-3">გინდა რამდენიმე წუთი დაუთმო თამაშს?</h3>
//               <p className="text-md text-gray-300 mb-4">მხოლოდ მცირე ინტერაქცია ახალგაზრდებისთვის.</p>
//               <div className="flex gap-3 justify-end mt-5">
//                 <button
//                   onClick={handleDecline}
//                   className="cursor-pointer px-4 py-2 rounded bg-[#0c1c2bca] border border-gray-600 text-white w-15"
//                 >
//                   არა
//                 </button>
//                 <button
//                   onClick={handleStart}
//                   className="cursor-pointer px-4 py-2 rounded bg-[#4a556582] text-white w-15 border border-gray-600"
//                 >
//                   კი
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="pointer-events-auto max-w-5xl mx-auto py-8 px-4">
//         <motion.div
//           initial={{ y: -8, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.35 }}
//         >
//         {inGame && (
//           <div className="game mt-4 grid md:grid-cols-3 gap-6 items-start">
//             <div className="col-span-2 p-6 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100">
//               <h2 className="text-xl font-semibold mb-3">აირჩიე შენს მიზანს</h2>
//               <p className="text-sm text-gray-500 mb-4">გადი და დააგდე პერსონაჟი შესაბამის ყუთზე ან დააჭირე ყუთს.</p>

//               <div className="flex items-center gap-6">
//                 <motion.div
//                   draggable
//                   onDragStart={(e) => e.dataTransfer.setData('text/plain', 'character')}
//                   whileTap={{ scale: 0.98 }}
//                   className="w-36 h-36 bg-gradient-to-br from-gray-50 to-gray-100 rounded-md flex items-center justify-center text-center cursor-grab shadow-inner border"
//                 >
//                   {choice === 'positive' ? (
//                     <div className="text-center font-medium">პერსონაჟი კოსტუმიანი</div>
//                   ) : choice === 'negative' ? (
//                     <div className="text-center font-medium">ჩვეულებრივი პერსონაჟი</div>
//                   ) : (
//                     <div className="text-center text-sm text-gray-600">დააჭირე ან გადაწიე</div>
//                   )}
//                 </motion.div>

//                 <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <motion.div
//                     onDragOver={(e) => e.preventDefault()}
//                     onDrop={() => handleDrop('positive')}
//                     onClick={() => handleDrop('positive')}
//                     initial={{ scale: 1 }}
//                     animate={choice === 'positive' ? { scale: 1.02 } : { scale: 1 }}
//                     transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//                     className={`h-32 rounded-lg border-2 border-dashed flex items-center justify-center p-4 cursor-pointer transition ${choice === 'positive' ? 'border-green-500 bg-green-100 shadow-md' : 'border-green-400 bg-gradient-to-br from-green-50 to-white hover:scale-[1.02]'}`}
//                   >
//                     <div className="text-center">
//                       <div className="font-semibold">მინდა სწავლა</div>
//                     </div>
//                   </motion.div>

//                   <motion.div
//                     onDragOver={(e) => e.preventDefault()}
//                     onDrop={() => handleDrop('negative')}
//                     onClick={() => handleDrop('negative')}
//                     initial={{ scale: 1 }}
//                     animate={choice === 'negative' ? { scale: 1.02 } : { scale: 1 }}
//                     transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//                     className={`h-32 rounded-lg border-2 border-dashed flex items-center justify-center p-4 cursor-pointer transition ${choice === 'negative' ? 'border-red-500 bg-red-100 shadow-md' : 'border-red-400 bg-gradient-to-br from-red-50 to-white hover:scale-[1.02]'}`}
//                   >
//                     <div className="text-center">
//                       <div className="font-semibold">არ მინდა სწავლა</div>
//                     </div>
//                   </motion.div>
//                 </div>
//               </div>

//               <AnimatePresence>
//                 {showSurprise && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 10 }}
//                     className="mt-6 p-4 rounded bg-amber-50 border border-amber-200"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="text-2xl">🎁</div>
//                       <div>
//                         <div className="font-semibold">გილოცავ!</div>
//                         <div className="text-sm text-gray-600">აქ შეიძლება სიურპრიზი დაგხვდეს 🎁</div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               <AnimatePresence>
//                 {showHint && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 6 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 6 }}
//                     transition={{ repeat: 2, duration: 0.9 }}
//                     className="mt-6 p-3 rounded bg-gray-100"
//                   >
//                     <div className="text-sm text-gray-700">ჯერ კიდევ შეგიძლია სცადო!</div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100 relative">
//               <h3 className="font-semibold mb-3">პერსონაჟი</h3>
//               <div className="h-40 w-full bg-gradient-to-br from-gray-50 to-white rounded flex items-center justify-center relative">
//                 <div className="text-center">
//                   {choice === 'positive' ? (
//                     <div className="font-semibold text-green-700">პერსონაჟი კოსტუმიანი</div>
//                   ) : choice === 'negative' ? (
//                     <div className="font-semibold text-red-600">ჩვეულებრივი პერსონაჟი</div>
//                   ) : (
//                     <div className="text-sm text-gray-500">აიღე ყუთიდან და დააგდე არჩევანის ყუთზე</div>
//                   )}
//                 </div>
//               </div>

//               <Confetti show={showSurprise} />
//             </div>
//           </div>
//         )}
//         </motion.div>
//       </div>
//     </div>
//   )
// }