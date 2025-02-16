import "./Hero.css";
import doctorImage from "../assets/doctor.svg";
import patientImage from "../assets/happy.svg";
import eyeIcon from "../assets/eye.svg";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
        Seu sorriso em <span className="highlight">boas mãos!</span> <br/> Agende sua consulta com um especialista.
        </h1>
        <p>
        🦷 Conectamos você aos melhores profissionais para um atendimento seguro e de qualidade.
        </p>
        <div className="hero-buttons">
          <button className="btn primary">Make Appointment</button>
          <button className="btn secondary">Watch Video</button>
        </div>
      </div>

      <div className="hero-images">
        <div className="image-container">
          <img src={doctorImage} alt="Doctor" className="hero-image doctor" />
        </div>
        <div className="image-container">
          <img src={patientImage} alt="Happy Patient" className="hero-image patient" />
        </div>
        <img src={eyeIcon} alt="Eye Icon" className="eye-icon" />
      </div>
    </section>
  );
};

export default Hero;