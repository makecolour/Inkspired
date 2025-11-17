"use client";

import { useLanguage } from "@/contexts/language-context";
import { useEffect, useRef } from "react";
import { animate, utils } from "animejs";
import { Trophy, Bot, Zap, Rocket, Video, Mail, Briefcase, Github, Award, Star, Users, Target, ChevronRight } from "lucide-react";
import "flag-icons/css/flag-icons.min.css";

const stagger = utils.stagger;

export default function AboutPage() {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 3D Rotating Cube Grid Background
    const cubeGrid = document.querySelectorAll('.cube-3d');
    if (cubeGrid.length) {
      animate('.cube-3d', {
        rotateX: [0, 360],
        rotateY: [0, 360],
        rotateZ: [0, 180],
        duration: 30000,
        delay: stagger(200, { from: 'center', grid: [6, 4] }),
        loop: true,
        easing: 'linear'
      });
    }

    // Subtle Floating Cards - no 3D transforms to prevent flip
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, i) => {
      animate(card, {
        translateY: [0, -8, 0],
        duration: 5000 + (i * 200),
        loop: true,
        easing: 'inOutSine'
      });
    });

    // 3D Spiral Text with rotation
    const spiralText = document.querySelectorAll('.spiral-char');
    if (spiralText.length) {
      spiralText.forEach((char, i) => {
        animate(char, {
          opacity: [0, 1],
          translateY: [50, 0],
          translateZ: [100, 0],
          rotateY: [90, 0],
          duration: 1200,
          delay: i * 40,
          easing: 'outElastic'
        });
      });
    }

    // Hero animations with parallax
    animate('.hero-line', {
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 1200,
      delay: stagger(80),
      easing: 'outExpo'
    });

    // 3D Section Headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target, {
              translateX: [-200, 0],
              rotateY: [90, 0],
              opacity: [0, 1],
              duration: 1000,
              easing: 'outExpo'
            });
            headerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionHeaders.forEach((el) => headerObserver.observe(el));

    // Special animations for Current Role cards - dramatic slide in from sides
    const currentRoleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const isLeft = entry.target.classList.contains('slide-left');
            
            animate(entry.target, {
              translateX: [isLeft ? -400 : 400, 0],
              scale: [0.8, 1],
              opacity: [0, 1],
              duration: 1200,
              easing: 'outExpo'
            });
            
            currentRoleObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.current-role-card').forEach((el) => {
      currentRoleObserver.observe(el);
    });

    // Special animation for Featured Project - dramatic zoom in with glow
    const featuredObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            
            animate(entry.target, {
              scale: [0.85, 1],
              opacity: [0, 1],
              duration: 1400,
              easing: 'outElastic'
            });
            
            // Animate the title separately
            const title = entry.target.querySelector('.featured-title');
            if (title) {
              const chars = title.querySelectorAll('.title-char');
              chars.forEach((char, i) => {
                animate(char, {
                  translateY: [80, 0],
                  opacity: [0, 1],
                  scale: [0.5, 1],
                  duration: 1000,
                  delay: i * 40,
                  easing: 'outExpo'
                });
              });
            }
            
            featuredObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.featured-project').forEach((el) => {
      featuredObserver.observe(el);
    });

    // Scroll-triggered 3D animations - fixed to prevent reverse animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const target = entry.target;
            target.classList.add('animated'); // Mark as animated
            
            const children = target.querySelectorAll('.stagger-item');
            if (children.length) {
              children.forEach((child, i) => {
                animate(child, {
                  translateY: [60, 0],
                  opacity: [0, 1],
                  duration: 1000,
                  delay: i * 60,
                  easing: 'outExpo'
                });
              });
            }

            const lines = target.querySelectorAll('.animated-line');
            if (lines.length) {
              animate(lines, {
                width: ['0%', '100%'],
                duration: 800,
                easing: 'outExpo'
              });
            }

            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-section').forEach((el) => {
      observer.observe(el);
    });

    // Continuous pulse with 3D scale
    animate('.pulse-dot', {
      scale: [1, 1.3, 1],
      translateZ: [0, 20, 0],
      opacity: [0.5, 1, 0.5],
      duration: 2500,
      loop: true,
      easing: 'inOutQuad'
    });

    // 3D Orbital Particles
    const particles = document.querySelectorAll('.particle-3d');
    if (particles.length) {
      particles.forEach((particle, i) => {
        const angle = (i / particles.length) * 360;
        const radius = 180;
        animate(particle, {
          translateX: [
            Math.cos(angle * Math.PI / 180) * radius,
            Math.cos((angle + 360) * Math.PI / 180) * radius
          ],
          translateY: [
            Math.sin(angle * Math.PI / 180) * radius,
            Math.sin((angle + 360) * Math.PI / 180) * radius
          ],
          translateZ: [0, 150, 0, -150, 0],
          rotateZ: [0, 360],
          scale: [0.5, 1.5, 0.5],
          opacity: [0.2, 0.8, 0.2],
          duration: 12000,
          loop: true,
          easing: 'linear'
        });
      });
    }

    // 3D Floating Tech Badges
    const techBadges = document.querySelectorAll('.tech-badge');
    techBadges.forEach((badge, i) => {
      animate(badge, {
        translateY: [0, -8, 0],
        translateZ: [0, 15, 0],
        rotateX: [0, 5, 0],
        duration: 3000 + (i * 100),
        loop: true,
        easing: 'inOutSine'
      });
    });

    // 3D Parallax on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      // Parallax layers with different depths
      animate('.parallax-layer-1', {
        translateX: x * 30,
        translateY: y * 30,
        rotateY: x * 15,
        rotateX: -y * 15,
        duration: 1000,
        easing: 'outQuad'
      });
      
      animate('.parallax-layer-2', {
        translateX: x * 60,
        translateY: y * 60,
        rotateY: x * 25,
        rotateX: -y * 25,
        duration: 1200,
        easing: 'outQuad'
      });
      
      animate('.parallax-layer-3', {
        translateX: x * 90,
        translateY: y * 90,
        rotateY: x * 35,
        rotateX: -y * 35,
        duration: 1400,
        easing: 'outQuad'
      });

      // Hero text parallax
      animate('.hero-parallax', {
        translateX: x * -20,
        translateY: y * -20,
        duration: 800,
        easing: 'outQuad'
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Scroll-based 3D rotation for sections
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rotatingElements = document.querySelectorAll('.scroll-rotate');
      
      rotatingElements.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const progress = (scrollY - elementTop + window.innerHeight) / (window.innerHeight + rect.height);
        
        if (progress > 0 && progress < 1) {
          animate(el, {
            rotateY: [progress * 360],
            translateZ: [Math.sin(progress * Math.PI) * 50],
            duration: 0,
            easing: 'linear'
          });
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      observer.disconnect();
      headerObserver.disconnect();
      currentRoleObserver.disconnect();
      featuredObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={scrollRef} className="relative min-h-screen bg-[#fafafa] text-[#0a0a0a] dark:bg-[#0a0a0a] dark:text-[#fafafa] overflow-hidden" style={{ perspective: '1500px' }}>
      {/* Enhanced grid background */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.02] dark:opacity-[0.04]" 
        style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: 'translateZ(-100px)'
        }}
      />

      {/* 3D Cube Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.08]" style={{ perspective: '2000px' }}>
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-16 p-16">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="cube-3d relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 border border-current opacity-40" style={{ transform: 'translateZ(20px)' }} />
              <div className="absolute inset-0 border border-current opacity-40" style={{ transform: 'translateZ(-20px)' }} />
              <div className="absolute inset-0 border border-current opacity-40" style={{ transform: 'rotateY(90deg) translateZ(20px)' }} />
              <div className="absolute inset-0 border border-current opacity-40" style={{ transform: 'rotateY(90deg) translateZ(-20px)' }} />
              <div className="absolute inset-0 border border-current opacity-40" style={{ transform: 'rotateX(90deg) translateZ(20px)' }} />
              <div className="absolute inset-0 border border-current opacity-40" style={{ transform: 'rotateX(90deg) translateZ(-20px)' }} />
            </div>
          ))}
        </div>
      </div>

      {/* 3D Orbital Particles */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none" style={{ perspective: '2000px' }}>
        <div className="relative w-[500px] h-[500px]" style={{ transformStyle: 'preserve-3d' }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="particle-3d absolute w-3 h-3 bg-gradient-to-br from-blue-500 to-purple-500 dark:from-cyan-400 dark:to-blue-600 rounded-full blur-sm" 
              style={{ 
                left: '50%', 
                top: '50%',
                transformStyle: 'preserve-3d'
              }} 
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-24">
        
        {/* Hero Section with 3D Parallax */}
        <div ref={heroRef} className="mb-40 min-h-[80vh] pb-20 relative" style={{ transformStyle: 'preserve-3d' }}>
          {/* 3D Background Decorative Elements */}
          <div className="absolute inset-0 opacity-10 dark:opacity-15 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
            <div className="parallax-layer-1 absolute top-20 right-20 w-40 h-40 border-4 border-current rotate-45" 
              style={{ transformStyle: 'preserve-3d' }} />
            <div className="parallax-layer-2 absolute bottom-40 left-10 w-60 h-60 border-2 border-current rounded-full" 
              style={{ transformStyle: 'preserve-3d' }} />
            <div className="parallax-layer-3 absolute top-1/2 right-1/3 w-32 h-32 border-4 border-current" 
              style={{ transformStyle: 'preserve-3d' }} />
            <div className="parallax-layer-1 absolute bottom-20 right-1/4 w-24 h-24 border-2 border-current rotate-12" 
              style={{ transformStyle: 'preserve-3d' }} />
          </div>

          <div className="space-y-3 overflow-hidden relative z-10" style={{ transformStyle: 'preserve-3d' }}>
            <h1 className="hero-line hero-parallax text-[clamp(3rem,12vw,10rem)] font-black leading-[0.8] tracking-tighter" 
              style={{ transformStyle: 'preserve-3d' }}>
              {'NGUYỄN THƯỢNG'.split('').map((char, i) => (
                <span key={i} className="spiral-char inline-block" style={{ transformStyle: 'preserve-3d' }}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>
            <h1 className="hero-line hero-parallax text-[clamp(3rem,12vw,10rem)] font-black leading-[0.8] tracking-tighter" 
              style={{ transformStyle: 'preserve-3d' }}>
              {'QUYỀN'.split('').map((char, i) => (
                <span key={i} className="spiral-char inline-block" style={{ transformStyle: 'preserve-3d' }}>
                  {char}
                </span>
              ))}
            </h1>
          </div>
          
          <div className="mt-16 flex items-center gap-6 relative z-10">
            <div className="pulse-dot h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-400 dark:to-blue-500" 
              style={{ transformStyle: 'preserve-3d' }} />
            <p className="hero-line font-mono text-base uppercase tracking-[0.25em] opacity-50 hero-parallax">
              {isVi ? 'Lập trình viên Full-stack · Người sáng lập POSitive · Đam mê AI/ML' : 'Fullstack Developer · Founder of POSitive · AI/ML Enthusiast'}
            </p>
          </div>

          <div className="mt-20 grid gap-1 bg-neutral-300/50 sm:grid-cols-2 lg:grid-cols-4 dark:bg-neutral-700/50 relative z-10" 
            style={{ transformStyle: 'preserve-3d' }}>
            {[
              { label: 'Email', value: 'quyennguyen083004@gmail.com', href: 'mailto:quyennguyen083004@gmail.com' },
              { label: 'Phone', value: '(+84) 335 610 213', href: 'tel:+84335610213' },
              { label: 'Location', value: isVi ? 'Hà Nội, Việt Nam' : 'Hanoi, Vietnam' },
              { label: 'Status', value: isVi ? 'Sẵn sàng làm việc' : 'Available for Opportunities' },
            ].map((item, i) => (
              <div key={i} className="hero-line floating-card bg-[#fafafa] p-8 dark:bg-[#0a0a0a] backdrop-blur-sm" 
                style={{ transformStyle: 'preserve-3d' }}>
                {item.href ? (
                  <a href={item.href} className="group block">
                    <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.3em] opacity-30">{item.label}</div>
                    <div className="break-all font-mono text-sm opacity-60 transition-all group-hover:opacity-100 group-hover:translateZ-2">{item.value}</div>
                  </a>
                ) : (
                  <>
                    <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.3em] opacity-30">{item.label}</div>
                    <div className="font-mono text-sm opacity-60">{item.value}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Role - Asymmetric Layout */}
        <section className="animate-section mb-48" style={{ transformStyle: 'preserve-3d' }}>
          <div className="mb-16">
            <div className="animated-line mb-6 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />
            <h2 className="section-header stagger-item font-mono text-sm uppercase tracking-[0.4em] opacity-40" 
              style={{ transformStyle: 'preserve-3d' }}>
              {isVi ? 'Hiện tại' : 'Current'}
            </h2>
          </div>
          <div className="space-y-20">
            {/* Offset Layout */}
            <div className="current-role-card slide-left stagger-item floating-card border-l-4 border-blue-500 dark:border-cyan-400 pl-12" 
              style={{ transformStyle: 'preserve-3d' }}>
              <p className="mb-3 font-mono text-sm opacity-40">{isVi ? '03/2025 - 09/2025' : 'Mar 2025 - Sep 2025'}</p>
              <h3 className="mb-3 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-blue-500">
                {isVi ? 'Lập trình viên Full-stack' : 'Junior Fullstack Developer'}
              </h3>
              <p className="font-mono text-2xl opacity-50 mb-8">TDA Global</p>
              <ul className="space-y-4 opacity-70 max-w-4xl">
                {[
                  isVi ? 'Xây dựng hệ thống render hình ảnh sản phẩm POD hoàn chỉnh' : 'Built end-to-end POD product image rendering system',
                  isVi ? 'Phát triển TDA Cloud (không gian làm việc dựa trên NAS)' : 'Developed TDA Cloud (NAS-based company workspace)',
                  isVi ? 'Tạo hệ thống AI sử dụng RAG & ComfyUI' : 'Created AI systems using RAG & ComfyUI',
                  isVi ? 'Ra mắt NFCite (trình xây dựng trang web NFC/QR)' : 'Launched NFCite (NFC/QR web page builder)',
                  isVi ? 'Phát hành ứng dụng di động: Biểu đồ giá vàng' : 'Published mobile app: Gold Price Chart'
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start tech-badge" style={{ transformStyle: 'preserve-3d' }}>
                    <ChevronRight className="text-blue-500 dark:text-cyan-400 flex-shrink-0" size={20} />
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 mt-8">
                {['Laravel', 'Vue.js', 'ExpressJS', 'AI/RAG', 'ComfyUI'].map((tech, i) => (
                  <span key={i} className="tech-badge px-4 py-2 border-2 border-current/20 text-sm font-mono opacity-50 hover:opacity-100 transition-opacity backdrop-blur-sm" 
                    style={{ transformStyle: 'preserve-3d' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="current-role-card stagger-item floating-card border-l-4 border-purple-500 dark:border-blue-500 pl-12 ml-auto max-w-5xl" 
              style={{ transformStyle: 'preserve-3d' }}>
              <p className="mb-3 font-mono text-sm opacity-40">{isVi ? '04/2025 - Hiện tại' : 'Apr 2025 - Present'}</p>
              <h3 className="mb-3 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-blue-400 dark:to-purple-500">
                {isVi ? 'Người sáng lập & Lập trình viên chính' : 'Founder & Lead Developer'}
              </h3>
              <p className="font-mono text-2xl opacity-50 mb-8">POSitive</p>
              <p className="max-w-4xl text-lg font-light leading-relaxed opacity-70 mb-8">
                {isVi 
                  ? 'Giải pháp POS thế hệ mới trao quyền cho SME Việt Nam, được FPT University hỗ trợ. Xây dựng frontend Vue.js + backend Laravel với hệ thống thanh toán đa kênh (QR, tiền mặt), hóa đơn điện tử, quét mã vạch bằng camera và quản lý kho thời gian thực.'
                  : 'Next-gen POS solution empowering Vietnamese SMEs, backed by FPT University. Architected Vue.js frontend + Laravel backend with multi-payment system (QR, cash), e-invoicing, camera-based barcode scanning, and real-time inventory management.'
                }
              </p>
              <div className="flex flex-wrap gap-3">
                {['Vue.js', 'Laravel', 'PHP', 'Real-time Systems', 'Payment Integration'].map((tech, i) => (
                  <span key={i} className="tech-badge px-4 py-2 border-2 border-current/20 text-sm font-mono opacity-50 hover:opacity-100 transition-opacity backdrop-blur-sm" 
                    style={{ transformStyle: 'preserve-3d' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Timeline - 3D Cards */}
        <section className="animate-section mb-48" style={{ transformStyle: 'preserve-3d' }}>
          <div className="mb-16">
            <div className="animated-line mb-6 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />
            <h2 className="section-header stagger-item font-mono text-sm uppercase tracking-[0.4em] opacity-40" 
              style={{ transformStyle: 'preserve-3d' }}>
              {isVi ? 'Kinh nghiệm' : 'Experience'}
            </h2>
          </div>
          <div className="space-y-12">
            {[
              {
                period: isVi ? '08/2024 - 01/2025' : 'Aug 2024 - Jan 2025',
                role: isVi ? 'Lập trình viên Full-stack' : 'Fresher Fullstack Developer',
                company: 'MegaAds',
                desc: isVi 
                  ? 'Duy trì nền tảng thương mại điện tử có lượng truy cập cao (1.6M+ lượt truy cập). Cập nhật printerval.com, chiaki.vn, vuahanghieu.com và xây dựng công cụ phát triển nội bộ.'
                  : 'Maintained high-traffic e-commerce platforms (1.6M+ visits). Updated printerval.com, chiaki.vn, vuahanghieu.com and built internal development tools.',
                tech: ['Laravel', 'ExpressJS', 'AngularJS'],
                color: 'from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400'
              },
              {
                period: isVi ? '02/2024 - 08/2024' : 'Feb 2024 - Aug 2024',
                role: isVi ? 'Lập trình viên Unity' : 'Unity Developer',
                company: 'KIS Vietnam',
                desc: isVi 
                  ? 'Phát triển game Seafood Merge - 1K+ lượt tải xuống trên Google Play.'
                  : 'Developed Seafood Merge game - 1K+ downloads on Google Play.',
                tech: ['Unity', 'C#', 'Game Development', 'Google Play'],
                color: 'from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400'
              },
              {
                period: isVi ? '05/2023 - 01/2024' : 'May 2023 - Jan 2024',
                role: isVi ? 'Đồng sáng lập & Lập trình viên Unity' : 'Co-founder & Unity Developer',
                company: "Chillin' Studio",
                desc: isVi 
                  ? 'Phát triển game 2D casual Wonder World.'
                  : 'Developed Wonder World 2D casual game.',
                tech: ['Unity', 'C#', '2D Game Dev'],
                color: 'from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400'
              }
            ].map((exp, idx) => (
              <div key={idx} className="stagger-item floating-card group" style={{ transformStyle: 'preserve-3d' }}>
                <div className={`border-2 border-current/10 p-8 backdrop-blur-sm hover:border-current/30 transition-all duration-500 bg-gradient-to-br ${exp.color} bg-opacity-5 dark:bg-opacity-10`}>
                  <div className="grid lg:grid-cols-[200px_1fr] gap-8">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider opacity-40">{exp.period}</p>
                    </div>
                    <div>
                      <h3 className="mb-2 text-3xl font-black tracking-tight sm:text-4xl">{exp.role}</h3>
                      <p className="mb-6 font-mono text-lg opacity-50">{exp.company}</p>
                      <p className="mb-6 max-w-3xl text-base leading-relaxed opacity-70">{exp.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech, i) => (
                          <span key={i} className="tech-badge px-3 py-1.5 border border-current/20 text-xs font-mono opacity-40 group-hover:opacity-70 transition-opacity" 
                            style={{ transformStyle: 'preserve-3d' }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Project - Hero Treatment */}
        <section className="animate-section mb-48" style={{ transformStyle: 'preserve-3d' }}>
          <div className="mb-16">
            <div className="animated-line mb-6 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />
            <h2 className="section-header stagger-item font-mono text-sm uppercase tracking-[0.4em] opacity-40" 
              style={{ transformStyle: 'preserve-3d' }}>
              {isVi ? 'Dự án nổi bật' : 'Featured Project'}
            </h2>
          </div>
          <div className="featured-project floating-card" style={{ transformStyle: 'preserve-3d' }}>
            <div className="border-4 border-current/20 p-12 backdrop-blur-sm bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-cyan-500/10 dark:to-blue-500/10 shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-cyan-400/20 transition-shadow duration-700">
              <div className="mb-12">
                <div className="mb-6 inline-block border-2 border-current/30 px-6 py-3 font-mono text-xs opacity-60 backdrop-blur-sm">
                  <Trophy className="inline-block text-yellow-400 dark:text-yellow-300 mr-2 align-middle" size={16} />
                  {isVi ? 'NAVER Vietnam AI Hackathon' : 'NAVER Vietnam AI Hackathon'}
                </div>
                <h3 className="featured-title text-6xl font-black tracking-tight sm:text-7xl lg:text-8xl mb-8">
                  {(isVi ? 'Smart To-Do List' : 'Smart To-Do List').split('').map((char, i) => (
                    <span key={i} className="title-char inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-cyan-300 dark:via-blue-400 dark:to-purple-400" style={{ transformStyle: 'preserve-3d' }}>
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </h3>
                <div className="flex gap-6 mb-10 flex-wrap">
                  <a href="https://web-track-naver-vietnam-ai-hackatho-ecru.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="tech-badge inline-block border-2 border-current px-8 py-4 font-mono text-sm uppercase tracking-wider transition-all hover:bg-current hover:text-[#fafafa] dark:hover:text-[#0a0a0a] backdrop-blur-sm" 
                    style={{ transformStyle: 'preserve-3d' }}>
                    <Rocket className="inline-block mr-2 align-middle text-blue-500 dark:text-cyan-400" size={16} />
                    {isVi ? 'Xem Demo' : 'Live Demo'}
                  </a>
                  <a href="https://youtu.be/lcY3--8nCIc" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="tech-badge inline-block border-2 border-current px-8 py-4 font-mono text-sm uppercase tracking-wider transition-all hover:bg-current hover:text-[#fafafa] dark:hover:text-[#0a0a0a] backdrop-blur-sm" 
                    style={{ transformStyle: 'preserve-3d' }}>
                    <Video className="inline-block mr-2 align-middle text-red-500 dark:text-red-400" size={16} />
                    {isVi ? 'Video' : 'Watch Video'}
                  </a>
                </div>
              </div>
              <div className="max-w-6xl space-y-8 mb-10">
                <p className="text-2xl font-light leading-relaxed opacity-70">
                  {isVi
                    ? 'Giải pháp quản lý công việc thông minh, nhận biết sự trì hoãn được thiết kế dành riêng cho sinh viên đại học Việt Nam. Vượt xa danh sách công việc truyền thống bằng cách tích hợp:'
                    : 'An intelligent, procrastination-aware task management solution designed specifically for Vietnamese university students. Goes beyond traditional to-do lists by incorporating:'
                  }
                </p>
                <div className="grid sm:grid-cols-2 gap-10">
                  <div className="tech-badge border-l-4 border-blue-500 dark:border-cyan-400 pl-6" style={{ transformStyle: 'preserve-3d' }}>
                    <h4 className="font-mono text-base uppercase tracking-wider mb-4 opacity-60">
                      <Bot className="inline-block text-blue-400 dark:text-cyan-300 mr-2 align-middle" size={18} />
                      {isVi ? 'Phân tích AI' : 'AI-Powered Analytics'}
                    </h4>
                    <ul className="space-y-3 opacity-70 text-base">
                      <li className="flex gap-3"><span className="text-blue-500 dark:text-cyan-400">•</span><span>{isVi ? 'Tích hợp OpenAI GPT-4 để tối ưu công việc' : 'OpenAI GPT-4 integration for task optimization'}</span></li>
                      <li className="flex gap-3"><span className="text-blue-500 dark:text-cyan-400">•</span><span>{isVi ? 'Nhận dạng mô hình trì hoãn (điểm 0.00-9.99)' : 'Procrastination pattern recognition (0.00-9.99 scoring)'}</span></li>
                      <li className="flex gap-3"><span className="text-blue-500 dark:text-cyan-400">•</span><span>{isVi ? 'Can thiệp hành vi và lên lịch thông minh' : 'Behavioral intervention and smart scheduling'}</span></li>
                    </ul>
                  </div>
                  <div className="tech-badge border-l-4 border-purple-500 dark:border-blue-500 pl-6" style={{ transformStyle: 'preserve-3d' }}>
                    <h4 className="font-mono text-base uppercase tracking-wider mb-4 opacity-60">
                      <Zap className="inline-block text-purple-400 dark:text-blue-300 mr-2 align-middle" size={18} />
                      {isVi ? 'Tính năng nâng cao' : 'Advanced Features'}
                    </h4>
                    <ul className="space-y-3 opacity-70 text-base">
                      <li className="flex gap-3"><span className="text-purple-500 dark:text-blue-400">•</span><span>{isVi ? 'Bộ đếm thời gian Pomodoro với theo dõi phiên' : 'Pomodoro timer with session tracking'}</span></li>
                      <li className="flex gap-3"><span className="text-purple-500 dark:text-blue-400">•</span><span>{isVi ? 'Thông báo thời gian thực qua Pusher' : 'Real-time notifications via Pusher'}</span></li>
                      <li className="flex gap-3"><span className="text-purple-500 dark:text-blue-400">•</span><span>{isVi ? 'Bảng điều khiển năng suất toàn diện' : 'Comprehensive productivity dashboard'}</span></li>
                      <li className="flex gap-3"><span className="text-purple-500 dark:text-blue-400">•</span><span>{isVi ? 'Trợ lý chat AI cho lời khuyên năng suất' : 'AI chat assistant for productivity advice'}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {['React 19', 'TypeScript', 'Laravel 12', 'Vite', 'TailwindCSS', 'OpenAI GPT-4', 'MySQL', 'Redis', 'Pusher'].map((tech, i) => (
                  <span key={i} className="tech-badge px-4 py-2 border-2 border-current/20 text-sm font-mono opacity-40 hover:opacity-100 transition-opacity backdrop-blur-sm" 
                    style={{ transformStyle: 'preserve-3d' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Other Projects - Grid Layout */}
        <section className="animate-section mb-48" style={{ transformStyle: 'preserve-3d' }}>
          <div className="mb-16">
            <div className="animated-line mb-6 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />
            <h2 className="section-header stagger-item font-mono text-sm uppercase tracking-[0.4em] opacity-40" 
              style={{ transformStyle: 'preserve-3d' }}>
              {isVi ? 'Dự án khác' : 'Other Projects'}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              {
                name: 'EchoWave',
                desc: isVi ? 'Nền tảng nhắn tin thời gian thực cấp doanh nghiệp' : 'Enterprise-Grade Real-Time Messaging Platform',
                tech: ['Node.js', 'Socket.IO', 'Redis', 'MySQL', 'AngularJS'],
                color: 'from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-400',
                link: 'https://echowave.positive.io.vn/chat',
                github: 'https://github.com/makecolour/EchoWave'
              },
              {
                name: 'POSitive',
                desc: isVi ? 'Giải pháp POS thế hệ mới cho SME Việt Nam' : 'Next-gen POS solution empowering Vietnamese SMEs',
                tech: ['Vue.js', 'Laravel', 'PHP', 'Real-time'],
                color: 'from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400',
                github: 'https://github.com/makecolour/POSitive'
              },
              {
                name: 'Inkspired',
                desc: isVi ? 'Nền tảng blog tối giản cho lập trình viên' : 'Minimal blogging platform for developers',
                tech: ['TypeScript', 'Next.js', 'MDX', 'TailwindCSS'],
                color: 'from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400',
                github: 'https://github.com/makecolour/Inkspired'
              },
              {
                name: 'Clowndinary',
                desc: isVi ? 'Trình tải lên đa CDN cho TDA Global' : 'Multi-CDN media uploader for TDA Global',
                tech: ['JavaScript', 'EJS', 'Cloudinary', 'Bunny Storage'],
                color: 'from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400',
                github: 'https://github.com/makecolour/Clowndinary'
              },
              {
                name: 'TrustScore',
                desc: isVi ? 'Hệ thống quản lý tin cậy dựa trên AI' : 'AI-powered trust management system',
                tech: ['Java', 'Spring Boot', 'Knowledge Graph', 'LLM'],
                color: 'from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400',
                github: 'https://github.com/makecolour/TrustScore'
              },
              {
                name: 'Voyagenius',
                desc: isVi ? 'Giải pháp quản lý du lịch thông minh' : 'Intelligent travel management solution',
                tech: ['PHP', 'TypeScript', 'Laravel', 'Vue.js'],
                color: 'from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400',
                github: 'https://github.com/makecolour/Voyagenius'
              },
              {
                name: 'Calendros',
                desc: isVi ? 'Ứng dụng lịch & lên lịch toàn diện' : 'Comprehensive calendar & scheduling app',
                tech: ['PHP', 'Laravel', 'Blade', 'MySQL'],
                color: 'from-pink-500 to-rose-500 dark:from-pink-400 dark:to-rose-400',
                github: 'https://github.com/makecolour/Calendros',
                github2: 'https://github.com/makecolour/Calendros_app'
              },
              {
                name: 'Seafood Merge',
                desc: isVi ? 'Game casual 2D - 1K+ lượt tải' : '2D Casual Game - 1K+ downloads',
                tech: ['Unity', 'C#', 'Google Play'],
                color: 'from-teal-500 to-green-500 dark:from-teal-400 dark:to-green-400',
                link: 'https://play.google.com/store/apps/details?id=com.KISVietnam.SeafoodMerge'
              },
            ].map((project, idx) => (
              <div key={idx} className="stagger-item floating-card group" style={{ transformStyle: 'preserve-3d' }}>
                <div className={`border-2 border-current/10 p-8 backdrop-blur-sm hover:border-current/30 transition-all duration-500 bg-gradient-to-br ${project.color} bg-opacity-5 dark:bg-opacity-10 h-full flex flex-col`}>
                  <h3 className="mb-4 text-3xl font-black tracking-tight">{project.name}</h3>
                  <p className="mb-6 text-base leading-relaxed opacity-70 flex-1">{project.desc}</p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.link && (
                      <a href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="tech-badge inline-flex items-center gap-2 border-2 border-current px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all hover:bg-current hover:text-[#fafafa] dark:hover:text-[#0a0a0a]">
                        <Rocket size={14} className="text-blue-500 dark:text-cyan-400" />
                        {isVi ? 'Demo' : 'Live Demo'}
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="tech-badge inline-flex items-center gap-2 border-2 border-current px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all hover:bg-current hover:text-[#fafafa] dark:hover:text-[#0a0a0a]">
                        <Github size={14} className="text-purple-600 dark:text-purple-400" />
                        {isVi ? 'Mã nguồn' : 'Code'}
                      </a>
                    )}
                    {project.github2 && (
                      <a href={project.github2} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="tech-badge inline-flex items-center gap-2 border-2 border-current px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all hover:bg-current hover:text-[#fafafa] dark:hover:text-[#0a0a0a]">
                        <Github size={14} className="text-pink-600 dark:text-pink-400" />
                        {isVi ? 'App' : 'App'}
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="tech-badge px-3 py-1.5 border border-current/20 text-xs font-mono opacity-40 group-hover:opacity-70 transition-opacity" 
                        style={{ transformStyle: 'preserve-3d' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack - Floating Layout */}
        <section className="animate-section mb-48" style={{ transformStyle: 'preserve-3d' }}>
          <div className="mb-16">
            <div className="animated-line mb-6 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />
            <h2 className="section-header stagger-item font-mono text-sm uppercase tracking-[0.4em] opacity-40" 
              style={{ transformStyle: 'preserve-3d' }}>
              {isVi ? 'Công nghệ' : 'Tech Stack'}
            </h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: isVi ? 'Ngôn ngữ' : 'Languages', items: ['PHP', 'JavaScript', 'TypeScript', 'Java', 'C#', 'Python'], color: 'blue' },
              { name: 'Frontend', items: ['React', 'Vue.js', 'Angular', 'Vite', 'TailwindCSS', 'HTML5', 'CSS3'], color: 'purple' },
              { name: 'Backend', items: ['Laravel', 'Spring Boot', '.NET', 'Express.js', 'Node.js'], color: 'green' },
              { name: 'AI/ML', items: ['OpenAI', 'Gemini', 'RAG Systems', 'ComfyUI'], color: 'pink' },
              { name: isVi ? 'Cơ sở dữ liệu' : 'Databases', items: ['MySQL', 'MongoDB', 'PostgreSQL', 'Redis', 'SQL Server'], color: 'orange' },
              { name: isVi ? 'Khác' : 'Others', items: ['Unity', 'Cocos', 'AWS', 'Git', 'Docker', 'Pusher'], color: 'cyan' },
            ].map((cat, idx) => (
              <div key={idx} className="stagger-item floating-card group" style={{ transformStyle: 'preserve-3d' }}>
                <div className="border-2 border-current/10 p-8 backdrop-blur-sm hover:border-current/30 transition-all duration-500 h-full">
                  <h3 className="mb-6 font-mono text-base uppercase tracking-wider opacity-40 group-hover:opacity-70 transition-opacity">{cat.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item, i) => (
                      <span key={i} className="tech-badge px-3 py-2 border border-current/20 text-sm font-mono opacity-60 hover:opacity-100 transition-opacity" 
                        style={{ transformStyle: 'preserve-3d' }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements - Cards */}
        <section className="animate-section mb-48" style={{ transformStyle: 'preserve-3d' }}>
          <div className="mb-16">
            <div className="animated-line mb-6 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />
            <h2 className="section-header stagger-item font-mono text-sm uppercase tracking-[0.4em] opacity-40" 
              style={{ transformStyle: 'preserve-3d' }}>
              {isVi ? 'Thành tựu' : 'Achievements'}
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {[
              {
                icon: 'trophy',
                title: isVi ? 'Á quân Algorithm Arena 6.0' : 'Runner-up Algorithm Arena 6.0',
                org: isVi ? 'CLB Lập trình FPT' : 'FPT Programming Club',
                year: '2025',
                desc: isVi ? 'Top 2 đội trong cuộc thi thuật toán' : 'Top 2 teams in algorithmic competition',
                color: 'from-yellow-500 to-orange-500 dark:from-yellow-400 dark:to-orange-400'
              },
              {
                icon: 'ai',
                title: isVi ? 'Người tham gia NAVER AI Hackathon' : 'NAVER AI Hackathon Participant',
                org: 'NAVER Vietnam',
                year: '2025',
                desc: isVi ? 'Xây dựng Smart To-Do List với AI' : 'Built Smart To-Do List with AI integration',
                color: 'from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400'
              },
              {
                icon: 'award',
                title: isVi ? 'Giải khuyến khích FPT Research Festival' : 'FPT Research Festival Consolation Prize',
                org: isVi ? 'Đại học FPT' : 'FPT University',
                year: '2024',
                desc: isVi ? 'Hệ thống POS cho SMEs' : 'POS system for SMEs',
                color: 'from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400'
              },
              {
                icon: 'star',
                title: isVi ? 'Cố vấn kỹ thuật Coding Inspiration' : 'Coding Inspiration Technical Advisor',
                org: isVi ? 'CLB Lập trình FPT' : 'FPT Programming Club',
                year: '2023',
                desc: isVi ? 'Cố vấn kỹ thuật cho sinh viên năm nhất' : 'Technical advisor for freshmen',
                color: 'from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400'
              }
            ].map((ach, idx) => {
              const IconComponent = ach.icon === 'trophy' ? Trophy : 
                                    ach.icon === 'ai' ? Bot : 
                                    ach.icon === 'award' ? Award : Star;
              const iconColor = ach.icon === 'trophy' ? 'text-yellow-400 dark:text-yellow-300' : 
                                ach.icon === 'ai' ? 'text-blue-400 dark:text-cyan-300' : 
                                ach.icon === 'award' ? 'text-green-400 dark:text-emerald-300' : 
                                'text-purple-400 dark:text-pink-300';
              return (
              <div key={idx} className="stagger-item floating-card group" style={{ transformStyle: 'preserve-3d' }}>
                <div className={`border-2 border-current/10 p-8 backdrop-blur-sm hover:border-current/30 transition-all duration-500 bg-gradient-to-br ${ach.color} bg-opacity-5 dark:bg-opacity-10`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-3 flex-1">
                      <IconComponent className={`${iconColor} mt-1 flex-shrink-0`} size={22} />
                      <h3 className="text-2xl font-black tracking-tight">{ach.title}</h3>
                    </div>
                    <span className="font-mono text-sm opacity-30 ml-4">{ach.year}</span>
                  </div>
                  <p className="mb-2 font-mono text-sm opacity-40">{ach.org}</p>
                  <p className="font-light leading-relaxed opacity-70">{ach.desc}</p>
                </div>
              </div>
            )})}
          </div>
        </section>

        {/* Certifications */}
        <section className="animate-section mb-48" style={{ transformStyle: 'preserve-3d' }}>
          <div className="mb-16">
            <div className="animated-line mb-6 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />
            <h2 className="section-header stagger-item font-mono text-sm uppercase tracking-[0.4em] opacity-40" 
              style={{ transformStyle: 'preserve-3d' }}>
              {isVi ? 'Chứng chỉ' : 'Certifications'}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Project Management', org: 'UC Irvine' },
              { name: 'Ethical Technologist', org: 'CertNexus' },
              { name: 'SDLC', org: 'University of Minnesota' },
              { name: 'Web Design', org: 'University of Michigan' },
              { name: 'Computer Communications', org: 'UC System' },
            ].map((cert, idx) => (
              <div key={idx} className="stagger-item floating-card group" style={{ transformStyle: 'preserve-3d' }}>
                <div className="border-2 border-current/10 p-6 backdrop-blur-sm hover:border-current/30 transition-all duration-500">
                  <h3 className="font-bold mb-2 text-lg">{cert.name}</h3>
                  <p className="font-mono text-xs opacity-40 group-hover:opacity-70 transition-opacity">{cert.org}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community */}
        <section className="animate-section mb-48" style={{ transformStyle: 'preserve-3d' }}>
          <div className="mb-16">
            <div className="animated-line mb-6 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />
            <h2 className="section-header stagger-item font-mono text-sm uppercase tracking-[0.4em] opacity-40" 
              style={{ transformStyle: 'preserve-3d' }}>
              {isVi ? 'Đóng góp cộng đồng' : 'Community Impact'}
            </h2>
          </div>
          <div className="space-y-8">
            {[
              {
                icon: 'tech',
                role: isVi ? 'Cố vấn kỹ thuật' : 'Technical Mentor',
                org: 'Vietnam Robotics Challenge',
                impact: isVi ? 'Hướng dẫn sinh viên về Arduino & C++' : 'Mentored students in Arduino & C++',
                color: 'from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400'
              },
              {
                icon: 'target',
                role: isVi ? 'Phó trưởng ban tổ chức' : 'Vice Head Organizer',
                org: 'Algorithm Arena 4.0',
                impact: isVi ? 'Tổ chức cuộc thi lập trình cạnh tranh' : 'Organized competitive programming contest',
                color: 'from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400'
              },
              {
                icon: 'people',
                role: isVi ? 'Tình nguyện viên' : 'Volunteer',
                org: 'VEX Robotics Championship',
                impact: isVi ? 'Đảm bảo diễn ra cuộc thi suôn sẻ' : 'Ensured smooth competition flow',
                color: 'from-green-500 to-teal-500 dark:from-green-400 dark:to-teal-400'
              }
            ].map((item, idx) => {
              const IconComponent = item.icon === 'tech' ? Bot : 
                                    item.icon === 'target' ? Target : Users;
              const iconColor = item.icon === 'tech' ? 'text-blue-400 dark:text-cyan-300' : 
                                item.icon === 'target' ? 'text-purple-400 dark:text-pink-300' : 
                                'text-green-400 dark:text-teal-300';
              return (
              <div key={idx} className="stagger-item floating-card group" style={{ transformStyle: 'preserve-3d' }}>
                <div className={`border-2 border-current/10 p-8 backdrop-blur-sm hover:border-current/30 transition-all duration-500 bg-gradient-to-r ${item.color} bg-opacity-5 dark:bg-opacity-10`}>
                  <div className="flex items-start gap-3">
                    <IconComponent className={`${iconColor} mt-1 flex-shrink-0`} size={22} />
                    <h3 className="text-2xl font-black">{item.role}</h3>
                  </div>
                  <p className="font-mono text-sm opacity-40 mb-3 ml-8">{item.org}</p>
                  <p className="opacity-70 ml-8">{item.impact}</p>
                </div>
              </div>
            )})}
          </div>
        </section>

        {/* Education */}
        <section className="animate-section mb-48" style={{ transformStyle: 'preserve-3d' }}>
          <div className="mb-16">
            <div className="animated-line mb-6 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />
            <h2 className="section-header stagger-item font-mono text-sm uppercase tracking-[0.4em] opacity-40" 
              style={{ transformStyle: 'preserve-3d' }}>
              {isVi ? 'Học vấn' : 'Education'}
            </h2>
          </div>
          <div className="stagger-item floating-card" style={{ transformStyle: 'preserve-3d' }}>
            <div className="border-4 border-current/20 p-12 backdrop-blur-sm bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10">
              <p className="mb-4 font-mono text-sm opacity-40">2022 - 2026</p>
              <h3 className="mb-4 text-5xl font-black tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                {isVi ? 'Cử nhân Kỹ thuật Phần mềm' : 'Bachelor of Software Engineering'}
              </h3>
              <p className="font-mono text-2xl opacity-50 mb-8">{isVi ? 'Đại học FPT' : 'FPT University'}</p>
              <div className="grid sm:grid-cols-2 gap-8 mt-8">
                <div className="tech-badge border-l-4 border-indigo-500 dark:border-purple-400 pl-6" style={{ transformStyle: 'preserve-3d' }}>
                  <h4 className="font-mono text-sm uppercase tracking-wider mb-4 opacity-50">
                    {isVi ? 'Ngôn ngữ' : 'Languages'}
                  </h4>
                  <ul className="space-y-3 opacity-70 text-base">
                    <li className="flex items-center gap-3">
                      <span className="fi fi-vn text-3xl" />
                      <span>{isVi ? 'Tiếng Việt - Bản ngữ' : 'Vietnamese - Native'}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="fi fi-gb text-3xl" />
                      <span>{isVi ? 'Tiếng Anh - B2 (IELTS 6.5)' : 'English - B2 (IELTS 6.5)'}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="fi fi-jp text-3xl" />
                      <span>{isVi ? 'Tiếng Nhật - Sơ cấp' : 'Japanese - Elementary'}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA - Full Width */}
        <section className="animate-section pb-32" style={{ transformStyle: 'preserve-3d' }}>
          <div className="mb-16">
            <div className="animated-line mb-6 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />
          </div>
          <div className="stagger-item floating-card" style={{ transformStyle: 'preserve-3d' }}>
            <div className="border-4 border-current/20 p-20 text-center backdrop-blur-sm bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10">
              <h2 className="mb-6 text-6xl font-black tracking-tight sm:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500">
                {isVi ? "Hãy cùng tạo nên điều gì đó tuyệt vời" : "Let's build something amazing"}
              </h2>
              <p className="mb-12 text-xl opacity-60 max-w-3xl mx-auto">
                {isVi 
                  ? "Luôn sẵn sàng cho các dự án mới, cơ hội hợp tác và kết nối ý nghĩa"
                  : "Always open to new projects, collaborations, and meaningful connections"
                }
              </p>
              <div className="flex gap-6 justify-center flex-wrap">
                <a href="mailto:quyennguyen083004@gmail.com" 
                  className="tech-badge inline-block border-4 border-current px-12 py-5 font-mono text-base uppercase tracking-wider transition-all hover:bg-current hover:text-[#fafafa] dark:hover:text-[#0a0a0a] backdrop-blur-sm" 
                  style={{ transformStyle: 'preserve-3d' }}>
                  <Mail className="inline-block mr-3 align-middle text-red-500 dark:text-red-400" size={20} />
                  {isVi ? 'Gửi email' : 'Send Email'}
                </a>
                <a href="https://www.linkedin.com/in/gaslighter/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tech-badge inline-block border-4 border-current px-12 py-5 font-mono text-base uppercase tracking-wider transition-all hover:bg-current hover:text-[#fafafa] dark:hover:text-[#0a0a0a] backdrop-blur-sm" 
                  style={{ transformStyle: 'preserve-3d' }}>
                  <Briefcase className="inline-block mr-3 align-middle text-blue-500 dark:text-blue-400" size={20} />
                  LinkedIn
                </a>
                <a href="https://github.com/makecolour" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tech-badge inline-block border-4 border-current px-12 py-5 font-mono text-base uppercase tracking-wider transition-all hover:bg-current hover:text-[#fafafa] dark:hover:text-[#0a0a0a] backdrop-blur-sm" 
                  style={{ transformStyle: 'preserve-3d' }}>
                  <Github className="inline-block mr-3 align-middle text-purple-500 dark:text-purple-400" size={20} />
                  GitHub
                </a>
                <a href="https://www.topcv.vn/xem-cv/BAUABwBXDlEFDgAAUQJcV1QDVgcBUFVVUQZTBw9f76" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tech-badge inline-block border-4 border-current px-12 py-5 font-mono text-base uppercase tracking-wider transition-all hover:bg-current hover:text-[#fafafa] dark:hover:text-[#0a0a0a] backdrop-blur-sm" 
                  style={{ transformStyle: 'preserve-3d' }}>
                  <Briefcase className="inline-block mr-3 align-middle text-green-500 dark:text-green-400" size={20} />
                  {isVi ? 'Xem CV' : 'View CV'}
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
