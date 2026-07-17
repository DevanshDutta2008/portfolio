import './IntroLoader.css';

// Stylized "DD" monogram (Devansh Dutta), stroke-drawn on load.
const MONOGRAM_SVG = `
  <svg viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
    <path pathLength="1" d="M20,15 L20,105 L45,105 Q85,105 85,60 Q85,15 45,15 Z" />
    <path pathLength="1" d="M130,15 L130,105 L155,105 Q195,105 195,60 Q195,15 155,15 Z" />
  </svg>
`;

export default function IntroLoader({ onComplete }) {
  return (
    <div
      className="intro-loader"
      aria-hidden="true"
      onAnimationEnd={(e) => {
        if (e.animationName === 'intro-lift') onComplete?.();
      }}
      dangerouslySetInnerHTML={{ __html: `<div class="intro-sig">${MONOGRAM_SVG}</div>` }}
    />
  );
}
