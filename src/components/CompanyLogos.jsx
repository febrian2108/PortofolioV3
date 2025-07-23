import { motion } from 'framer-motion'

const CompanyLogos = () => {
  const companies = [
    { name: 'Google', logo: '/company-logos/google.png' },
    { name: 'Microsoft', logo: '/company-logos/microsoft.jpg' },
    { name: 'Apple', logo: '/company-logos/apple.png' },
    { name: 'Amazon', logo: '/company-logos/amazon.png' },
    { name: 'Meta', logo: '/company-logos/meta.jpg' },
  ]

  return (
    <div className="w-full py-8">
      <p className="text-gray-400 text-sm uppercase tracking-wider text-center mb-6">
        Trusted by companies
      </p>
      <div className="overflow-hidden">
        <motion.div
          animate={{
            x: [0, -1000]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="flex space-x-8 whitespace-nowrap"
        >
          {/* Duplicate companies for seamless loop */}
          {[...companies, ...companies, ...companies].map((company, index) => (
            <div key={index} className="flex-shrink-0">
              <img
                src={company.logo}
                alt={company.name}
                className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default CompanyLogos

