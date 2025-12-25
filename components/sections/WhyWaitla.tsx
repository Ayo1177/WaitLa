"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";

export default function WhyWaitla() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reasons = [
    {
      title: "Une équipe hors normes",
      description: "Des profils créatifs et techniques, formés sur des marchés internationaux, capables de penser global et d'exécuter local.",
    },
    {
      title: "Marketing + Technologie",
      description: "Chez nous, la stratégie ne s'arrête pas au design : développement, automatisation, tracking et optimisation font partie du processus.",
    },
    {
      title: "Orientés résultats, pas promesses",
      description: "Chaque action est pensée pour générer de la visibilité, de l'engagement et des conversions mesurables.",
    },
    {
      title: "Vision moderne du marketing",
      description: "Nous adaptons les marques aux nouveaux usages, aux événements majeurs et aux opportunités réelles du marché.",
    },
  ];

  return (
    <section ref={ref} className="relative z-20 py-24 sm:py-32 -mt-1 bg-gradient-to-r from-primary-dark via-primary to-accent-dark">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:text-center">
          {isInView && (
            <motion.h2
              className="text-base font-semibold leading-7 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Pourquoi Waitla et pas d'autre ?
            </motion.h2>
          )}
          {isInView && (
            <motion.p
              className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Chez Waitla, nous ne sommes pas une agence marketing « classique ».
            </motion.p>
          )}
          {isInView && (
            <motion.p
              className="mt-6 text-lg leading-8 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Notre équipe est composée de développeurs et marketeurs expérimentés, ayant travaillé sur des projets à l'échelle internationale. Nous comprenons le marketing au-delà des tendances : nous maîtrisons la technique, la stratégie et la performance réelle.
            </motion.p>
          )}
          {isInView && (
            <motion.p
              className="mt-4 text-lg leading-8 text-white/90 font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Nous ne faisons pas que des campagnes. Nous construisons des systèmes de croissance.
            </motion.p>
          )}
        </div>

        {/* Pourquoi Waitla Section */}
        <div className="mt-16 lg:mt-20">
          {isInView && (
            <motion.div
              className="flex items-center justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-white">Pourquoi Waitla ?</h3>
            </motion.div>
          )}
          
          <div className="mx-auto max-w-4xl grid grid-cols-1 gap-8 md:grid-cols-2">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {reason.title}
                  </h4>
                  <p className="text-base text-white/90">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Notre philosophie Section */}
        <div className="mt-16 lg:mt-20">
          {isInView && (
            <motion.div
              className="mx-auto max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <div className="flex items-center justify-center mb-6">
                <h3 className="text-2xl font-bold text-white font-serif" style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}>Notre philosophie</h3>
              </div>
              
              {/* Parchment-style container */}
              <div 
                className="relative px-8 py-10 md:px-12 md:py-14 rounded-lg shadow-2xl"
                style={{
                  background: 'linear-gradient(to bottom, #f4e8d0 0%, #e8d5b7 50%, #d4c0a0 100%)',
                  backgroundImage: `
                    radial-gradient(circle at 20% 50%, rgba(139, 28, 26, 0.05) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(139, 28, 26, 0.05) 0%, transparent 50%),
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      rgba(139, 28, 26, 0.03) 2px,
                      rgba(139, 28, 26, 0.03) 4px
                    )
                  `,
                  border: '2px solid rgba(139, 28, 26, 0.2)',
                  boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.1), 0 10px 30px rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                }}
              >
                {/* Aged paper texture overlay */}
                <div 
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    backgroundImage: `
                      url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E"),
                      radial-gradient(circle at 1px 1px, rgba(139, 28, 26, 0.15) 1px, transparent 0)
                    `,
                    backgroundSize: '100px 100px, 20px 20px',
                    opacity: 0.4,
                  }}
                />
                
                {/* Burned/aged edges effect */}
                <div 
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    background: `
                      radial-gradient(ellipse at top left, rgba(139, 28, 26, 0.1) 0%, transparent 50%),
                      radial-gradient(ellipse at top right, rgba(139, 28, 26, 0.1) 0%, transparent 50%),
                      radial-gradient(ellipse at bottom left, rgba(139, 28, 26, 0.1) 0%, transparent 50%),
                      radial-gradient(ellipse at bottom right, rgba(139, 28, 26, 0.1) 0%, transparent 50%)
                    `,
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10">
                  <p 
                    className="text-xl sm:text-2xl leading-relaxed text-center font-serif italic font-bold"
                    style={{ 
                      fontFamily: 'Georgia, "Times New Roman", Times, serif',
                      color: '#2d2418',
                      textShadow: '0 2px 4px rgba(255, 255, 255, 0.8), 0 1px 2px rgba(255, 255, 255, 0.6)',
                      letterSpacing: '0.01em',
                    }}
                  >
                    Ne pas faire comme les autres agences, mais faire mieux, différemment et intelligemment.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

