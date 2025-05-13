import { useState } from "react";
import { motion } from "framer-motion";
import NavBar from "./NavBar";
import Chat from "./Chat";
import Lottie from "lottie-react";
import animationData from "../assets/tech-flow.json";
import {
  ArrowUpIcon,
  BoltIcon,
  HeartIcon,
  BookOpenIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import Footer from "./Footer";
import "./Home.css";

function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const resume = {
    personal: {
      name: "Joaquin Ferrer",
      city: "Burlington, ON",
    },
    profile:
      "I'm a results-driven Senior Product Owner with over 14 years of experience in product management, agile delivery, business analysis, and strategic planning. I’m passionate about leading cross-functional teams to build meaningful, customer-centric solutions that create real impact. My approach blends emerging technologies with agile methodologies to drive innovation, streamline delivery, and continuously improve the user experience. In 2023, I was honored with a top performance award recognizing my leadership and contributions to high-impact initiatives. I thrive at the intersection of strategy, execution, and innovation—bringing ideas to life in ways that make a difference.",
    education: [
      {
        degree: "MBA, Global Retail Marketing and Strategy",
        institution: "Schulich School of Business, Toronto",
        date: "August 2016",
      },
      {
        degree: "B.B.A, Executive Business and Administration",
        institution: "EBC (Banking & Commerce School), Mexico City",
        date: "February 2013",
      },
      {
        degree: "Diploma, Project Management",
        institution: "ITESM (Tec de Monterrey Sta Fe), Mexico City",
        date: "September 2008",
      },
      {
        degree: "BS, Industrial Design (BID)",
        institution: "Universidad Iberoamericana, Mexico City",
        date: "May 2007",
      },
    ],
    experience: [
      {
        company: "Scotiabank, Toronto",
        role: "Sr Manager, Product Owner – Third Party Risk Management (TPRM)",
        date: "Sep 2021 - Present",
        responsibilities: [
          "Spearheaded the end-to-end product lifecycle for a risk assessment tool, aligning 13 cross-functional teams to integrate regulatory guidelines seamlessly into TPRM processes, enhancing compliance without compromising efficiency.",
          "Drove 80+ process enhancements, automating workflows and reducing delays, resulting in significant improvements in system performance and user satisfaction.",
          "Crafted a strategic roadmap that balanced business objectives, compliance mandates, and user needs, prioritizing high-impact updates based on real-time feedback and data insights.",
          "Ensured adherence to OSFI B-10 regulations through close collaboration with SMEs and Technology teams, delivering compliant solutions on time.",
          "Led user acceptance testing, release management, and change management initiatives, ensuring smooth adoption of enhancements across the organization.",
          "Mentored 1-3 contingent workers, fostering expertise in TPRM processes and SDLC, and building a cohesive team dynamic.",
        ],
      },
      {
        company: "Scotiabank, Toronto",
        role: "Delivery Manager / Scrum Master, International Technology Systems",
        date: "Jan 2018 – Aug 2021",
        responsibilities: [
          "Introduced Kanban and Scrum methodologies to streamline the Net Promoter Score (NPS) project and iCRM Sales Tools implementation, boosting team efficiency and delivery speed.",
          "Optimized hybrid Agile-Waterfall workflows, enhancing requirement gathering, effort estimation, and production support for international banking initiatives.",
          "Designed transformative customer journeys for a new CRM system in Chile, revolutionizing sales processes across Retail, Commercial, and Wealth segments.",
          "Secured $2MM in funding for CRM development by aligning stakeholders and defining robust business flows, ensuring seamless system integration.",
          "Developed Power BI dashboards to empower 200+ Sales Officers in the Caribbean with real-time sales performance insights, driving data-informed decisions.",
          "Integrated NPS insights into CRM platforms, significantly improving customer engagement and satisfaction metrics.",
        ],
      },
      {
        company: "Scotiabank, Toronto",
        role: "Manager, AML Enhanced Due Diligence",
        date: "Jun 2017 – Dec 2017",
        responsibilities: [
          "Collaborated in developing the divisional Enhanced Due Diligence Manual Procedures for the AML department, designing the To-Be Target Operating Model (TOM) across PAC, ECR, and CCAU hubs.",
          "Designed and standardized a Risk Assessment Worksheet for 12 Enhanced Due Diligence (EDDU) Hubs in compliance with the new KYC Policy, tailored for Retail, Commercial Banking, Wealth Management, and Small Business units.",
        ],
      },
      {
        company: "Scotiabank, Toronto",
        role: "Business Analyst",
        date: "Oct 2016 – May 2017",
        responsibilities: [
          "Collaborated in the successful implementation of an in-house CRM system across 21 countries in the Caribbean within two months.",
          "Coordinated and communicated with multiple countries, liaising with cross-functional teams during deployment.",
          "Actioned stakeholder feedback post-implementation via daily calls with 9+ Caribbean countries, communicating takeaways to project stakeholders using an executive bulletin.",
          "Analyzed and solved business and technological requirements, providing guidance to implement and communicate solutions.",
        ],
      },
      {
        company: "NEORIS, Mexico City",
        role: "Business Consultant / Project Manager",
        date: "Nov 2012 – Dec 2014",
        responsibilities: [
          "Managed three major accounts’ monthly Profit and Loss worth $1.5 million USD in annual revenue across printing solutions, financial institutions, and car parts manufacturing.",
          "Collaborated in structuring and winning an RFP for $1 million USD SAP solution for a pharmaceutical company, planning and designing the Materials Management module for procurement.",
          "Led a $200K project for a transnational bread company, reengineering the procurement process using BPM standards to reduce operational risks.",
        ],
      },
      {
        company: "Early Career (Various)",
        role: "Multiple Roles",
        date: "Aug 2007 – Oct 2012",
        responsibilities: [
          "Traded $500K monthly in Forex at Mifel Bank, leveraging economic data and financial trends for profitable decisions.",
          "Led the launch of a stock brokerage house at Index Financial Services, collaborating with Finance, IT, and Operations teams while managing risks and communication.",
          "Redesigned IT processes at ING Pension Funds using ITIL standards, aligning teams to reduce operational risk.",
          "Secured an $11M credit deal and designed office layouts for $2M+ projects, demonstrating a results-driven approach.",
        ],
      },
    ],
    certifications: [
      {
        name: "Applied Business Analytics",
        institution: "MIT Management Executive Education Online",
        date: "March 2021",
      },
      {
        name: "Certificate Diploma, Business Analytics",
        institution: "Harvard Online Business School",
        date: "May 2020",
      },
      {
        name: "Certificate Diploma, Data Science",
        institution: "Brainstation, Toronto, Canada",
        date: "September 2019",
      },
      {
        name: "Professional Scrum Product Owner",
        institution: "Scotiabank, Toronto, Canada",
        date: "August 2021",
      },
      {
        name: "Professional Agile Leadership Certification",
        institution: "Scotiabank, Toronto, Canada",
        date: "March 2019",
      },
      {
        name: "Professional Scrum Master Certification",
        institution: "Scotiabank, Toronto, Canada",
        date: "December 2018",
      },
    ],
    skills: [
      "Atlassian Suite: JIRA, Confluence (Proficient)",
      "Coupa – Risk Assessment Tool (Proficient)",
      "Microsoft Office Suite: Excel, PowerPoint, Word (Advanced)",
      "SQL and Python for Data Analysis (Basic)",
      "Power BI (Basic)",
    ],
    hobbies: [
      "Indoor climbing",
      "Exercising at the gym",
      "Running",
      "Reading sci-fi and fantasy novels",
      "Learning new AI and exploring its applications",
    ],
    additionalInfo: {
      teamManagement: "I’ve directly managed 3 team members, including technical and business analysts, fostering collaboration in TPRM processes and SDLC.",
      storyPoints: "I have used story points to estimate effort in sprint planning, collaborating with teams to assign points based on complexity, risk, and dependencies. I've used the Fibonacci framework scales (1, 2, 3, 5, 8) to prioritize features and bring value to the business.",
      prioritization: "I prioritize features using a value-vs-effort matrix, balancing OSFI B-10 compliance, stakeholder needs, and user feedback. For TPRM tools, I applied MoSCoW (Must-have, Should-have, Could-have, Won’t-have) to focus on high-impact updates like risk assessment automation.",
      roadmap: "I build roadmaps by defining a product's vision first and the goal to achieve. From there, story mapping was used to build high-level epics that were later broken down into user stories.",
      userStories: "I create user stories to help my Business Partners capture user needs, serving as a useful guideline for development and testing.",
      userTesting: "In my role as Product Owner, I have helped bring to life more than 80 new features and enhancements, collaborating with more than 13 different stakeholders across a large organization, helping them understand and adapt to change.",
    },
  };

  const keyPoints = [
    "Product Strategy",
    "Agile Leadership",
    "Roadmapping",
    "Team Mentorship",
    "Problem solving",
    "Systems Thinking",
  ];

  const hobbyIcons = {
    "Indoor climbing": ArrowUpIcon,
    "Exercising at the gym": BoltIcon,
    "Running": HeartIcon,
    "Reading sci-fi and fantasy novels": BookOpenIcon,
    "Learning new AI and exploring its applications": AcademicCapIcon,
  };

  return (
    <div className="bg-gray-100 font-sans w-full">
      <NavBar toggleChat={toggleChat} />
      <section
        id="top"
        className="min-h-[85vh] flex items-center justify-center bg-gradient-to-r from-blue-100 to-white pt-8 relative overflow-hidden w-full sm:min-h-screen sm:pt-16"
      >
        <div className="absolute bottom-0 w-full h-1/2 lottie-container">
          <Lottie
            animationData={animationData}
            loop={true}
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-center z-10 w-full px-4 sm:max-w-4xl sm:mx-auto sm:px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800">
            {resume.personal.name}
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-600">
            Senior Product Owner
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {keyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="pill rounded-full bg-transparent text-sm md:text-base"
              >
                {point}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      <section id="profile" className="py-16 bg-white relative w-full">
        <div className="w-full max-w-full px-0 sm:max-w-4xl sm:mx-auto sm:px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-gray-800 text-center mb-8 border-b-2 border-blue-500 inline-block"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-600 leading-relaxed px-4 sm:px-0"
          >
            {resume.profile}
          </motion.p>
          <motion.button
            onClick={toggleChat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-4 right-4 text-sm italic text-blue-600 hover:text-blue-700 transition sm:bottom-6 sm:right-6"
          >
            Curious about my approach to product leadership? Ask me via the chat!
          </motion.button>
        </div>
      </section>
      <section id="experience" className="py-16 bg-gray-50 relative w-full">
        <div className="w-full max-w-full px-0 sm:max-w-4xl sm:mx-auto sm:px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-gray-800 text-center mb-8 border-b-2 border-blue-500 inline-block"
          >
            Professional Experience
          </motion.h2>
          {resume.experience.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="mb-8 px-4 sm:px-0"
            >
              <h3 className="text-xl font-semibold text-gray-800">{job.role}</h3>
              <p className="text-lg text-blue-600">{job.company}</p>
              <p className="text-gray-500">{job.date}</p>
              <ul className="mt-4 space-y-2 list-disc list-inside text-gray-600">
                {job.responsibilities.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </motion.div>
          ))}
          <motion.button
            onClick={toggleChat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-4 right-4 text-sm italic text-blue-600 hover:text-blue-700 transition sm:bottom-6 sm:right-6"
          >
            Want details on my projects or roles? Use the chat to ask!
          </motion.button>
        </div>
      </section>
      <section id="education" className="py-16 bg-white relative w-full">
        <div className="w-full max-w-full px-0 sm:max-w-4xl sm:mx-auto sm:px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-gray-800 text-center mb-8 border-b-2 border-blue-500 inline-block"
          >
            Education
          </motion.h2>
          {resume.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="mb-6 px-4 sm:px-0"
            >
              <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
              <p className="text-lg text-blue-600">{edu.institution}</p>
              <p className="text-gray-500">{edu.date}</p>
            </motion.div>
          ))}
          <motion.button
            onClick={toggleChat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-4 right-4 text-sm italic text-blue-600 hover:text-blue-700 transition sm:bottom-6 sm:right-6"
          >
            Interested in my academic journey? Chat with me to learn more!
          </motion.button>
        </div>
      </section>
      <section id="certifications" className="py-16 bg-gray-50 relative w-full">
        <div className="w-full max-w-full px-0 sm:max-w-4xl sm:mx-auto sm:px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-gray-800 text-center mb-8 border-b-2 border-blue-500 inline-block"
          >
            Certifications
          </motion.h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc list-inside text-gray-600 px-4 sm:px-0">
            {resume.certifications.map((cert, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {cert.name} – {cert.institution} ({cert.date})
              </motion.li>
            ))}
          </ul>
          <motion.button
            onClick={toggleChat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-4 right-4 text-sm italic text-blue-600 hover:text-blue-700 transition sm:bottom-6 sm:right-6"
          >
            Questions about my certifications? Hit the chat button to ask!
          </motion.button>
        </div>
      </section>
      <section id="skills" className="py-16 bg-white relative w-full">
        <div className="w-full max-w-full px-0 sm:max-w-4xl sm:mx-auto sm:px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-gray-800 text-center mb-8 border-b-2 border-blue-500 inline-block"
          >
            Skills
          </motion.h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600 px-4 sm:px-0">
            {resume.skills.map((skill, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gray-100 p-4 rounded-lg text-center"
              >
                {skill}
              </motion.li>
            ))}
          </ul>
          <motion.button
            onClick={toggleChat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-4 right-4 text-sm italic text-blue-600 hover:text-blue-700 transition sm:bottom-6 sm:right-6"
          >
            Wondering how I apply my skills? Ask me through the chat!
          </motion.button>
        </div>
      </section>
      <section id="hobbies" className="py-16 bg-gray-50 relative w-full">
        <div className="w-full max-w-full px-0 sm:max-w-4xl sm:mx-auto sm:px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-gray-800 text-center mb-8 border-b-2 border-blue-500 inline-block"
          >
            Hobbies
          </motion.h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600 px-4 sm:px-0">
            {resume.hobbies.map((hobby, index) => {
              const Icon = hobbyIcons[hobby];
              return (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-gray-100 p-4 rounded-lg text-center"
                >
                  <div className="flex flex-col items-center">
                    <Icon className="h-6 w-6 text-gray-600 mb-2" />
                    <span>{hobby}</span>
                  </div>
                </motion.li>
              );
            })}
          </ul>
          <motion.button
            onClick={toggleChat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-4 right-4 text-sm italic text-blue-600 hover:text-blue-700 transition sm:bottom-6 sm:right-6"
          >
            Want to know more about my interests? Use the chat to ask!
          </motion.button>
        </div>
      </section>
      <Chat isOpen={isChatOpen} toggleChat={toggleChat} resume={resume} />
      <Footer />
    </div>
  );
}

export default Home;