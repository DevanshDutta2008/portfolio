import { forwardRef, useRef, useState } from 'react';
import './Roles.css';

const roles = [
  'Software Developer',
  'Computer Vision Engineer',
  'Founder, Indoor Navigation',
  'Full-Stack Developer',
];

const Roles = forwardRef(function Roles(_props, ref) {
  const cursorRef = useRef(null);
  const sectionRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  const setRefs = (node) => {
    sectionRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  const positionAt = (e) => {
    const el = cursorRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.transform = `translate(${x}px, ${y}px) translate(18px, 24px)`;
  };

  const handleEnter = (e) => {
    positionAt(e);
    setHovering(true);
  };

  return (
    <section className="roles-section" id="roles" ref={setRefs}>
      <p className="roles-eyebrow">04 — ROLES</p>
      <ul
        className="roles-list"
        onMouseEnter={handleEnter}
        onMouseLeave={() => setHovering(false)}
        onMouseMove={positionAt}
      >
        {roles.map((role) => (
          <li key={role} className="roles-item" tabIndex={0}>
            {role}
          </li>
        ))}
      </ul>

      <div
        ref={cursorRef}
        className={`roles-cursor-badge${hovering ? ' is-visible' : ''}`}
        aria-hidden="true"
      >
        <span className="roles-cursor-dot" />
        SCANNING
      </div>
    </section>
  );
});

export default Roles;
