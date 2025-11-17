"use client";

import { useLanguage } from "@/contexts/language-context";
import { useEffect, useRef } from "react";
import { animate, utils } from "animejs";

const stagger = utils.stagger;

export default function AboutPage() {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero title animation - anime.js v4 style
    animate('.hero-line', {
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 1200,
      delay: stagger(80),
      easing: 'outExpo'
    });

    // Scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            
            // Stagger children
            const children = target.querySelectorAll('.stagger-item');
            if (children.length) {
              animate(children, {
                translateY: [60, 0],
                opacity: [0, 1],
                duration: 1000,
                delay: stagger(60),
                easing: 'outExpo'
              });
            }

            // Lines animation
            const lines = target.querySelectorAll('.animated-line');
            if (lines.length) {
              animate(lines, {
                width: ['0%', '100%'],
                duration: 800,
                delay: stagger(100),
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

    // Continuous subtle animations
    animate('.pulse-dot', {
      scale: [1, 1.2, 1],
      opacity: [0.4, 1, 0.4],
      duration: 2000,
      loop: true,
      easing: 'inOutQuad'
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={scrollRef} className="relative min-h-screen bg-[#fafafa] text-[#0a0a0a] dark:bg-[#0a0a0a] dark:text-[#fafafa]">
      {/* Minimal grid background */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.015] dark:opacity-[0.03]" 
        style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-24">
        
        {/* Hero Section */}
        <div ref={heroRef} className="mb-40 min-h-[60vh] pb-20">
          <div className="space-y-2 overflow-hidden">
            <h1 className="hero-line text-[clamp(2.5rem,10vw,8rem)] font-black leading-[0.85] tracking-tighter">
              NGUYỄN THƯỢNG
            </h1>
            <h1 className="hero-line text-[clamp(2.5rem,10vw,8rem)] font-black leading-[0.85] tracking-tighter">
              QUYỀN
            </h1>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="pulse-dot h-2 w-2 rounded-full bg-current" />
            <p className="hero-line font-mono text-sm uppercase tracking-[0.2em] opacity-40">
              {isVi ? 'Lập trình viên Full-stack' : 'Fullstack Developer'}
            </p>
          </div>

          <div className="mt-16 grid gap-px bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4 dark:bg-neutral-800">
            {[
              { label: 'Email', value: 'quyennguyen083004@gmail.com', href: 'mailto:quyennguyen083004@gmail.com' },
              { label: 'Phone', value: '(+84) 335 610 213', href: 'tel:+84335610213' },
              { label: 'Location', value: isVi ? 'Hà Nội, Việt Nam' : 'Hanoi, Vietnam' },
              { label: 'Status', value: isVi ? 'Sẵn sàng làm việc' : 'Available' },
            ].map((item, i) => (
              <div key={i} className="hero-line bg-[#fafafa] p-6 dark:bg-[#0a0a0a]">
                {item.href ? (
                  <a href={item.href} className="group block">
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-widest opacity-30">{item.label}</div>
                    <div className="break-all font-mono text-xs opacity-60 transition-opacity group-hover:opacity-100">{item.value}</div>
                  </a>
                ) : (
                  <>
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-widest opacity-30">{item.label}</div>
                    <div className="font-mono text-xs opacity-60">{item.value}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Role */}
        <section className="animate-section mb-40">
          <div className="mb-12">
            <div className="animated-line mb-4 h-px bg-current opacity-20" />
            <h2 className="stagger-item font-mono text-xs uppercase tracking-[0.3em] opacity-30">
              {isVi ? 'Hiện tại' : 'Current'}
            </h2>
          </div>
          <div className="space-y-8">
            <div className="stagger-item">
              <p className="mb-2 font-mono text-sm opacity-40">{isVi ? '03/2025 - 09/2025' : 'Mar 2025 - Sep 2025'}</p>
              <h3 className="mb-2 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                {isVi ? 'Lập trình viên Full-stack' : 'Junior Fullstack Developer'}
              </h3>
              <p className="font-mono text-xl opacity-40">TDA Global</p>
            </div>
            <div className="stagger-item">
              <p className="mb-2 font-mono text-sm opacity-40">{isVi ? '04/2025 - Hiện tại' : 'Apr 2025 - Present'}</p>
              <h3 className="mb-2 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                {isVi ? 'Người sáng lập' : 'Founder'}
              </h3>
              <p className="font-mono text-xl opacity-40">POSitive</p>
              <p className="mt-4 max-w-2xl font-light leading-relaxed opacity-60">
                {isVi 
                  ? 'Hệ thống POS thế hệ mới cho SME Việt Nam, được hỗ trợ bởi Đại học FPT'
                  : 'Next-gen POS solution empowering Vietnamese SMEs, backed by FPT University'
                }
              </p>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="animate-section mb-40">
          <div className="mb-12">
            <div className="animated-line mb-4 h-px bg-current opacity-20" />
            <h2 className="stagger-item font-mono text-xs uppercase tracking-[0.3em] opacity-30">
              {isVi ? 'Kinh nghiệm' : 'Experience'}
            </h2>
          </div>
          <div className="space-y-16">
            {[
              {
                period: isVi ? '08/2024 - 01/2025' : 'Aug 2024 - Jan 2025',
                role: isVi ? 'Lập trình viên Full-stack' : 'Fresher Fullstack Developer',
                company: 'MegaAds',
                desc: isVi 
                  ? 'Duy trì nền tảng thương mại điện tử với 1.6M+ lượt truy cập. Cập nhật printerval.com, chiaki.vn, vuahanghieu.com'
                  : 'Maintained high-traffic e-commerce platforms (1.6M+ visits). Updated printerval.com, chiaki.vn, vuahanghieu.com',
                tech: ['Laravel', 'ExpressJS', 'AngularJS']
              },
              {
                period: isVi ? '02/2024 - 08/2024' : 'Feb 2024 - Aug 2024',
                role: isVi ? 'Lập trình viên Unity' : 'Unity Developer',
                company: 'KIS Vietnam',
                desc: isVi 
                  ? 'Phát triển game Seafood Merge - 1K+ tải xuống trên Google Play'
                  : 'Developed Seafood Merge game - 1K+ downloads on Google Play',
                tech: ['Unity', 'C#', 'Game Development']
              },
              {
                period: isVi ? '05/2023 - 01/2024' : 'May 2023 - Jan 2024',
                role: isVi ? 'Đồng sáng lập & Lập trình viên Unity' : 'Co-founder & Unity Developer',
                company: "Chillin' Studio",
                desc: isVi 
                  ? 'Phát triển game 2D casual Wonder World'
                  : 'Developed Wonder World 2D casual game',
                tech: ['Unity', 'C#', '2D Game Dev']
              }
            ].map((exp, i) => (
              <div key={i} className="stagger-item grid gap-8 lg:grid-cols-[200px_1fr]">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider opacity-40">{exp.period}</p>
                </div>
                <div>
                  <h3 className="mb-1 text-2xl font-bold">{exp.role}</h3>
                  <p className="mb-4 font-mono opacity-60">{exp.company}</p>
                  <p className="mb-4 leading-relaxed opacity-60">{exp.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t, j) => (
                      <span key={j} className="border border-current px-3 py-1 font-mono text-xs opacity-30">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Project */}
        <section className="animate-section mb-40">
          <div className="mb-12">
            <div className="animated-line mb-4 h-px bg-current opacity-20" />
            <h2 className="stagger-item font-mono text-xs uppercase tracking-[0.3em] opacity-30">
              {isVi ? 'Dự án nổi bật' : 'Featured Project'}
            </h2>
          </div>
          <div className="stagger-item">
            <div className="mb-4 inline-block border border-current px-4 py-2">
              <span className="font-mono text-xs uppercase tracking-wider opacity-40">
                NAVER Vietnam AI Hackathon 2025
              </span>
            </div>
            <h3 className="mb-6 text-5xl font-black tracking-tight lg:text-7xl">
              {isVi ? 'Danh sách công việc thông minh với AI' : 'AI-Powered Smart To-Do List'}
            </h3>
            <p className="mb-8 max-w-3xl text-xl font-light leading-relaxed opacity-60">
              {isVi
                ? 'Giải pháp quản lý công việc thông minh nhận biết sự trì hoãn, được thiết kế riêng cho sinh viên Việt Nam. Tích hợp OpenAI GPT-4, phân tích mẫu hành vi, Pomodoro timer và dashboard năng suất toàn diện.'
                : 'Procrastination-aware task management solution designed for Vietnamese students. Features OpenAI GPT-4 integration, behavioral pattern recognition, Pomodoro timer, and comprehensive productivity dashboard.'
              }
            </p>
            <div className="mb-8 flex flex-wrap gap-2">
              {['React 19', 'TypeScript', 'Laravel 12', 'OpenAI', 'Vite', 'TailwindCSS', 'MySQL', 'Redis', 'Pusher'].map((t, i) => (
                <span key={i} className="border border-current px-4 py-2 font-mono text-sm opacity-40">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://web-track-naver-vietnam-ai-hackatho-ecru.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-current px-8 py-4 font-mono text-sm uppercase tracking-widest transition-all hover:bg-current hover:text-[#fafafa] dark:hover:text-[#0a0a0a]"
              >
                {isVi ? 'Xem Demo' : 'Live Demo'}
              </a>
              <a 
                href="https://youtu.be/lcY3--8nCIc"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-current px-8 py-4 font-mono text-sm uppercase tracking-widest transition-all hover:bg-current hover:text-[#fafafa] dark:hover:text-[#0a0a0a]"
              >
                {isVi ? 'Video Demo' : 'Demo Video'}
              </a>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="animate-section mb-40">
          <div className="mb-12">
            <div className="animated-line mb-4 h-px bg-current opacity-20" />
            <h2 className="stagger-item font-mono text-xs uppercase tracking-[0.3em] opacity-30">
              {isVi ? 'Công nghệ' : 'Tech Stack'}
            </h2>
          </div>
          <div className="grid gap-16 lg:grid-cols-3">
            {[
              {
                title: isVi ? 'Ngôn ngữ' : 'Languages',
                items: ['PHP', 'JavaScript', 'TypeScript', 'Java', 'C#', 'Python']
              },
              {
                title: 'Frontend',
                items: ['React', 'Vue.js', 'Angular', 'Vite', 'TailwindCSS', 'HTML5/CSS3']
              },
              {
                title: 'Backend',
                items: ['Laravel', 'Spring Boot', '.NET', 'Express.js', 'Node.js']
              },
              {
                title: 'AI & ML',
                items: ['OpenAI', 'Gemini', 'RAG Systems', 'ComfyUI']
              },
              {
                title: isVi ? 'Cơ sở dữ liệu' : 'Databases',
                items: ['MySQL', 'MongoDB', 'PostgreSQL', 'Redis', 'SQL Server']
              },
              {
                title: isVi ? 'Khác' : 'Others',
                items: ['Unity', 'AWS', 'Docker', 'Git', 'Pusher', 'Cocos']
              }
            ].map((cat, i) => (
              <div key={i} className="stagger-item">
                <h3 className="mb-6 font-mono text-sm uppercase tracking-wider opacity-40">{cat.title}</h3>
                <div className="space-y-3">
                  {cat.items.map((item, j) => (
                    <div key={j} className="border-l-2 border-current pl-4 font-mono text-sm opacity-60">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="animate-section mb-40">
          <div className="mb-12">
            <div className="animated-line mb-4 h-px bg-current opacity-20" />
            <h2 className="stagger-item font-mono text-xs uppercase tracking-[0.3em] opacity-30">
              {isVi ? 'Thành tích' : 'Achievements'}
            </h2>
          </div>
          <div className="space-y-8">
            {[
              { year: '2025', award: isVi ? 'Giải Ba - Algorithm Arena 6.0' : 'Runner-up - Algorithm Arena 6.0' },
              { year: '2025', award: isVi ? 'Thí sinh - NAVER Vietnam AI Hackathon' : 'Participant - NAVER Vietnam AI Hackathon' },
              { year: '2024', award: isVi ? 'Giải Khuyến khích - FPT Research Festival' : 'Consolation Prize - FPT Research Festival' },
              { year: '2023', award: isVi ? 'Giải Khuyến khích - Coding Inspiration' : 'Consolation Prize - Coding Inspiration' }
            ].map((ach, i) => (
              <div key={i} className="stagger-item grid gap-8 border-l-2 border-current pl-8 lg:grid-cols-[100px_1fr]">
                <div className="font-mono text-sm opacity-40">{ach.year}</div>
                <div className="text-xl font-light">{ach.award}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="animate-section mb-40">
          <div className="mb-12">
            <div className="animated-line mb-4 h-px bg-current opacity-20" />
            <h2 className="stagger-item font-mono text-xs uppercase tracking-[0.3em] opacity-30">
              {isVi ? 'Học vấn' : 'Education'}
            </h2>
          </div>
          <div className="stagger-item">
            <p className="mb-4 font-mono text-sm opacity-40">2022 - 2026</p>
            <h3 className="mb-2 text-3xl font-bold">
              {isVi ? 'Cử nhân Kỹ thuật Phần mềm' : 'Bachelor of Software Engineering'}
            </h3>
            <p className="font-mono text-xl opacity-60">{isVi ? 'Đại học FPT' : 'FPT University'}</p>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="animate-section mb-20">
          <div className="mb-12">
            <div className="animated-line mb-4 h-px bg-current opacity-20" />
          </div>
          <div className="stagger-item">
            <h2 className="mb-12 text-5xl font-black tracking-tight lg:text-7xl">
              {isVi ? "Hãy kết nối" : "Let's Connect"}
            </h2>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://github.com/makecolour"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-current px-12 py-5 font-mono text-sm uppercase tracking-widest transition-all hover:bg-current hover:text-[#fafafa] dark:hover:text-[#0a0a0a]"
              >
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/gaslighter/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-current px-12 py-5 font-mono text-sm uppercase tracking-widest transition-all hover:bg-current hover:text-[#fafafa] dark:hover:text-[#0a0a0a]"
              >
                LinkedIn
              </a>
              <a 
                href="mailto:quyennguyen083004@gmail.com"
                className="bg-current px-12 py-5 font-mono text-sm uppercase tracking-widest text-[#fafafa] transition-all hover:opacity-80 dark:text-[#0a0a0a]"
              >
                {isVi ? 'Liên hệ' : 'Contact'}
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
