"use client"
import { motion } from "framer-motion";
import { FiZap, FiLayout, FiLock, FiArrowRight } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white font-bold text-xl"
          >
            Profile<span className="text-purple-400">Craft</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden md:flex items-center space-x-8"
          >
            <motion.a 
              whileHover={{ scale: 1.05, color: "#fff" }}
              className="text-gray-300 cursor-pointer"
            >
              Features
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05, color: "#fff" }}
              className="text-gray-300 cursor-pointer"
            >
              Examples
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05, color: "#fff" }}
              className="text-gray-300 cursor-pointer"
            >
              Pricing
            </motion.a>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-500 px-6 py-2 rounded-full text-white"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="md:w-1/2"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Craft Your Perfect <span className="text-purple-400">Digital Profile</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-300 text-lg mb-8"
            >
              Showcase your personality, skills, and social presence with a beautifully crafted profile page.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex space-x-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-500 px-8 py-4 rounded-full text-white text-lg"
              >
                Start Building Free
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white px-8 py-4 rounded-full text-white text-lg"
              >
                See Examples
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="md:w-1/2 mt-12 md:mt-0"
          >
            <motion.div 
              whileHover={{ rotate: 3 }}
              className="relative max-w-lg ml-auto bg-purple-100 rounded-2xl p-6 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 blur-2xl opacity-30" />
              <div className="relative">
                <motion.div 
                  animate={{
                    y: [0, -10, 0],
                    transition: { repeat: Infinity, duration: 4 }
                  }}
                  className="bg-white rounded-lg p-4 shadow-md"
                >
                  {/* Animated Profile Preview */}
                  <div className="flex items-center mb-6">
                    <motion.div 
                      className="w-20 h-20 rounded-full bg-purple-500"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                    <div className="ml-4">
                      <div className="h-4 bg-gray-200 w-32 mb-2 rounded-full" />
                      <div className="h-3 bg-gray-100 w-48 rounded-full" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[...Array(6)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="h-2 bg-gray-100 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    {[...Array(3)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="h-8 w-8 rounded-full bg-gray-200"
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-6 py-20"
      >
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-white mb-16"
        >
          Amazing Features
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6"
            >
              <motion.div 
                className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center mb-4"
                whileHover={{ rotate: 15 }}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-xl text-white font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
              <motion.div 
                className="mt-4 flex items-center text-purple-400 cursor-pointer"
                whileHover={{ x: 5 }}
              >
                Learn More <FiArrowRight className="ml-2" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className="bg-black bg-opacity-20 py-20"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            className="text-3xl font-bold text-white mb-8"
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0 }}
          >
            Start Building Your Profile Now
          </motion.h2>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-500 px-12 py-4 rounded-full text-white text-lg"
          >
            Create Your Profile - It&apos;s Free!
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

const features = [
  {
    icon: FiZap,
    title: "Lightning Fast",
    description: "Instant deployment with global CDN distribution"
  },
  {
    icon: FiLayout,
    title: "Customizable",
    description: "Flexible layouts and themes to match your style"
  },
  {
    icon: FiLock,
    title: "Secure",
    description: "Enterprise-grade security with end-to-end encryption"
  },
];