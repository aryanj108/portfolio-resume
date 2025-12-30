import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function ShowcaseApp({ initialSection = 'HOME' }) {
  const [activeSection, setActiveSection] = useState(initialSection);

  useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection]);

  const [formData, setFormData] = useState({
  name: '',
  email: '',
  company: '',
  message: ''
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!formData.name || !formData.email || !formData.message) {
    alert('Please fill in all required fields');
    return;
  }

  try {
    await emailjs.send(
      'service_3j3lpxv',
      'template_lueivws',
      {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message
      },
      'rDI2Fde_CUt-Po5mP'
    );
    alert('Message sent successfully! ✅');
    setFormData({ name: '', email: '', company: '', message: '' });
  } catch (error) {
    alert('Failed to send message. Please try again. ❌');
  }
};

  const sections = {
    HOME: (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '60px',
          fontWeight: 'bold',
          margin: '0 0 10px 0',
          fontFamily: '"Times New Roman", serif'
        }}>
          Aryan Jalota
        </h1>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'normal',
          margin: '0 0 40px 0',
          fontFamily: '"Courier New", monospace'
        }}>
          Software Engineer
        </h2>
        <nav style={{
          display: 'flex',
          gap: '30px',
          fontSize: '18px'
        }}>
          <div
            onClick={() => setActiveSection('ABOUT')}
            style={{
              color: '#0000ee',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ABOUT
          </div>
          <div
            onClick={() => setActiveSection('EXPERIENCE')}
            style={{
              color: '#0000ee',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            EXPERIENCE
          </div>
          <div
            onClick={() => setActiveSection('PROJECTS')}
            style={{
              color: '#0000ee',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            PROJECTS
          </div>
          <div
            onClick={() => setActiveSection('CONTACT')}
            style={{
              color: '#0000ee',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            CONTACT
          </div>
        </nav>
      </div>
    ),
    ABOUT: (
      <div>
        <h2 style={{fontFamily: 'Courier New, monospace', fontSize: '40px', marginTop: 0, fontWeight: 'bold'}}>
          Welcome
        </h2>
        <h2 style={{fontFamily: 'Courier New, monospace', fontSize: '24px', marginTop: -10, fontWeight: 'bold'}}>
          I'm Aryan Jalota
        </h2>
        <p>
          I'm a Computer Science major at the University of Texas at Austin!
          Thank you for taking the time to check out my portfolio. I really hope you enjoy
          exploring it as much as I enjoyed building it. If you have any questions or
          comments, feel free to contact me using 
          {' '}
          <span 
            onClick={() => setActiveSection('CONTACT')}
            style={{
              color: '#0000ee',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            this form
          </span>
          {' '}
          or shoot me an email at
          {' '}
          <a href="mailto:aryanjalota483@gmail.com" style={{
            color: '#0000ee',
            textDecoration: 'underline'
          }}>
            aryanjalota483@gmail.com
          </a>
        </p>
        {/* Resume Download Section */}
        <div style={{
          borderTop: '1px solid #000',
          borderBottom: '1px solid #000',
          padding: '10px 0',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
        }}>
          <img 
            src="icons/resume-icon.gif" 
            alt="resume icon" 
            style={{
              width: '50px',
              height: '50px',
              marginRight: '20px'
            }}
            onError={(e) => {
              e.target.src = 'https://placehold.co/50x50/cccccc/666666?text=📄';
            }}
          />
          <div>
            <strong style={{fontFamily: 'Courier New, monospace'}}> Looking for my resume?</strong>
            <br />
            <a 
              href="icons/resume.pdf" 
              download
              style={{
                color: '#0000ee',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              Click here to download it!
            </a>
          </div>
        </div>

        <h2 style={{fontFamily: 'Courier New, monospace', fontSize: '20px', marginTop: 0}}>
          About Me
        </h2>
        <p>
          From a young age, I have had a curiosity about how things worked. This naturally led me to 
          become absolutely obsessed with Lego and I fell in love with building things. In 2015, my family and I 
          moved across the country from Illinois to Texas, where I attended elementary school, middle school, high school, 
          and now college. In middle school, I joined the Lego Robotics team, which was my first real exposure to programming. 
        </p>

        {/* Photo Section */}
        <div style={{margin: '30px 0', textAlign: 'center'}}>
          <img 
            src="icons/robotics.JPG" 
            alt="Me at my computer" 
            style={{
              maxWidth: '100%', 
              height: 'auto', 
              border: '2px solid #999',
              boxShadow: '3px 3px 5px rgba(0,0,0,0.2)'
            }}
          />
          <p style={{fontSize: '12px', color: '#000000ff', marginTop: '8px'}}>
            <strong>Figure 1:</strong> Winning 3rd place at the State Level "Robo Wars" Competition
          </p>
        </div>

        {/* Video Section */}
        <div style={{margin: '30px 0', textAlign: 'center'}}>
          <video 
            src="icons/robotics.MP4" 
            alt="Me at my computer" 
            style={{
              maxWidth: '100%', 
              height: 'auto', 
              border: '2px solid #999',
              boxShadow: '3px 3px 5px rgba(0,0,0,0.2)'
            }}
            autoPlay
            loop
            muted  
          />
          <p style={{fontSize: '12px', color: '#000000ff', marginTop: '8px'}}>
            <strong>Figure 2:</strong> Our final project from my Robotics II Class
          </p>
        </div>

        <p>
          I started programming more seriously in high school, initially using Java to program small class 
          with object oritented program and creating small games. Throughout high school, I continued to learn more about 
          the world of computer science, expanding my skill set with each year. 
          In 2023, I got accepted into UT Austin to study Computer
          Science. It was my first choice and I was absolutely ecstatic to be going to such an 
          incredible university. At the end of my freshman year, I got an internship working for
          a financial market infrastructure company DTCC, mainly focusing on automation and integrating AI to maximize workflow
          and efficiency. Following my 10 week internship, I continued to grow my technical skills, focusing on passion projects and collaborating 
          with professors at UT to solve problems with AI.
        </p>
        
        {/* Hobbies/Interests Section with Image */}
        <h2 style={{fontFamily: 'Courier New, monospace', fontSize: '20px', marginTop: '30px'}}>
          My Hobbies
        </h2>
        <div style={{display: 'flex', gap: '20px', alignItems: 'flex-start'}}>
          <div style={{flex: 1}}>
            <p>
              Outside of coding, I have a lot of hobbies that I enjoy doing in my free time. The more apparent hobby is volleyball. Which
              I regularly merge with my background in CS to develop some pretty cool software. You can read more about this project in its 
              respective pages under my projects tab. Some other hobbies I enjoy are working out, hiking, cooking, and playing video games
              (obviously). 
            </p>
            <p>
              In college, I was a member of the UT Men's Volleyball Team and played in tournaments against other colleges in the colligiate 
              level across the country. I met a lot of incredible people through volleyball and have become part of an amazing community.
            </p>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <img 
              src="icons/volleyballSolo.JPG" 
              alt="Playing volleyball" 
              style={{
                width: '250px',
                height: 'auto',
                border: '2px solid #999',
                boxShadow: '3px 3px 5px rgba(0,0,0,0.2)'
              }}
            />
            <p style={{fontSize: '12px', color: '#000000ff', marginTop: '8px', textAlign: 'center'}}>
              <strong>Figure 3:</strong> Me, November 2025
            </p>
          </div>
        </div>

        <div style={{margin: '30px 0', textAlign: 'center'}}>
          <img 
            src="icons/volleyballGroup.JPG" 
            alt="Me at my computer" 
            style={{
              maxWidth: '100%', 
              height: 'auto', 
              border: '2px solid #999',
              boxShadow: '3px 3px 5px rgba(0,0,0,0.2)'
            }}
          />
          <p style={{fontSize: '12px', color: '#000000ff', marginTop: '2px'}}>
            <strong>Figure 4:</strong> Grass volleyball in downtown Austin
          </p>
        </div>

        <p>
          Thanks for reading about me! I hope that you enjoy exploring the rest of my
          portfolio website and everything it has to offer. 
          If you have any questions or comments I would love to hear them. You can reach
          me through the {' '}
          <span 
            onClick={() => setActiveSection('CONTACT')}
            style={{
              color: '#0000ee',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
          contact page
          </span>
          {' '}
          or shoot me an email at
          {' '}
          <a href="mailto:aryanjalota483@gmail.com" style={{
            color: '#0000ee',
            textDecoration: 'underline'
          }}>
            aryanjalota483@gmail.com
          </a>
        </p>
        <br />
        <br />
      </div>
    ),
    EXPERIENCE: (
      <div>
        {/* Resume Download Section */}
        <div style={{
          borderTop: '1px solid #000',
          borderBottom: '1px solid #000',
          padding: '10px 0',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
        }}>
          <img 
            src="icons/resume-icon.gif" 
            alt="resume icon" 
            style={{
              width: '50px',
              height: '50px',
              marginRight: '20px'
            }}
            onError={(e) => {
              e.target.src = 'https://placehold.co/50x50/cccccc/666666?text=📄';
            }}
          />
          <div>
            <strong style={{fontFamily: 'Courier New, monospace'}}> Looking for my resume?</strong>
            <br />
            <a 
              href="icons/resume.pdf" 
              download
              style={{
                color: '#0000ee',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              Click here to download it!
            </a>
          </div>
        </div>

        {/* DTCC Internship */}
        <div style={{marginBottom: '40px'}}>
          <h3 style={{fontFamily: 'Courier New, monospace', fontSize: '28px', margin: '20px 0 5px 0'}}>
            Depository Trust & Clearing Corporation
          </h3>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px'}}>
            <h4 style={{fontSize: '18px', margin: '0', fontWeight: 'normal'}}>
              Internal Audit Development IT Intern
            </h4>
            <span style={{fontSize: '14px', fontStyle: 'italic'}}>
              June 2025– Aug 2025
            </span>
          </div>
          <p style={{margin: '10px 0', lineHeight: '1.6'}}>
          Created internal automation tools that transformed financial data extraction and 
          audit documentation processes, saving audit teams 10–15 hours per week and accelerating 
          training delivery.          
          </p>
          <ul style={{marginTop: '10px', lineHeight: '1.8', paddingLeft: '20px'}}>
            <li>Developed a desktop application to automate data extraction from financial 
              PDFs by identifying and analyzing repeating patterns using a Tkinter GUI; 
              enabled users to snip tables or text, apply reusable templates, auto-detect similar
               content across pages, clean structured data, and export results to Excel—reducing manual
               reporting work by 10–15 hours per week</li>
            <li>Built a desktop application to record and export UI interaction tutorials, 
              automating step-by-step screenshot capture with OCR-based text labeling, 
              mouse/keyboard tracking, and an interactive Tkinter GUI; enabled users to annotate,
               reorder, and export steps into a structured, styled PDF—cutting documentation and 
               training preparation time by 50–60% (saving 6–8 hours per tutorial)</li>
          </ul>
        </div>

        {/* University Of Texas At Austin*/}
        <div style={{marginBottom: '40px'}}>
          <h3 style={{fontFamily: 'Courier New, monospace', fontSize: '28px', margin: '20px 0 5px 0'}}>
            University Of Texas At Austin
          </h3>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px'}}>
            <h4 style={{fontSize: '18px', margin: '0', fontWeight: 'normal'}}>
              AI Traffic Monitoring Research Assistant
            </h4>
            <span style={{fontSize: '14px', fontStyle: 'italic'}}>
              Aug 2024– Present
            </span>
          </div>
          <p style={{margin: '10px 0', lineHeight: '1.6'}}>
            Developed an automated computer vision pipeline using YOLOv8 and OpenCV 
            to generate polygon-level vehicle detections and traffic metrics, reducing 
            manual labeling by 90% and supporting grant proposals and conference research.
          </p>
          <ul style={{marginTop: '10px', lineHeight: '1.8', paddingLeft: '20px'}}>
            <li>Developed an automated vehicle-detection pipeline using YOLOv8 segmentation and OpenCV, 
              achieving precise, polygon-level contours for cars, buses, trucks, and motorcycles; 
              streamlined data ingestion, inference, and visualization to export results in JSON/CSV/TXT 
              formats and store annotated imagery for performance review</li>
            <li>Integrated the pipeline into AI-driven transportation research with 
              Pandas dashboards and Matplotlib visualizations; reduced manual labeling 
              by 90 % and enabled the team to generate statistically robust traffic counts 
              and class-specific occupancy metrics to support grant proposals and conference publications</li>
          </ul>
        </div> 

        {/* University Of Texas At Austin*/}
        <div style={{marginBottom: '40px'}}>
          <h3 style={{fontFamily: 'Courier New, monospace', fontSize: '28px', margin: '20px 0 5px 0'}}>
            University Of Texas At Austin
          </h3>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px'}}>
            <h4 style={{fontSize: '18px', margin: '0', fontWeight: 'normal'}}>
              GI Sense Lab Research Software Engineer Assistant
            </h4>
            <span style={{fontSize: '14px', fontStyle: 'italic'}}>
              Aug 2025– Present
            </span>
          </div>
          <p style={{margin: '10px 0', lineHeight: '1.6'}}>
            Built interactive research tools and ML pipelines using React and Python, automating geospatial
             data collection and supporting generative AI and machine learning research workflows on TACC.
          </p>
          <ul style={{marginTop: '10px', lineHeight: '1.8', paddingLeft: '20px'}}>
            <li>Developed and deployed an interactive research webpage using React, JavaScript, and HTML/CSS, 
              showcasing generative AI results with audio playback, image rendering, and a user study interface 
              for data-quality evaluation</li>
            <li>Coded Python scripts for remote sensing data collection, integrating geospatial APIs 
              (latitude/longitude queries), Pandas, and Requests to automate imagery retrieval and preprocessing. 
              Contributed to machine learning workflows by writing Python code with PyTorch, NumPy, and Matplotlib 
              for dataset preparation, model training, evaluation, and visualization on the Texas Advanced Computing 
              Center (TACCs)</li>
          </ul>
        </div> 
      </div>
    ),
    PROJECTS: (
      <div>
        <h2 style={{fontFamily: 'Courier New, monospace', fontSize: '20px', marginTop: 0}}>
          Projects
        </h2>
        <p>My portfolio of projects would be displayed here...
          - This site
          - Volleyball thing
          - AP Webscraper
          - Hook Em Hacks Website
          - Free Parking Austin/UT
          - Volleyball Model Trainer
          - Any other projects that can be added later on
        </p>
      </div>
    ),

CONTACT: (
  <div>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
      <h2 style={{fontFamily: 'Courier New, monospace', fontSize: '40px', margin: 0}}>
        Contact
      </h2>
      
      <div style={{display: 'flex', gap: '15px'}}>
        <a 
          href="https://github.com/aryanj108" 
          target="_blank" 
          rel="noopener noreferrer"
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.7';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          style={{
            display: 'block',
            border: '1px solid #ccc',
            borderRadius: '0px',
            padding: '5px'
          }}
        >
          <img src="icons/Github.svg" alt="GitHub" style={{width: '40px', height: '40px', display: 'block'}} 
            onError={(e) => e.target.src = 'https://placehold.co/40x40/cccccc/000000?text=GH'} />
        </a>
        <a 
          href="https://www.linkedin.com/in/aryanjalota" 
          target="_blank" 
          rel="noopener noreferrer"
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.7';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          style={{
            display: 'block',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '5px'
          }}
        >
          <img src="icons/LinkedIn.svg" alt="LinkedIn" style={{width: '40px', height: '40px', display: 'block'}}
            onError={(e) => e.target.src = 'https://placehold.co/40x40/0077b5/ffffff?text=in'} />
        </a>
        <a 
          href="https://twitter.com/aryanjalota" 
          target="_blank" 
          rel="noopener noreferrer"
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.7';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          style={{
            display: 'block',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '5px'
          }}
        >
          <img src="icons/Twitter.svg" alt="Twitter" style={{width: '40px', height: '40px', display: 'block'}}
            onError={(e) => e.target.src = 'https://placehold.co/40x40/1da1f2/ffffff?text=X'} />
        </a>
      </div>
    </div>

    <p style={{marginBottom: '20px', lineHeight: '1.6'}}>
      If you have any opportunities, feel free to reach 
      out - I would love to chat! You can reach me via my personal email, or fill out the 
      form below!
    </p>

    <form onSubmit={handleSubmit} style={{marginBottom: '30px'}}>
      <label style={{display: 'block', marginBottom: '5px'}}>
        <span style={{color: 'red'}}>*</span> <strong>Your name:</strong>
      </label>
      <input 
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        required
        style={{
          width: '100%',
          padding: '8px',
          border: '2px solid #999',
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
          marginBottom: '15px'
        }}
      />

      <label style={{display: 'block', marginBottom: '5px'}}>
        <span style={{color: 'red'}}>*</span> <strong>Email:</strong>
      </label>
      <input 
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        required
        style={{
          width: '100%',
          padding: '8px',
          border: '2px solid #999',
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
          marginBottom: '15px'
        }}
      />

      <label style={{display: 'block', marginBottom: '5px'}}>
        <strong>Company (optional):</strong>
      </label>
      <input 
        type="text"
        name="company"
        value={formData.company}
        onChange={handleInputChange}
        placeholder="Company"
        style={{
          width: '100%',
          padding: '8px',
          border: '2px solid #999',
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
          marginBottom: '15px'
        }}
      />

      <label style={{display: 'block', marginBottom: '5px'}}>
        <span style={{color: 'red'}}>*</span> <strong>Message:</strong>
      </label>
      <textarea 
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        placeholder="Message"
        rows="6"
        required
        style={{
          width: '100%',
          padding: '8px',
          border: '2px solid #999',
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
          resize: 'vertical',
          marginBottom: '15px'
        }}
      />

      <div style={{display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px'}}>
        <button 
          type="submit"
          style={{
            background: '#999',
            border: '2px outset #999',
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: '14px',
            fontFamily: 'Courier New, monospace',
            color: '#000'
          }}
        >
          Send Message
        </button>
        <span style={{fontSize: '14px'}}>
          All messages get forwarded straight to my personal email
        </span>
      </div>

      <p style={{fontSize: '12px', textAlign: 'right'}}>
        <span style={{color: 'red'}}>*</span> = required
      </p>
    </form>

    <div style={{
      borderTop: '1px solid #000',
      borderBottom: '1px solid #000',
      padding: '15px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    }}>
      <img 
        src="icons/resume-icon.gif" 
        alt="resume" 
        style={{width: '50px', height: '50px'}}
        onError={(e) => e.target.src = 'https://placehold.co/50x50/cccccc/666666?text=📄'}
      />
      <div>
        <strong style={{fontFamily: 'Courier New, monospace', fontSize: '18px'}}>
          Need a copy of my Resume?
        </strong>
        <br />
        <a 
          href="icons/resume.pdf" 
          download
          style={{
            color: '#0000ee',
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
        >
          Click here to download it!
        </a>
      </div>
    </div>

    <br />
    <br />
    <br />
  </div>
)
  };

  return (
    <div style={{
      height: '100%',
      background: '#f4f4f0',
      fontFamily: '"Times New Roman", serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {activeSection === 'HOME' ? (
        // HOME PAGE - No sidebar, full width
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          {sections[activeSection]}
        </div>
      ) : (
        // OTHER PAGES - With sidebar
        <div style={{
          display: 'flex',
          height: '100%'
        }}>
          {/* LEFT NAV */}
          <div style={{
            width: '180px',
            padding: '12px',
            background: '#f4f4f0',
            /*borderRight: '2px solid #999',*/
            flexShrink: 0
          }}>
            <h1 style={{
              margin: 0,
              fontSize: '26px',
              cursor: 'pointer'
            }}
            onClick={() => setActiveSection('HOME')}>
              Aryan Jalota
            </h1>
            <h3 style={{
              marginTop: '4px',
              fontWeight: 'normal'
            }}>
              Showcase '25
            </h3>
            <nav style={{marginTop: '40px'}}>
              {Object.keys(sections).map((section) => (
                <div
                  key={section}
                  onClick={() => setActiveSection(section)}
                  style={{
                    marginBottom: '30px',
                    color: '#0000ee',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontWeight: activeSection === section ? 'bold' : 'normal'
                  }}
                >
                  {section}
                </div>
              ))}
            </nav>
          </div>

          {/* MAIN CONTENT */}
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            fontSize: '15px',
            height: '100%'
          }}>            
            {sections[activeSection]}
          </div>
        </div>
      )}
    </div>
  );
}