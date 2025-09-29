import { motion } from "framer-motion";
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaFacebook,
} from "react-icons/fa";

const people = [
  {
    name: "Valentino Hibran",
    role: "Frontend Developer",
    image: "/src/assets/img/Frontend.jpg",
    socials: {
      instagram: "https://instagram.com/hibran_abdi",
      linkedin: "https://linkedin.com/in/yourusername",
      github: "https://github.com/yourusername",
      whatsapp: "https://wa.me/62895392180807",
      facebook: "https://facebook.com/valentino.hibran.5",
    },
    education: [
      "SD Karangduren 01",
      "SMPN 2 Tengaran",
      "SMK Negeri Tengaran - Rekayasa Perangkat Lunak",
    ],
    skills: ["React", "Tailwind CSS", "JavaScript", "HTML", "CSS", "Git"],
    certificates: [
      "React Fundamentals - Online Course 2023",
      "UI/UX Design Workshop 2022",
    ],
    projects: [
      {
        name: "Pity Chick Frontend",
        description:
          "Order system with React, authentication, booking features.",
      },
      {
        name: "Social Media Content Design",
        description: "Created visual assets for social media campaigns.",
      },
    ],
    experience: [
      {
        year: "2024",
        title: "Built Pity Chick Frontend",
        description:
          "Created an order system using React, with authentication and booking features.",
      },
      {
        year: "2023",
        title: "Design Internship",
        description: "Assisted in creating social media content and UI mockups.",
      },
    ],
    languages: ["Indonesian", "English (fluent, for client communication)"],
  },
  {
    name: "Wahyu Stiawan",
    role: "Backend Developer",
    image: "/src/assets/img/Backend.jpg",
    socials: {
      instagram: "https://instagram.com/stiawann0",
      linkedin: "https://linkedin.com/in/wahyu-stiawan",
      github: "https://github.com/stiawann0",
      whatsapp: "https://wa.me/6289525864136",
      facebook: "https://facebook.com/wahyu.stiawan.967",
    },
    education: [
      "SD Negeri Sampetan",
      "SMP Smaratungga Ampel",
      "SMK Negeri Tengaran - Rekayasa Perangkat Lunak",
    ],
    skills: ["Node.js", "Express", "MongoDB", "REST API", "JWT", "Docker"],
    certificates: [
      "Backend Development Bootcamp 2023",
      "Database Management Course 2022",
    ],
    projects: [
      {
        name: "Pity Chick Backend",
        description:
          "Developed API and database services with user authentication and admin panel.",
      },
      {
        name: "Server Maintenance",
        description: "Maintained and monitored school server infrastructures.",
      },
    ],
    experience: [
      {
        year: "2024",
        title: "Built Pity Chick Backend",
        description:
          "Developed API and database services with user authentication and admin panel.",
      },
      {
        year: "2023",
        title: "Server Maintenance Assistant",
        description: "Maintained and monitored school server infrastructures.",
      },
    ],
    languages: ["Indonesian", "English (fluent, for client communication)"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.2 },
  }),
  hover: { scale: 1.05 },
};

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-12 py-6">
      {/* Logo Section */}
      <div className="flex justify-center mb-4">
        <motion.img
          src="/src/assets/img/Vayo.png"
          alt="Vayo Logo"
          className="w-24 h-24 object-contain"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">Our Team</h1>

      {/* Team Cards */}
      <div className="grid md:grid-cols-2 gap-10 mb-10">
        {people.map((person, i) => (
          <motion.div
            key={person.name}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="bg-white rounded-lg p-6 flex flex-col items-center cursor-pointer shadow-lg"
            style={{ boxShadow: "0 4px 8px rgba(239, 68, 68, 0.3)" }}
          >
            <img
              src={person.image}
              alt={`${person.name} profile`}
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-md"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/src/assets/img/default-profile.png";
              }}
            />
            <h2 className="text-xl font-semibold text-center">{person.name}</h2>
            <p className="text-gray-600 text-center">{person.role}</p>

            <div className="flex space-x-4 mt-4 text-xl">
              {person.socials.instagram && (
                <a href={person.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} Instagram`}>
                  <FaInstagram className="text-pink-500 hover:text-pink-600" />
                </a>
              )}
              {person.socials.linkedin && (
                <a href={person.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} LinkedIn`}>
                  <FaLinkedin className="text-blue-600 hover:text-blue-700" />
                </a>
              )}
              {person.socials.github && (
                <a href={person.socials.github} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} Github`}>
                  <FaGithub className="text-gray-800 hover:text-black" />
                </a>
              )}
              {person.socials.whatsapp && (
                <a href={person.socials.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} WhatsApp`}>
                  <FaWhatsapp className="text-green-500 hover:text-green-600" />
                </a>
              )}
              {person.socials.facebook && (
                <a href={person.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} Facebook`}>
                  <FaFacebook className="text-blue-700 hover:text-blue-800" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Section */}
      <div className="max-w-5xl mx-auto">
        {people.map((person, i) => (
          <motion.div
            key={person.name + "-detail"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.3 }}
            className="mb-12 bg-white p-6 rounded-lg shadow"
          >
            <h3 className="text-2xl font-semibold mb-4">
              {person.name} - {person.role}
            </h3>

            <div className="mb-3">
              <h4 className="font-semibold text-lg mb-1">Education</h4>
              <ul className="list-disc list-inside text-gray-700">
                {person.education.map((edu, j) => (
                  <li key={j}>{edu}</li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <h4 className="font-semibold text-lg mb-1">Skills</h4>
              <p className="text-gray-700">{person.skills.join(", ")}</p>
            </div>

            <div className="mb-3">
              <h4 className="font-semibold text-lg mb-1">Certificates</h4>
              <ul className="list-disc list-inside text-gray-700">
                {person.certificates.map((cert, j) => (
                  <li key={j}>{cert}</li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <h4 className="font-semibold text-lg mb-1">Projects</h4>
              {person.projects.map((proj, j) => (
                <p key={j}>
                  <span className="font-semibold">{proj.name}:</span> {proj.description}
                </p>
              ))}
            </div>

            <div className="mb-3">
              <h4 className="font-semibold text-lg mb-1">Experience</h4>
              <ul className="list-disc list-inside text-gray-700">
                {person.experience.map((exp, j) => (
                  <li key={j}>
                    <span className="font-semibold">{exp.year} – {exp.title}:</span> {exp.description}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <h4 className="font-semibold text-lg mb-1">Languages</h4>
              <p className="text-gray-700">{person.languages.join(", ")}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <footer className="text-center mt-12 text-sm text-gray-500">
        © 2025 Valentino Hibran & Wahyu Stiawan
      </footer>
    </div>
  );
};

export default PortfolioPage;
