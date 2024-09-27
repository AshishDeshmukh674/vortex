// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';

// function Hero() {
//   const [showMoreInfo, setShowMoreInfo] = useState(false);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [slideDirection, setSlideDirection] = useState('');

//   const slides = [
//     {
//       id: 3,
//       image: '/dypatil_clg.jpeg',
//       title: ['Dr. D. Y. Patil Institute of Technology',
        
//       ],
      
//       description: [
//         'Welcome to Dr. D. Y. Patil Institute of Technology (DIT), Pimpri, Pune. The oldest campus of Dr. D. Y. Patil group of Institutions. This campus is started in year 1983 and further nurtured by our visionary Chairman Hon’ble Dr. P. D. Patil with the vision “Empowerment through knowledge” “Better Education Better World”. The institute is being progressed under the dynamic leadership of Hon’ble Dr. Somnath Patil. Institute has well maintained lawns, trees and handy plantations leading to a healthy and pleasant environment. This institute is in the heart of the city. Walkable distance from public transports such as Bus, Railway and Metro.'
//       ],
//       moreInfo: 'Institute has well maintained lawns, trees and handy plantations leading to a healthy and pleasant environment. This institute is in the heart of the city. Walkable distance from public transports such as Bus, Railway and Metro. This institute offers 9 Undergraduate Programs including programs in emerging areas such as Artificial Intelligence, Data Science, Automation and Robotics and 5 PG programs.',
//       showMoreInfoButton: true,
//     },
//     // {
//     //   id: 4,
//     //   image: '/Shilpa Bhat.jpg',
//     //   title: ['Dr. Shilpa Bhat',
//     //     'MBBS, MD (Obstetrics & Gynaecology)'
//     //   ],
//     //   profession: 'Obstetrician and Gynecologist',
//     //   description: ['M.B.B.S - Govt. Medical College, Aurangabad',
//     //     'Resident Dept. of Obst & Gynac B J Medical, Pune',
//     //     'M.D. Obst & Gynac - Govt. Medical College, Miraj',
//     //     'Former Associate Professor S.K.N.M.C, Pune',
//     //     'Thesis: Study of obstetric referrals to Teaching Institute',
//     //     'Best Family Planning Service Award - Govt. of Maharashtra 2013-14',
//     //     'Pioneer work in postpartum intrauterine contraceptive device',
//     //     'Published paper in Elsevier International Journal on postpartum intrauterine contraceptive device'], // Ensure this is an array
//     //   moreInfo: ['Dr. Bhat has previously held the position of Associate Professor in Obstetrics and Gynaecology at S.K.N. Medical College, Pune. Her dedication to women’s health earned her the Best Family Planning Service Award in Maharashtra in 2013. She has published multiple papers in international journals on IUCD and other critical aspects of gynecological care.'],
//     //   showMoreInfoButton: true,
//     // },
//   ];

//   const handleMoreInfoClick = () => {
//     setShowMoreInfo(!showMoreInfo);
//   };

//   useEffect(() => {
//     const slideInterval = setInterval(() => {
//       setSlideDirection('right');
//       setTimeout(() => {
//         setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//         setSlideDirection('');
//       }, 500);
//     }, 12000);

//     return () => clearInterval(slideInterval);
//   }, [slides.length]);

//   const currentData = slides[currentSlide];

//   return (
//     <section>
//       <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
//         <div className="relative overflow-hidden">
//           <div
//             className={`grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 transition-transform duration-500 ${
//               slideDirection === 'right' ? 'translate-x-full' : 'translate-x-0'
//             }`}
//           >
//             <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
//               <Image
//                 alt={currentData.title}
//                 src={currentData.image}
//                 width={800}
//                 height={800}
//                 className="absolute inset-0 h-full w-full object-cover rounded-3xl"
//               />
//             </div>

//             <div className="lg:py-24">
//               <h2 className="text-4xl font-bold sm:text-4xl text-primary">
//                 {currentData.title.map((line, index) => (
//                   <React.Fragment key={index}>
//                     <span className={index === 0 ? 'text-4xl font-bold' : 'text-xl font-light'}>
//                       {line}
//                     </span>
//                     <br />
//                   </React.Fragment>
//                 ))}
//               </h2>

//               <div className="mt-4 py-1 px-3 bg-slate-200 text-black font-medium rounded-full inline-block text-sm">
//                 {currentData.profession}
//               </div>

//               <ul className="mt-4 list-disc pl-5 text-gray-600">
//                 {(Array.isArray(currentData.description) && currentData.description.length) ? (
//                   currentData.description.map((item, index) => (
//                     <li key={index} className="mb-1">{item}</li>  // Add margin between items
//                   ))
//                 ) : (
//                   <li>No description available.</li>
//                 )}
//               </ul>

//               {currentData.showMoreInfoButton && (
//                 <>
//                   <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
//                     {/* More Info Button */}
//                     <Button
//                       className='py-2 px-4 bg-primary text-white text-sm rounded-full sm:w-auto w-full text-center transition-colors duration-300 hover:bg-blue-700'
//                       onClick={handleMoreInfoClick}
//                     >
//                       More Info
//                     </Button>

                    
//                   </div>

//                   {/* More Info Content */}
//                   <div
//                     className={`mt-4 p-4 bg-gray-100 rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${
//                       showMoreInfo ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//                     }`}
//                   >
//                     <p className="text-gray-700">
//                       {currentData.moreInfo}
//                     </p>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Hero;

"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // For router navigation
import React, { useEffect, useState } from 'react';
function Hero() {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('');
  const router = useRouter(); // For programmatic navigation

  const slides = [
    {
      id: 3,
      image: '/dypatil_clg.jpeg',
      title: ['Dr. D. Y. Patil Institute of Technology'],
      description: [
        'Welcome to Dr. D. Y. Patil Institute of Technology (DIT), Pimpri, Pune. The oldest campus of Dr. D. Y. Patil group of Institutions. This campus is started in year 1983 and further nurtured by our visionary Chairman Hon’ble Dr. P. D. Patil with the vision “Empowerment through knowledge” “Better Education Better World”. The institute is being progressed under the dynamic leadership of Hon’ble Dr. Somnath Patil. Institute has well maintained lawns, trees and handy plantations leading to a healthy and pleasant environment. This institute is in the heart of the city. Walkable distance from public transports such as Bus, Railway and Metro.',
      ],
      moreInfo: 'Institute has well maintained lawns, trees and handy plantations leading to a healthy and pleasant environment. This institute is in the heart of the city. Walkable distance from public transports such as Bus, Railway and Metro. This institute offers 9 Undergraduate Programs including programs in emerging areas such as Artificial Intelligence, Data Science, Automation and Robotics and 5 PG programs.',
      showMoreInfoButton: true,
    },
  ];

  const handleMoreInfoClick = () => {
    setShowMoreInfo(!showMoreInfo);
  };

  const handleRedirect = (page) => {
    router.push(page); // Using router.push for navigation
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setSlideDirection('right');
      setTimeout(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        setSlideDirection('');
      }, 500);
    }, 12000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const currentData = slides[currentSlide];

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="relative overflow-hidden">
          <div
            className={`grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 transition-transform duration-500 ${
              slideDirection === 'right' ? 'translate-x-full' : 'translate-x-0'
            }`}
          >
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
              <Image
                alt={currentData.title}
                src={currentData.image}
                width={800}
                height={800}
                className="absolute inset-0 h-full w-full object-cover rounded-3xl"
              />
            </div>

            <div className="lg:py-24">
              <h2 className="text-4xl font-bold sm:text-4xl text-primary">
                {currentData.title.map((line, index) => (
                  <React.Fragment key={index}>
                    <span className={index === 0 ? 'text-4xl font-bold' : 'text-xl font-light'}>
                      {line}
                    </span>
                    <br />
                  </React.Fragment>
                ))}
              </h2>

              <ul className="mt-4 list-disc pl-5 text-gray-600">
                {currentData.description.map((item, index) => (
                  <li key={index} className="mb-1">{item}</li>
                ))}
              </ul>

              {currentData.showMoreInfoButton && (
                <>
                  <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                    <Button
                      className="py-2 px-4 bg-primary text-white text-sm rounded-full sm:w-auto w-full text-center transition-colors duration-300 hover:bg-blue-700"
                      onClick={handleMoreInfoClick}
                    >
                      More Info
                    </Button>
                  </div>

                  <div
                    className={`mt-4 p-4 bg-gray-100 rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${
                      showMoreInfo ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-gray-700">{currentData.moreInfo}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Buttons below */}
        <div className="mt-20 border-2 bg-gray-200 border-gray-300 p-8 rounded-lg">
  {/* Title */}
  <h3 className="text-2xl font-bold text-center mb-8">
    Navigate to Different Pages
  </h3>

</div>

      </div>
    </section>
  );
}

export default Hero;
