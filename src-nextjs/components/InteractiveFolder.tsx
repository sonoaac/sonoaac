import React, { useEffect, useRef } from "react";

interface FolderItem {
  text: string;
  link?: string;
}

interface InteractiveFolderProps {
  items: FolderItem[];
  color?: string;
  size?: number;
  folderText?: string;
}

const InteractiveFolder: React.FC<InteractiveFolderProps> = ({ 
  items, 
  color = '#2a9d8f', 
  size = 2,
  folderText = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const folderRef = useRef<HTMLDivElement | null>(null) as React.MutableRefObject<HTMLDivElement | null>;
  const [isOpen, setIsOpen] = React.useState(false);
  const [paperOffsets, setPaperOffsets] = React.useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 }
  ]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create folder structure
    const folderDiv = document.createElement('div');
    folderDiv.className = 'folder';
    folderDiv.style.transform = `scale(${size})`;
    folderDiv.style.setProperty('--folder-color', color);
    folderDiv.style.setProperty('--folder-back-color', darkenColor(color, 0.08));
    
    const folderBack = document.createElement('div');
    folderBack.className = 'folder__back';
    
    // Create papers
    const maxItems = 2;
    const papers = [...items];
    while (papers.length < maxItems) {
      papers.push({ text: '', link: '' });
    }
    
    papers.forEach((item, i) => {
      const paper = document.createElement('div');
      paper.className = `paper paper-${i + 1}`;
      
      if (item.text) {
        paper.textContent = item.text;
        paper.style.cssText = `
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: #333;
          text-align: center;
          padding: 8px;
          line-height: 1.2;
          word-break: break-word;
        `;
      }
      
      if (item.link) {
        paper.addEventListener('click', (e) => {
          e.stopPropagation();
          window.open(item.link, '_blank');
        });
        paper.style.cursor = 'pointer';
        paper.style.transition = 'all 0.2s ease';
        
        paper.addEventListener('mouseenter', () => {
          paper.style.backgroundColor = 'rgba(255, 105, 180, 0.1)';
          paper.style.transform = 'scale(1.02)';
        });
        
        paper.addEventListener('mouseleave', () => {
          paper.style.backgroundColor = '';
          paper.style.transform = '';
        });
      }
      
      paper.addEventListener('mousemove', (e) => handlePaperMouseMove(e, i));
      paper.addEventListener('mouseleave', (e) => handlePaperMouseLeave(e, i));
      
      folderBack.appendChild(paper);
    });
    
    // Create folder front
    const folderFront = document.createElement('div');
    folderFront.className = 'folder__front';
    
    // Add folder text if provided
    if (folderText) {
      const folderLabel = document.createElement('div');
      folderLabel.textContent = folderText;
       folderLabel.style.cssText = `
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         color: white;
         font-weight: 800;
         font-size: 12px;
         font-family: 'Inter', sans-serif;
         text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
         pointer-events: none;
         z-index: 10;
         letter-spacing: 0.5px;
         text-transform: uppercase;
         white-space: nowrap;
         overflow: visible;
       `;
      folderFront.appendChild(folderLabel);
    }
    
    const folderFrontRight = document.createElement('div');
    folderFrontRight.className = 'folder__front right';
    
    folderBack.appendChild(folderFront);
    folderBack.appendChild(folderFrontRight);
    folderDiv.appendChild(folderBack);
    
    // Add click handler
    folderDiv.addEventListener('click', handleClick);
    
    container.appendChild(folderDiv);
    folderRef.current = folderDiv;
    
    return () => {
      if (folderRef.current) {
        folderRef.current.remove();
      }
    };
  }, [items, color, size]);

  const darkenColor = (hex: string, percent: number) => {
    let color = hex.startsWith('#') ? hex.slice(1) : hex;
    if (color.length === 3) {
      color = color.split('').map(c => c + c).join('');
    }
    const num = parseInt(color, 16);
    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;
    r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
    g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
    b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (folderRef.current) {
      if (!isOpen) {
        folderRef.current.classList.add('open');
      } else {
        folderRef.current.classList.remove('open');
        setPaperOffsets([{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]);
        updatePaperOffsets();
      }
    }
  };

  const handlePaperMouseMove = (e: MouseEvent, index: number) => {
    if (!isOpen) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    
    const newOffsets = [...paperOffsets];
    newOffsets[index] = { x: offsetX, y: offsetY };
    setPaperOffsets(newOffsets);
    updatePaperOffsets();
  };

  const handlePaperMouseLeave = (e: MouseEvent, index: number) => {
    const newOffsets = [...paperOffsets];
    newOffsets[index] = { x: 0, y: 0 };
    setPaperOffsets(newOffsets);
    updatePaperOffsets();
  };

  const updatePaperOffsets = () => {
    if (!folderRef.current) return;
    const papers = folderRef.current.querySelectorAll('.paper');
    papers.forEach((paper, index) => {
      if (isOpen && paperOffsets[index]) {
        (paper as HTMLElement).style.setProperty('--magnet-x', `${paperOffsets[index].x}px`);
        (paper as HTMLElement).style.setProperty('--magnet-y', `${paperOffsets[index].y}px`);
        (paper as HTMLElement).style.transform += ` translate(var(--magnet-x, 0), var(--magnet-y, 0))`;
      }
    });
  };

  return <div ref={containerRef} className="folder-container"></div>;
};

export default InteractiveFolder;
