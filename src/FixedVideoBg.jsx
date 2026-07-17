import { useEffect, useRef, useState } from 'react';
import scanImg from './assets/devansh-scan.jpg';
import './FixedVideoBg.css';


export default function FixedVideoBg() {
  const [active, setActive] = useState(false);
  const rafRef = useRef(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const section = document.querySelector('.dive-section');
      if (section) {
        const progress =
          parseFloat(
            getComputedStyle(section).getPropertyValue('--dive-progress')
          ) || 0;
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const sectionStillVisible = rect.bottom > vh;
        setActive(progress > 0.06 && sectionStillVisible);
      }
      rafRef.current = 0;
    };
    const onScroll = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className={`fvb-root${active ? ' is-active' : ''}`} aria-hidden="true">
      <img
        ref={videoRef}
        className="fvb-video"
        src={scanImg}
        alt=""
        draggable="false"
      />
      <div className="fvb-grad" />
    </div>
  );
}
