const STEPS = [
  { num: "1", title: "Enter child name",  desc: "Add your child's name to personalize every story.",     img: "/dadima/step-name.png",     arrow: true  },
  { num: "2", title: "Select language",   desc: "Choose from 10+ Indian languages.",                     img: "/dadima/step-language.png", arrow: true  },
  { num: "3", title: "Select theme",      desc: "Pick a theme your child loves the most.",               img: "/dadima/step-theme.png",    arrow: true  },
  { num: "4", title: "Listen together",   desc: "Sit back and enjoy a magical story together.",          img: "/dadima/step-listen.png",   arrow: false },
];

export default function HowItWorks() {
  return (
    <section className="dm-how">
      <div className="dm-section-inner">
        <h2 className="dm-h2-large">How it works</h2>
        <div className="dm-steps-grid">
          {STEPS.map((step, i) => (
            <div key={step.num} className="dm-step">
              <div className="dm-step-badge">{step.num}</div>
              {i < STEPS.length - 1 && <div className="dm-step-arrow" aria-hidden="true">⟶</div>}
              <img src={step.img} alt={step.title} className="dm-step-img" />
              <div className="dm-step-title">{step.title}</div>
              <div className="dm-step-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
