'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from "../ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs"
import { ArrowRight, BarChart2, DollarSign, Globe, Lock, Zap } from "lucide-react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"

const GlassmorphicCard = ({ children, className = "" }) => (
  <div className={`backdrop-blur-md bg-white/10 rounded-xl p-6 shadow-lg ${className}`}>
    {children}
  </div>
)



const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const inView = useInView(countRef)

  useEffect(() => {
    if (inView) {
      let start = 0
      const end = parseInt(value.toString().replace(/,/g, ''))
      const incrementTime = (duration / end) * 1000
      console.log(incrementTime)

      const timer = setInterval(() => {
        start += 1
        setCount(start)
        if (start === end) clearInterval(timer)
      }, incrementTime)

      return () => clearInterval(timer)
    }
  }, [value, duration, inView])

  return <span ref={countRef}>{count.toLocaleString()}</span>
}

const ParallaxSection = ({ children, offset = 50 }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}

export default function EnhancedLandingPage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-purple-500 z-50" style={{ scaleX }} />

      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10">
        <motion.h1 
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Crowdsourced
        </motion.h1>
        <nav>
          <Button variant="ghost" className="text-white mr-4 hover:bg-purple-500/20 transition-colors">Login</Button>
          <Button className="bg-purple-600 hover:bg-purple-700 transition-colors">Sign Up</Button>
        </nav>
      </header>

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity }} className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`object-cover w-full h-full transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-50' : 'opacity-0'}`}
          >
            <source src="/assets/zkevm720p.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Unlock the Power of the Crowd
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Gather Real-Time Data and Insights Through Our Global Network of Contributors
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6 group transition-all duration-300 transform hover:scale-105">
              Get Insights (For Companies)
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 group transition-all duration-300 transform hover:scale-105">
              Earn Rewards (For Voters)
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* What is Crowdsourced? */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Connecting Companies with a Global Network of Voters
          </motion.h2>
          <motion.p 
            className="text-xl mb-12 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Crowdsourced is a platform that facilitates the collection of opinions, feedback, and responses on a large scale. Companies post tasks, and individuals (Voters) complete them to earn cryptocurrency rewards.
          </motion.p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "Diverse Tasks", content: "Engage with a wide variety of projects and contribute your unique perspective." },
              { icon: DollarSign, title: "Cryptocurrency Rewards", content: "Earn digital currency for your valuable input and time spent on tasks." },
              { icon: Zap, title: "Powered by Polygon", content: "Benefit from fast, secure, and low-cost transactions on a scalable blockchain network." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
                viewport={{ once: true }}
              >
                <GlassmorphicCard className="h-full group hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <item.icon className="mr-2 h-8 w-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-lg">
                    {item.content}
                  </CardContent>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/20 to-blue-900/20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            How it Works
          </motion.h2>
          <Tabs defaultValue="companies" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="companies" className="text-lg py-3">For Companies</TabsTrigger>
              <TabsTrigger value="voters" className="text-lg py-3">For Voters</TabsTrigger>
            </TabsList>
            <TabsContent value="companies">
              <GlassmorphicCard>
                <CardHeader>
                  <CardTitle className="text-2xl">Get the Data You Need to Make Informed Decisions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-4 mb-6 text-lg">
                    {["Post a Task", "Fund Your Project", "Access a Global Network of Voters", "Gather Valuable Insights"].map((step, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        viewport={{ once: true }}
                      >
                        {step}
                      </motion.li>
                    ))}
                  </ol>
                  <h4 className="font-semibold mb-2 text-xl">Benefits:</h4>
                  <ul className="list-disc list-inside space-y-2 text-lg">
                    {["Train AI models with diverse datasets", "Get real-time product feedback", "Conduct large-scale market research", "Make data-driven decisions"].map((benefit, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * (index + 4) }}
                        viewport={{ once: true }}
                      >
                        {benefit}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </GlassmorphicCard>
            </TabsContent>
            <TabsContent value="voters">
              <GlassmorphicCard>
                <CardHeader>
                  <CardTitle className="text-2xl">Earn Cryptocurrency by Sharing Your Opinions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-4 mb-6 text-lg">
                    {["Browse and Select Tasks", "Complete Tasks and Provide Your Input", "Earn Cryptocurrency Rewards"].map((step, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        viewport={{ once: true }}
                      >
                        {step}
                      </motion.li>
                    ))}
                  </ol>
                  <h4 className="font-semibold mb-2 text-xl">Benefits:</h4>
                  <ul className="list-disc list-inside space-y-2 text-lg">
                    {["Earn money for your time and insights", "Engage in interesting and varied tasks", "Be part of a global community of contributors"].map((benefit, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * (index + 3) }}
                        viewport={{ once: true }}
                      >
                        {benefit}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </GlassmorphicCard>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Use Cases
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BarChart2, title: "Training AI Models", content: "Leverage diverse datasets to improve machine learning algorithms and AI performance." },
              { icon: DollarSign, title: "Product Feedback", content: "Gather real-time insights from a global audience to refine and improve your products." },
              { icon: Globe, title: "Market Research", content: "Conduct large-scale surveys and studies to understand market trends and consumer behavior." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                viewport={{ once: true }}
              >
                <GlassmorphicCard className="h-full group hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <item.icon className="mr-2 h-8 w-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-lg">
                    {item.content}
                  </CardContent>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology and Trust */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/20 to-blue-900/20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Built on Security and Transparency
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                icon: Zap, 
                title: "Polygon Technology", 
                content: [
                  "Fast, low-cost, and secure transactions",
                  "Scalability for growing demand",
                  "Interoperability with Ethereum for enhanced credibility and reach"
                ]
              },
              { 
                icon: Lock, 
                title: "Secure Payment System", 
                content: [
                  "Worker pre-payment ensures rewards are secured and tasks are legitimate, providing trust and reliability for all participants."
                ]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                viewport={{ once: true }}
              >
                <GlassmorphicCard className="h-full group hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <item.icon className="mr-2 h-8 w-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-lg">
                      {item.content.map((text, i) => (
                        <li key={i}>{text}</li>
                      ))}
                    </ul>
                  </CardContent>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <ParallaxSection>
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2 
              className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Our Impact
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Active Users", value: "5,000+" },
                { label: "Tasks Completed", value: "1,000+" },
                { label: "Companies Served", value: "500+" },
                { label: "Tokens Distributed", value: "1,000+" }
              ].map((stat, index) => (
                <GlassmorphicCard key={index} className="text-center">
                  <CardContent>
                    <h3 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                      <AnimatedCounter value={stat.value.replace(/\D/g, '')} />
                      {stat.value.includes('+') ? '+' : ''}
                    </h3>
                    <p className="text-lg">{stat.label}</p>
                  </CardContent>
                </GlassmorphicCard>
              ))}
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Footer */}
      <footer className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-2">Crowdsourced</h3>
              <p className="text-gray-400">Connecting companies with global insights</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-purple-600 hover:bg-purple-700 group transition-all duration-300 transform hover:scale-105">
                Get Started as a Company
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 group transition-all duration-300 transform hover:scale-105">
                Join as a Voter
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          <div className="flex justify-center space-x-4 text-gray-400">
            <a href="#" className="hover:text-white transition-colors duration-200">About Us</a>
            <a href="#" className="hover:text-white transition-colors duration-200">How It Works</a>
            <a href="#" className="hover:text-white transition-colors duration-200">FAQs</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}