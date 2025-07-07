import { useState, useEffect } from 'react';

const About = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: '📋' },
    { id: 'pc-usage', title: 'PC Usage & Borrowing', icon: '💻' },
    { id: 'equipment', title: 'Lab Equipment', icon: '🔧' },
    { id: 'practicum', title: 'Practicum Regulations', icon: '📚' },
    { id: 'contact', title: 'Contact Information', icon: '📞' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
     
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
         
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="container-custom py-8 page-transition">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-8">
          {/* Navigation Panel */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-8">
              <div className="card dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 dark:border dark:border-dark-border p-4">
                <h3 className="text-lg font-semibold mb-4 text-secondary-900 dark:text-dark-text">Navigation</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                        activeSection === section.id
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                          : 'text-secondary-600 dark:text-dark-muted hover:bg-secondary-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="text-base">{section.icon}</span>
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            <div className="card dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 dark:border dark:border-dark-border">
             
              {/* Overview Section */}
              <section id="overview" className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">📋</span>
                  <h1 className="text-3xl font-bold text-secondary-900 dark:text-dark-text">Digilab Information Center</h1>
                </div>
                <div className="prose prose-secondary dark:prose-invert max-w-none">
                  <p className="text-lg text-secondary-600 dark:text-dark-muted mb-6">
                    Welcome to Digilab - your digital laboratory for DTE FTUI Digital Labs Academic Excellence. This comprehensive guide contains all the information you need about our facilities, equipment, and regulations.
                  </p>
                  
                  {/* Lab Team Photo */}
                  <div className="mb-8">
                    <div className="relative overflow-hidden rounded-xl shadow-lg aspect-video">
                      <img 
                        src="https://res.cloudinary.com/dnkkk7pgw/image/upload/v1751865718/1751865645595_qht6gq.jpg" 
                        alt="Digilab Team - Lab Assistants Group Photo"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white text-xl font-bold mb-1">Meet Our Lab Team</h3>
                        <p className="text-white/90 text-sm">
                          Our dedicated lab assistants are here to help you succeed in your academic journey
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="text-2xl mb-2">💻</div>
                      <h3 className="font-semibold text-blue-900 dark:text-blue-300">PC Access</h3>
                      <p className="text-sm text-blue-700 dark:text-blue-400">Public computers available for all students</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="text-2xl mb-2">🔧</div>
                      <h3 className="font-semibold text-green-900 dark:text-green-300">Lab Equipment</h3>
                      <p className="text-sm text-green-700 dark:text-green-400">Specialized tools for academic projects</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                      <div className="text-2xl mb-2">📚</div>
                      <h3 className="font-semibold text-purple-900 dark:text-purple-300">Practicum Support</h3>
                      <p className="text-sm text-purple-700 dark:text-purple-400">Comprehensive lab session guidelines</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* PC Usage Section */}
              <section id="pc-usage" className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">💻</span>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-dark-text">PC Usage and Borrowing Policy</h2>
                </div>
                <div className="prose prose-secondary dark:prose-invert max-w-none">
                  <p className="text-secondary-700 dark:text-dark-muted mb-6">
                    All students have access to the public computers. Please follow these steps to use and borrow a PC for project work.
                  </p>
                 
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-secondary-800 dark:text-dark-text flex items-center gap-2">
                      <span className="text-blue-500">🖥️</span>
                      Standard Usage
                    </h3>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-secondary-700 dark:text-dark-muted">
                        For general use during lab hours, simply find an available PC and log in using your student credentials.
                        <strong className="text-blue-700 dark:text-blue-300"> Ensure you log out after your session is complete</strong> to protect your data.
                      </p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-secondary-800 dark:text-dark-text flex items-center gap-2">
                      <span className="text-green-500">📝</span>
                      Project Borrowing
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <span className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                        <p className="text-secondary-700 dark:text-dark-muted">Fill out the <strong>PC Borrowing Form</strong> available at the lab assistant's desk.</p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <span className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                        <p className="text-secondary-700 dark:text-dark-muted">Specify the duration and purpose of the loan.</p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <span className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                        <p className="text-secondary-700 dark:text-dark-muted">The lab assistant will assign you a specific PC unit.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-amber-600 dark:text-amber-400">⚠️</span>
                      <h4 className="font-semibold text-amber-800 dark:text-amber-300">Important Reminders</h4>
                    </div>
                    <ul className="text-amber-700 dark:text-amber-400 space-y-1">
                      <li>You are responsible for the PC's condition during the loan period</li>
                      <li>Report any issues immediately</li>
                      <li>Save your work on cloud storage or external drives</li>
                      <li>Local data may be wiped periodically for maintenance</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Equipment Section */}
              <section id="equipment" className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🔧</span>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-dark-text">Lab Equipment Borrowing Procedures</h2>
                </div>
                <div className="prose prose-secondary dark:prose-invert max-w-none">
                  <p className="text-secondary-700 dark:text-dark-muted mb-6">
                    Specialized lab equipment, such as <strong>oscilloscopes</strong> and <strong>microcontrollers</strong>, is available for borrowing for academic purposes.
                  </p>
                 
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-secondary-800 dark:text-dark-text flex items-center gap-2">
                      <span className="text-purple-500">📋</span>
                      Borrowing Procedure
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                        <p className="text-secondary-700 dark:text-dark-muted">Check the equipment availability list online or at the lab counter.</p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                        <p className="text-secondary-700 dark:text-dark-muted">Present your student ID to the lab technician.</p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                        <p className="text-secondary-700 dark:text-dark-muted">Complete the equipment sign-out sheet, noting the condition of the equipment.</p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                        <p className="text-secondary-700 dark:text-dark-muted">Equipment must be returned <strong>one hour before the lab closes</strong> on the due date.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-red-600 dark:text-red-400">⚠️</span>
                      <h4 className="font-semibold text-red-800 dark:text-red-300">Your Responsibilities</h4>
                    </div>
                    <p className="text-red-700 dark:text-red-400">
                      You are <strong>financially responsible</strong> for any damage or loss of borrowed equipment.
                      Handle all items with care and use them only for their intended purpose.
                    </p>
                  </div>
                </div>
              </section>

              {/* Practicum Section */}
              <section id="practicum" className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">📚</span>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-dark-text">Practicum Regulations</h2>
                </div>
                <div className="prose prose-secondary dark:prose-invert max-w-none">
                  <p className="text-secondary-700 dark:text-dark-muted mb-6">
                    Adherence to these regulations is <strong>mandatory</strong> for all students participating in lab practicums.
                  </p>
                 
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-blue-600 dark:text-blue-400">📅</span>
                        <h4 className="font-semibold text-blue-900 dark:text-blue-300">Attendance</h4>
                      </div>
                      <p className="text-blue-700 dark:text-blue-400 text-sm">
                        A minimum of <strong>80% attendance</strong> is required to be eligible to take the final exam.
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-green-600 dark:text-green-400">👔</span>
                        <h4 className="font-semibold text-green-900 dark:text-green-300">Attire</h4>
                      </div>
                      <p className="text-green-700 dark:text-green-400 text-sm">
                        <strong>Closed-toe shoes</strong> and appropriate lab attire must be worn at all times.
                      </p>
                    </div>

                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-red-600 dark:text-red-400">🛡️</span>
                        <h4 className="font-semibold text-red-900 dark:text-red-300">Safety</h4>
                      </div>
                      <p className="text-red-700 dark:text-red-400 text-sm">
                        <strong>No food or drinks</strong> are allowed in the lab. Follow all safety instructions provided by the instructor or lab assistant.
                      </p>
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-purple-600 dark:text-purple-400">📝</span>
                        <h4 className="font-semibold text-purple-900 dark:text-purple-300">Submissions</h4>
                      </div>
                      <p className="text-purple-700 dark:text-purple-400 text-sm">
                        All reports and assignments must be submitted by the specified deadline. <strong>Late submissions will be penalized.</strong>
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-amber-600 dark:text-amber-400">🎓</span>
                      <h4 className="font-semibold text-amber-800 dark:text-amber-300">Academic Honesty</h4>
                    </div>
                    <p className="text-amber-700 dark:text-amber-400">
                      <strong>Plagiarism</strong> and any form of <strong>cheating</strong> are strictly prohibited and will result in disciplinary action.
                    </p>
                  </div>

                  <div className="mt-6 bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-center text-secondary-700 dark:text-dark-muted font-medium">
                      ⚠️ Failure to comply with these regulations may result in a failing grade or exclusion from lab activities.
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">📞</span>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-dark-text">Contact Information</h2>
                </div>
                <div className="prose prose-secondary dark:prose-invert max-w-none">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-secondary-900 dark:text-dark-text mb-2">Lab Assistant</h4>
                      <p className="text-secondary-700 dark:text-dark-muted text-sm">
                        For PC borrowing forms and general assistance
                      </p>
                      <p className="text-secondary-700 dark:text-dark-muted text-sm">
                        @giovan
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-secondary-900 dark:text-dark-text mb-2">Lab Technician</h4>
                      <p className="text-secondary-700 dark:text-dark-muted text-sm">
                        For equipment borrowing and technical support
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;