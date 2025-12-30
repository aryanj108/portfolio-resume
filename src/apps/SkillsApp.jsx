import "./SkillsApp.css";
export default function SkillsApp() {
  return (
    <div style={{
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden'
    }}>
      <div className="skills-app">
        {/* Programming Languages */}
        <h2>Programming Languages</h2>
        <div className="skills-grid">
          <div className="skill">
            <img src="icons/typescript.png" alt="TypeScript" />
            <span>TypeScript / JavaScript</span>
          </div>
          <div className="skill">
            <img src="icons/python.svg" alt="Python" />
            <span>Python</span>
          </div>
          <div className="skill">
            <img src="icons/Java.svg" alt="Java" />
            <span>Java</span>
          </div>
          <div className="skill">
            <img src="icons/C.svg" alt="C " />
            <span>C / C++</span>
          </div>
          <div className="skill">
            <img src="icons/C++.svg" alt="C++" />
            <span>C / C++</span>
          </div>
          <div className="skill">
            <img src="icons/HTML5.svg" alt="HTML / CSS" />
            <span>HTML / CSS</span>
          </div>
          <div className="skill">
            <img src="icons/C Sharp.svg" alt="C#" />
            <span>C#</span>
          </div>
          <div className="skill">
            <img src="icons/Swift.svg" alt="Swift" />
            <span>Swift</span>
          </div>
          <div className="skill">
            <img src="icons/R.svg" alt="R" />
            <span>R</span>
          </div>
        </div>


        {/* Frameworks */}
        <h2>Frameworks</h2>
        <div className="skills-grid">
          <div className="skill">
            <img src="icons/React.svg" alt="React" />
            <span>React</span>
          </div>
          <div className="skill">
            <img src="icons/Streamlit.svg" alt="Streamlit" />
            <span>Streamlit</span>
          </div>
          <div className="skill">
            <img src="icons/Swift.svg" alt="SwiftUI" />
            <span>SwiftUI</span>
          </div>
        </div>


        {/* DevOps */}
        <h2>DevOps</h2>
        <div className="skills-grid">
          <div className="skill">
            <img src="icons/Gitlab.svg" alt="GitLab" />
            <span>GitLab</span>
          </div>
          <div className="skill">
            <img src="icons/Docker.svg" alt="Docker" />
            <span>Docker</span>
          </div>
        </div>


        {/* Tools */}
        <h2>Tools</h2>
        <div className="skills-grid">
          <div className="skill">
            <img src="icons/VS Code.svg" alt="Visual Studio Code" />
            <span>Visual Studio Code</span>
          </div>
          <div className="skill">
            <img src="icons/Git.svg" alt="Git" />
            <span>Git</span>
          </div>
          <div className="skill">
            <img src="icons/Github.svg" alt="GitHub" />
            <span>GitHub</span>
          </div>
          <div className="skill">
            <img src="icons/Jupyter.svg" alt="Jupyter Notebook" />
            <span>Jupyter Notebook</span>
          </div>
          <div className="skill">
            <img src="icons/icons8-google-colab.svg" alt="Google Colab" />
            <span>Google Colab</span>
          </div>
        </div>


        {/* Certs */}
        <h2>Certifications</h2>
        <div className="skills-grid">
          <div className="skill">
            <img src="icons/AWS.svg" alt="AWS Cloud Practitioner Essentialse" />
            <span>AWS Cloud Practitioner Essentials</span>
          </div>
        </div>
      </div>
    </div>
  );
}