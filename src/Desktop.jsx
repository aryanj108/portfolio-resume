import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import "./Desktop.css";
import ShowcaseApp from "./apps/ShowcaseApp";
import SkillsApp from "./apps/SkillsApp";
import Wordle from "./apps/Wordle";
import Algorithms from "./apps/Algorithms";
import Credits from "./apps/Credits";
import { asset } from "./utils/assets";



function PortfolioWindow({ title, children, onClose, onMinimize, onMaximize, isMaximized, isActive, onFocus, zIndex, playClickSound }) {
  const [size, setSize] = React.useState({ width: 800, height: 600 });
  const [isResizing, setIsResizing] = React.useState(false);
  const [resizeDirection, setResizeDirection] = React.useState(null);

  const handleMouseDown = (direction) => (e) => {
    if (isMaximized) return;
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction.includes('e')) newWidth = Math.max(400, startWidth + deltaX);
      if (direction.includes('w')) newWidth = Math.max(400, startWidth - deltaX);
      if (direction.includes('s')) newHeight = Math.max(300, startHeight + deltaY);
      if (direction.includes('n')) newHeight = Math.max(300, startHeight - deltaY);

      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeDirection(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };


  return (
    <Draggable handle=".window-header" disabled={isMaximized}>
      <div 
        className="window" 
        style={{
          zIndex: zIndex,
          width: isMaximized ? '100%' : `${size.width}px`,
          height: isMaximized ? 'calc(100% - 32px)' : `${size.height}px`,
          ...(isMaximized && {
            top: 0,
            left: 0,
            transform: 'none'
          })
        }}
        onClick={onFocus}
      >
        {/* Windows 95/98 style title bar */}
        <div className={`window-header ${isActive ? 'active' : 'inactive'}`}>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <img 
              src={asset("icons/window-icon.png")} 
              alt="" 
              style={{ width: '16px', height: '16px', marginRight: '6px' }}
              onError={(e) => e.target.style.display = 'none'}
            />
            <span>{title}</span>
          </div>
          <div className="window-controls">
            <button className="minimize-btn" onClick={(e) => { e.stopPropagation(); playClickSound(); onMinimize(); }} title="Minimize">
              <span style={{ fontSize: '16px', fontWeight: 'bold', lineHeight: '1' }}>─</span>
            </button>
            <button className="maximize-btn" onClick={(e) => { e.stopPropagation(); playClickSound(); onMaximize(); }} title="Maximize">
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>□</span>
            </button>
            <button className="close-btn" onClick={(e) => { e.stopPropagation(); playClickSound(); onClose(); }} title="Close">
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>×</span>
            </button>
          </div>
        </div>
        
        {/* Window content */}
        <div className="window-content">{children}</div>
        
        {/* Copyright footer */}
        <div className="window-footer">
          © Copyright {new Date().getFullYear()} {title.split(' ')[0]}
        </div>

        {/* Resize handles */}
        {!isMaximized && (
          <>
            {/* Edges */}
            <div onMouseDown={handleMouseDown('e')} style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: '5px', cursor: 'ew-resize'
            }} />
            <div onMouseDown={handleMouseDown('w')} style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '5px', cursor: 'ew-resize'
            }} />
            <div onMouseDown={handleMouseDown('s')} style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '5px', cursor: 'ns-resize'
            }} />
            <div onMouseDown={handleMouseDown('n')} style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '5px', cursor: 'ns-resize'
            }} />
            
            {/* Corners */}
            <div onMouseDown={handleMouseDown('se')} style={{
              position: 'absolute', right: 0, bottom: 0, width: '10px', height: '10px', cursor: 'nwse-resize'
            }} />
            <div onMouseDown={handleMouseDown('sw')} style={{
              position: 'absolute', left: 0, bottom: 0, width: '10px', height: '10px', cursor: 'nesw-resize'
            }} />
            <div onMouseDown={handleMouseDown('ne')} style={{
              position: 'absolute', right: 0, top: 0, width: '10px', height: '10px', cursor: 'nesw-resize'
            }} />
            <div onMouseDown={handleMouseDown('nw')} style={{
              position: 'absolute', left: 0, top: 0, width: '10px', height: '10px', cursor: 'nwse-resize'
            }} />
          </>
        )}
      </div>
    </Draggable>
  );
}

export default function Desktop() {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleGlobalClick = () => {
      const audio = new Audio(asset("icons/mouseClick.mp3"));
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio play failed:', e));
    };

    document.addEventListener('click', handleGlobalClick);
    
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  useEffect(() => {
    const backgroundMusic = new Audio(asset("icons/background-music.mp3"));
    backgroundMusic.volume = 0.3; // Low volume so it's not annoying
    backgroundMusic.loop = true; // Loop the music
    
    // Start playing
    backgroundMusic.play().catch(e => console.log('Background music failed:', e));
    
    // Cleanup when component unmounts
    return () => {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    };
  }, []);

    const playClickSound = () => {
      const audio = new Audio(asset("icons/mouseClick.mp3"));
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio play failed:', e));
  };

  const datePart = currentTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const timePart = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedTime = `${datePart} ${timePart}`;

  // Window state management
  const [openWindows, setOpenWindows] = useState([
    { id: "home", position: { x: 150, y: 80 }, isMinimized: false, isMaximized: false, zIndex: 10 }
  ]);
  const [activeWindowId, setActiveWindowId] = useState("home");
  const [highestZIndex, setHighestZIndex] = useState(10);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const openWindow = (id) => {
    const existingWindow = openWindows.find(w => w.id === id);
    
    if (existingWindow) {
      // If minimized, restore it
      if (existingWindow.isMinimized) {
        const newZIndex = highestZIndex + 1;
        setHighestZIndex(newZIndex);
        setOpenWindows(openWindows.map(w => 
          w.id === id ? { ...w, isMinimized: false, zIndex: newZIndex } : w
        ));
        setActiveWindowId(id);
      } else {
        // Just bring to front
        focusWindow(id);
      }
    } else {
      // Open new window
      const offset = openWindows.length * 30;
      const newZIndex = highestZIndex + 1;
      setHighestZIndex(newZIndex);
      setOpenWindows([...openWindows, { 
        id, 
        position: { x: 150 + offset, y: 80 + offset },
        isMinimized: false,
        isMaximized: false,
        zIndex: newZIndex
      }]);
      setActiveWindowId(id);
    }
  };

  const closeWindow = (id) => {
    setOpenWindows(openWindows.filter(w => w.id !== id));
    if (activeWindowId === id) {
      const remaining = openWindows.filter(w => w.id !== id);
      if (remaining.length > 0) {
        setActiveWindowId(remaining[remaining.length - 1].id);
      }
    }
  };

  const minimizeWindow = (id) => {
    setOpenWindows(openWindows.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  const maximizeWindow = (id) => {
    setOpenWindows(openWindows.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const focusWindow = (id) => {
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    setOpenWindows(openWindows.map(w => 
      w.id === id ? { ...w, zIndex: newZIndex } : w
    ));
    setActiveWindowId(id);
  };

  const icons = [
    { id: "home", label: "Showcase", content: <ShowcaseApp />},
    { id: "resume", label: "Resume", content: <div style={{
          borderTop: '1px solid #000',
          borderBottom: '1px solid #000',
          padding: '10px 0',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
        }}>
          <img 
            src= {asset("icons/resume-icon.gif")}
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
              href={asset("icons/resume.pdf")} 
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
     },
    { id: "contact", label: "Contact", content: <ShowcaseApp initialSection="CONTACT" />},
    { id: "doom", label: "Doom", content: "M/A" },
    { id: "wordle", label: "Wordle", content: <Wordle /> },
    { id: "credit", label: "Credit App", content: <Credits /> },
    { id: "skills", label: "Skills App", content: <SkillsApp />},
    { id: "algorithm", label: "Algorithm Visualizer", content: <Algorithms /> },
  ];

  return (
    <div className="desktop" onClick={() => isStartMenuOpen && setIsStartMenuOpen(false)}>
      {/* Desktop icons */}
      {icons.map(icon => (
        <Draggable key={icon.id} bounds="parent">
          <div
            className="icon"
            onDoubleClick={() => openWindow(icon.id)}
            style={{ cursor: "move" }}
          >
            <img src={asset(`icons/${icon.id}.png`)} alt={icon.label} />
            <span>{icon.label}</span>
          </div>
        </Draggable>
      ))}

      {/* Open windows */}
      {openWindows.map(win => {
        if (win.isMinimized) return null;
        const icon = icons.find(i => i.id === win.id);
        return (
          <PortfolioWindow 
            key={win.id} 
            title={icon.label} 
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onMaximize={() => maximizeWindow(win.id)}
            isMaximized={win.isMaximized}
            isActive={activeWindowId === win.id}
            onFocus={() => focusWindow(win.id)}
            zIndex={win.zIndex}
            playClickSound={playClickSound}
          >
            {icon.content}
          </PortfolioWindow>
        );
      })}

      {/* BOTTOM TASKBAR */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '32px',
        background: 'linear-gradient(to top, #b1aaaaff 0%, #9c9c9cff 100%)',
        borderTop: '1px solid #1a1a1a',
        display: 'flex',
        alignItems: 'center',
        padding: '0 4px',
        zIndex: 1000
      }}>

        {/* Left side: Start button */}
        <div style={{ flexShrink: 0 }}></div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            playClickSound();
            setIsStartMenuOpen(!isStartMenuOpen);
          }}
          style={{
          background: '#e0e0e0',
          border: isStartMenuOpen ? '2px inset #999' : '2px outset #999',
          padding: '4px 8px',
          cursor: 'pointer',
          fontFamily: 'Arial, sans-serif',
          fontSize: '13px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '0px',
          flexShrink: 0
        }}>
          <img 
            src={asset("icons/windows_logo.svg")} 
            alt="Windows" 
            style={{width: '16px', height: '16px'}}
            onError={(e) => e.target.style.display = 'none'}
          />
          Start
        </button>

        {/* Center: Open windows as buttons */}
<div style={{
  display: 'flex',
  gap: '2px',
  flex: 1,
  margin: '0 6px',
  overflow: 'hidden'
}}>
          {openWindows.map(win => {
            const icon = icons.find(i => i.id === win.id);
            return (
              <button
                key={win.id}
                onClick={() => {
                  if (win.isMinimized) openWindow(win.id);
                  else if (activeWindowId === win.id) minimizeWindow(win.id);
                  else focusWindow(win.id);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',

                  height: '22px',
                  padding: '0 8px',
                  minWidth: '120px',
                  maxWidth: '200px',

                  background:
                    activeWindowId === win.id && !win.isMinimized
                      ? '#ffffff'
                      : '#d4d0c8',

                  border:
                    activeWindowId === win.id && !win.isMinimized
                      ? '2px inset #808080'
                      : '2px outset #ffffff',

                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '12px',
                  fontWeight: 'normal',

                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                            <img
              src={`assets/icons/${win.id}.png`}
              alt=""
              style={{
                width: '16px',
                height: '16px',
                imageRendering: 'pixelated'
              }}
              onError={(e) => (e.target.style.display = 'none')}
            />

            <span style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {icon.label}
            </span>
              </button>
            );
          })}
        </div>

        {/* Right side: Live clock */}
        <div style={{ flexShrink: 0 }}></div>
        <button style={{
          background: '#e0e0e0',
          border: '2px inset #999',
          padding: '4px 8px',
          cursor: 'pointer',
          fontFamily: 'Arial, sans-serif',
          fontSize: '11px',
          flexShrink: 0,
          minWidth: '100px'
        }}>{formattedTime}</button>
      </div>
    </div>
  );
}