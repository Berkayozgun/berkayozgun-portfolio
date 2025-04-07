import React, { useState, useRef, useEffect } from 'react';
import profileData from '../data/profile.json';

interface Command {
  text: string;
  type: 'input' | 'output';
  isTyping?: boolean;
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  link: string;
  demo?: string;
}

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string[];
}

interface Education {
  school: string;
  degree: string;
  period: string;
  description: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

interface BlogPost {
  title: string;
  date: string;
  link: string;
}

interface Theme {
  background: string;
  text: string;
  prompt: string;
  command: string;
  error: string;
}

const themes: Record<string, Theme> = {
  default: {
    background: 'bg-black',
    text: 'text-green-400',
    prompt: 'text-green-400',
    command: 'text-white',
    error: 'text-red-500',
  },
  dark: {
    background: 'bg-gray-900',
    text: 'text-blue-400',
    prompt: 'text-blue-400',
    command: 'text-white',
    error: 'text-red-400',
  },
  light: {
    background: 'bg-gray-100',
    text: 'text-gray-800',
    prompt: 'text-blue-600',
    command: 'text-black',
    error: 'text-red-600',
  },
  matrix: {
    background: 'bg-black',
    text: 'text-green-500',
    prompt: 'text-green-500',
    command: 'text-white',
    error: 'text-red-500',
  },
};

const Terminal: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [commands, setCommands] = useState<Command[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.default);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  const typeText = (text: string, index: number) => {
    if (index < text.length) {
      setTypingIndex(index + 1);
      typingTimeoutRef.current = setTimeout(() => {
        typeText(text, index + 1);
      }, 10);
    }
  };

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    const lang = profileData[langCode];
    setCommands([
      { text: lang.welcome, type: 'output' },
      { text: lang.helpPrompt, type: 'output' },
    ]);
  };

  const formatAboutText = (lang: any) => {
    const about = lang.about;
    let text = `${about.title}\n\n`;

    text += selectedLanguage === 'tr' ? 'Yetenekler:\n' : 'Skills:\n';
    Object.entries(about.skills).forEach(([category, skills]) => {
      text += `- ${category.charAt(0).toUpperCase() + category.slice(1)}: ${(
        skills as string[]
      ).join(', ')}\n`;
    });

    text += selectedLanguage === 'tr' ? '\nHakkımda:\n' : '\nAbout:\n';
    about.description.forEach((line) => {
      text += `${line}\n`;
    });

    return text;
  };

  const formatExperienceText = (lang: any) => {
    let text =
      selectedLanguage === 'tr'
        ? 'İş Deneyimleri:\n\n'
        : 'Work Experience:\n\n';
    lang.experience.forEach((exp: Experience) => {
      text += `${exp.company}\n`;
      text += `${exp.position}\n`;
      text += `${exp.period}\n\n`;
      exp.description.forEach((desc) => {
        text += `- ${desc}\n`;
      });
      text += '\n';
    });
    return text;
  };

  const formatEducationText = (lang: any) => {
    let text = selectedLanguage === 'tr' ? 'Eğitim:\n\n' : 'Education:\n\n';
    lang.education.forEach((edu: Education) => {
      text += `${edu.school}\n`;
      text += `${edu.degree}\n`;
      text += `${edu.period}\n`;
      text += `${edu.description}\n\n`;
    });
    return text;
  };

  const formatCertificationsText = (lang: any) => {
    let text =
      selectedLanguage === 'tr' ? 'Sertifikalar:\n\n' : 'Certifications:\n\n';
    lang.certifications.forEach((cert: Certification) => {
      text += `${cert.name}\n`;
      text += `${cert.issuer}\n`;
      text += `${cert.date}\n\n`;
    });
    return text;
  };

  const formatBlogText = (lang: any) => {
    let text =
      selectedLanguage === 'tr' ? 'Blog Yazıları:\n\n' : 'Blog Posts:\n\n';
    lang.blog.forEach((post: BlogPost) => {
      text += `${post.title}\n`;
      text += `${post.date}\n`;
      text += `${post.link}\n\n`;
    });
    return text;
  };

  const formatProjectsText = (lang: any) => {
    let text =
      selectedLanguage === 'tr' ? 'Projelerim:\n\n' : 'My Projects:\n\n';
    lang.projects.forEach((project: Project) => {
      text += `${project.name}\n`;
      text += `${project.description}\n`;
      text += selectedLanguage === 'tr' ? `Teknolojiler: ` : `Technologies: `;
      text += `${project.technologies.join(', ')}\n`;
      text += `Link: ${project.link}\n`;
      if (project.demo) {
        text += `Demo: ${project.demo}\n`;
      }
      text += '\n';
    });
    return text;
  };

  const formatContactText = (lang: any) => {
    const contact = lang.contact;
    return (
      (selectedLanguage === 'tr'
        ? `İletişim Bilgileri:\n\n`
        : `Contact Information:\n\n`) +
      `Email: ${contact.email}\n` +
      `LinkedIn: ${contact.linkedin}\n` +
      `GitHub: ${contact.github}\n` +
      `Twitter: ${contact.twitter}\n` +
      `Website: ${contact.website}`
    );
  };

  const formatHelpText = (lang: any) => {
    let text =
      selectedLanguage === 'tr'
        ? 'Kullanılabilir komutlar:\n\n'
        : 'Available commands:\n\n';
    Object.entries(lang.commands).forEach(([cmd, desc]) => {
      text += `- ${cmd}: ${desc}\n`;
    });

    text += selectedLanguage === 'tr' ? '\nİpuçları:\n' : '\nTips:\n';
    lang.tips.forEach((tip: string) => {
      text += `- ${tip}\n`;
    });

    return text;
  };

  const handleCommand = (command: string) => {
    if (!selectedLanguage) return;
    if (command.trim() === '') return;

    const lang = profileData[selectedLanguage];
    const newCommands = [...commands, { text: `> ${command}`, type: 'input' }];
    setCommandHistory((prev) => [...prev, command]);
    setHistoryIndex(-1);
    setInput('');

    let outputText = '';
    switch (command.toLowerCase()) {
      case 'çıkış':
      case 'exit':
        setSelectedLanguage(null);
        setCommands([]);
        setCommandHistory([]);
        setHistoryIndex(-1);
        setTypingIndex(0);
        return;
      case 'hakkımda':
      case 'about':
        outputText = formatAboutText(lang);
        break;
      case 'projeler':
      case 'projects':
        outputText = formatProjectsText(lang);
        break;
      case 'iletişim':
      case 'contact':
        outputText = formatContactText(lang);
        break;
      case 'yardım':
      case 'help':
        outputText = formatHelpText(lang);
        break;
      case 'temizle':
      case 'clear':
        setCommands([
          {
            text:
              selectedLanguage === 'tr'
                ? 'Terminal temizlendi.'
                : 'Terminal cleared.',
            type: 'output',
          },
          { text: lang.helpPrompt, type: 'output' },
        ]);
        return;
      case 'yazılar':
      case 'blog':
        outputText = formatBlogText(lang);
        break;
      case 'deneyim':
      case 'experience':
        outputText = formatExperienceText(lang);
        break;
      case 'eğitim':
      case 'education':
        outputText = formatEducationText(lang);
        break;
      case 'yetenekler':
      case 'skills':
        outputText = formatSkillsText(lang);
        break;
      case 'sertifikalar':
      case 'certs':
        outputText = formatCertificationsText(lang);
        break;
      case 'tema':
      case 'theme':
        const themeNames = Object.keys(themes);
        const currentIndex = themeNames.indexOf(
          currentTheme === themes.default
            ? 'default'
            : currentTheme === themes.dark
            ? 'dark'
            : currentTheme === themes.light
            ? 'light'
            : 'matrix'
        );
        const nextTheme = themeNames[(currentIndex + 1) % themeNames.length];
        setCurrentTheme(themes[nextTheme]);
        outputText =
          selectedLanguage === 'tr'
            ? `Tema değiştirildi: ${nextTheme}`
            : `Theme changed: ${nextTheme}`;
        break;
      default:
        outputText = lang.invalidCommand;
    }

    if (outputText) {
      newCommands.push({
        text: outputText,
        type: 'output',
        isTyping: true,
      });
      setCommands(newCommands);
      setTimeout(() => {
        typeText(outputText, 0);
      }, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!selectedLanguage) {
        const langCode = input.toLowerCase();
        if (profileData[langCode]) {
          handleLanguageSelect(langCode);
          setInput('');
        } else {
          setCommands([
            { text: 'Lütfen geçerli bir dil seçiniz. (tr/en)', type: 'output' },
            { text: 'Please select a valid language. (tr/en)', type: 'output' },
          ]);
          setInput('');
        }
      } else {
        handleCommand(input);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab' && selectedLanguage) {
      e.preventDefault();
      const availableCommands = Object.keys(
        profileData[selectedLanguage].commands
      );
      const currentInput = input.toLowerCase();
      const matchingCommand = availableCommands.find((cmd) =>
        cmd.startsWith(currentInput)
      );
      if (matchingCommand) {
        setInput(matchingCommand);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  if (!selectedLanguage) {
    return (
      <div
        className={`terminal-container h-full w-full ${currentTheme.background} ${currentTheme.text} font-mono flex`}
      >
        <div className='w-1/3 border-r border-gray-700 flex flex-col'>
          <div className='flex-1 p-4 bg-black/50'>
            <div className='text-sm text-gray-400 mb-4'>
              {profileData.tr.welcome.includes('Merhaba')
                ? 'Kullanılabilir diller:'
                : 'Available languages:'}
              <br />
              - tr (Türkçe)
              <br />- en (English)
            </div>
            <div className='terminal-input flex items-center bg-black/50 p-2 rounded'>
              <span className={`${currentTheme.prompt} mr-2`}>$</span>
              <input
                ref={inputRef}
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className='bg-transparent text-white outline-none flex-1'
                placeholder='tr/en'
                autoFocus
              />
            </div>
          </div>
        </div>

        <div className='w-2/3 flex flex-col'>
          <div
            ref={terminalRef}
            className='terminal-content flex-1 overflow-y-auto bg-black/50 p-4'
          >
            {commands.map((cmd, index) => (
              <div
                key={index}
                className={`whitespace-pre-wrap mb-2 ${
                  cmd.type === 'input'
                    ? currentTheme.command
                    : currentTheme.text
                }`}
              >
                {cmd.isTyping && index === commands.length - 1
                  ? cmd.text.substring(0, typingIndex)
                  : cmd.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`terminal-container h-full w-full ${currentTheme.background} ${currentTheme.text} font-mono flex`}
    >
      <div className='w-1/3 border-r border-gray-700 flex flex-col'>
        <div className='flex-1 p-4 bg-black/50'>
          <div className='text-sm text-gray-400 mb-4'>
            {selectedLanguage === 'tr'
              ? 'Kullanılabilir komutlar:'
              : 'Available commands:'}
            <br />
            {Object.entries(profileData[selectedLanguage].commands).map(
              ([cmd, desc]) => (
                <React.Fragment key={cmd}>
                  - {cmd}
                  <br />
                </React.Fragment>
              )
            )}
          </div>
          <div className='terminal-input flex items-center bg-black/50 p-2 rounded'>
            <span className={`${currentTheme.prompt} mr-2`}>$</span>
            <input
              ref={inputRef}
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className='bg-transparent text-white outline-none flex-1'
              placeholder={
                selectedLanguage === 'tr'
                  ? 'Komut girin...'
                  : 'Type a command...'
              }
              autoFocus
            />
          </div>
        </div>
      </div>

      <div className='w-2/3 flex flex-col'>
        <div
          ref={terminalRef}
          className='terminal-content flex-1 overflow-y-auto bg-black/50 p-4'
        >
          {commands.map((cmd, index) => (
            <div
              key={index}
              className={`whitespace-pre-wrap mb-2 ${
                cmd.type === 'input' ? currentTheme.command : currentTheme.text
              }`}
            >
              {cmd.isTyping && index === commands.length - 1
                ? cmd.text.substring(0, typingIndex)
                : cmd.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Terminal;
