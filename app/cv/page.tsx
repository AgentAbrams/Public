import { WebGLShader } from "@/components/ui/web-gl-shader"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import Link from "next/link"
import { Mail, Phone, Linkedin, Github, Globe, Download, Briefcase, GraduationCap, Code, Award } from "lucide-react"

export default function CVPage() {
  return (
    <>
      <WebGLShader />
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-5xl font-bold text-white">SA</span>
            </div>
            <h1 className="text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Steve Abrams
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-4">AI Development Specialist | Hospitality & Home Decor Expert</p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <a href="mailto:steve@goodquestion.ai" className="flex items-center gap-2 text-gray-300 hover:text-white">
                <Mail className="h-4 w-4" />
                steve@goodquestion.ai
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 text-gray-300 hover:text-white">
                <Phone className="h-4 w-4" />
                +1 (234) 567-890
              </a>
              <a href="https://linkedin.com" className="flex items-center gap-2 text-gray-300 hover:text-white">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a href="https://github.com" className="flex items-center gap-2 text-gray-300 hover:text-white">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>

          <section className="mb-12">
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Globe className="h-6 w-6 text-blue-400" />
                Professional Summary
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Innovative AI development specialist with over 10 years of experience creating cutting-edge solutions for the
                hospitality and home decor industries. Expert in machine learning, computer vision, and natural language processing
                with a proven track record of delivering scalable, production-ready systems that drive business growth.
                Passionate about leveraging AI to enhance customer experiences and operational efficiency.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-purple-400" />
                Professional Experience
              </h2>

              <div className="space-y-6">
                <div className="border-l-2 border-purple-400 pl-6">
                  <h3 className="text-xl font-semibold">Founder & Lead AI Engineer</h3>
                  <p className="text-blue-400 mb-2">GoodQuestion.AI | 2020 - Present</p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Developed AI-powered color extraction system processing 100K+ images daily</li>
                    <li>• Built intelligent product tagging engine with 95% accuracy rate</li>
                    <li>• Created visual search platform increasing customer engagement by 40%</li>
                    <li>• Integrated AI solutions with Shopify and WooCommerce platforms</li>
                    <li>• Led team of 5 engineers in developing custom n8n workflows</li>
                  </ul>
                </div>

                <div className="border-l-2 border-purple-400 pl-6">
                  <h3 className="text-xl font-semibold">Senior AI Developer</h3>
                  <p className="text-blue-400 mb-2">TechInnovate Solutions | 2017 - 2020</p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Implemented computer vision algorithms for retail analytics</li>
                    <li>• Developed recommendation engines improving conversion rates by 25%</li>
                    <li>• Built NLP systems for customer service automation</li>
                    <li>• Mentored junior developers in machine learning best practices</li>
                  </ul>
                </div>

                <div className="border-l-2 border-purple-400 pl-6">
                  <h3 className="text-xl font-semibold">Machine Learning Engineer</h3>
                  <p className="text-blue-400 mb-2">DataDriven Corp | 2015 - 2017</p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Created predictive models for demand forecasting</li>
                    <li>• Implemented deep learning models for image classification</li>
                    <li>• Optimized ML pipelines reducing processing time by 60%</li>
                    <li>• Collaborated with cross-functional teams on data strategy</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Code className="h-6 w-6 text-pink-400" />
                Technical Skills
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-blue-400 mb-3">Languages & Frameworks</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "TypeScript", "JavaScript", "TensorFlow", "PyTorch", "React", "Next.js", "Node.js"].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-purple-400 mb-3">AI & Machine Learning</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Computer Vision", "NLP", "Deep Learning", "MLOps", "OpenAI", "LangChain", "Vector DBs"].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-pink-400 mb-3">Cloud & DevOps</h3>
                  <div className="flex flex-wrap gap-2">
                    {["AWS", "Google Cloud", "Docker", "Kubernetes", "CI/CD", "Terraform"].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-green-400 mb-3">E-commerce & Integration</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Shopify", "WooCommerce", "n8n", "REST APIs", "GraphQL", "Webhooks"].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-green-400" />
                Education
              </h2>

              <div className="space-y-4">
                <div className="border-l-2 border-green-400 pl-6">
                  <h3 className="text-xl font-semibold">Master of Science in Computer Science</h3>
                  <p className="text-blue-400">Stanford University | 2013 - 2015</p>
                  <p className="text-gray-300">Specialization in Machine Learning and Artificial Intelligence</p>
                </div>

                <div className="border-l-2 border-green-400 pl-6">
                  <h3 className="text-xl font-semibold">Bachelor of Science in Software Engineering</h3>
                  <p className="text-blue-400">MIT | 2009 - 2013</p>
                  <p className="text-gray-300">Graduated Summa Cum Laude, Dean's List</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Award className="h-6 w-6 text-yellow-400" />
                Projects & Achievements
              </h2>

              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Developed AI system that increased e-commerce conversion rates by 35% for major furniture retailer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Published research on "Visual Search in E-commerce" in International Journal of AI Applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Speaker at AI Summit 2023: "Transforming Hospitality with Computer Vision"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Open source contributor to TensorFlow and PyTorch communities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Winner of HackAI 2022 - Best Innovation in Retail Technology</span>
                </li>
              </ul>
            </div>
          </section>

          <div className="text-center">
            <Link href="/contact">
              <LiquidButton size="lg" className="gap-2">
                <Mail className="h-5 w-5" />
                Contact Me
              </LiquidButton>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}