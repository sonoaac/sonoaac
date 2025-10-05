import React, { useState, useEffect } from "react";

interface PortfolioItem {
  text: string;
  link: string;
}

interface CreativePortfolioProps {
  items: PortfolioItem[];
}

const CreativePortfolio: React.FC<CreativePortfolioProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const handleFolderClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className="creative-portfolio-container">
      {/* Folder */}
      <div 
        className={`portfolio-folder ${isOpen ? 'open' : ''}`}
        onClick={handleFolderClick}
      >
        {/* Folder Front */}
        <div className="folder-front">
          <div className="folder-label">PORTFOLIO</div>
        </div>
        
        {/* Folder Back */}
        <div className="folder-back">
          {/* Portfolio Links */}
          <div className="portfolio-links">
            {items.map((item, index) => (
              <div
                key={index}
                className={`portfolio-link ${isOpen ? 'visible' : ''} ${hoveredItem === index ? 'hovered' : ''}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  transform: isOpen ? `translateY(${index * 60}px)` : 'translateY(0)',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleItemClick(item.link);
                }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="link-content">
                  <div className="link-icon">📄</div>
                  <div className="link-text">{item.text}</div>
                  <div className="link-arrow">→</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .creative-portfolio-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
          perspective: 1000px;
        }

        .portfolio-folder {
          position: relative;
          width: 200px;
          height: 150px;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .portfolio-folder:hover {
          transform: scale(1.05);
        }

        .portfolio-folder.open {
          transform: rotateX(-15deg) rotateY(10deg) scale(1.1);
        }

        .folder-front {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #ff69b4, #ff1493);
          border-radius: 8px 8px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 
            0 10px 30px rgba(255, 105, 180, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          transform-origin: bottom;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 2;
        }

        .portfolio-folder.open .folder-front {
          transform: rotateX(-120deg);
          box-shadow: 
            0 -5px 20px rgba(255, 105, 180, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .folder-label {
          color: white;
          font-size: 24px;
          font-weight: 900;
          font-family: 'Inter', sans-serif;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .folder-back {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          border-radius: 8px;
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        .portfolio-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
        }

        .portfolio-link {
          background: white;
          border-radius: 8px;
          padding: 12px 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: translateY(-20px) scale(0.8);
          border: 2px solid transparent;
          min-width: 160px;
        }

        .portfolio-link.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .portfolio-link:hover,
        .portfolio-link.hovered {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 8px 25px rgba(255, 105, 180, 0.3);
          border-color: #ff69b4;
          background: linear-gradient(135deg, #fff, #fef7f7);
        }

        .link-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .link-icon {
          font-size: 18px;
          transition: transform 0.2s ease;
        }

        .portfolio-link:hover .link-icon {
          transform: scale(1.2);
        }

        .link-text {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: #333;
          flex: 1;
        }

        .link-arrow {
          font-size: 16px;
          color: #ff69b4;
          font-weight: bold;
          transition: transform 0.2s ease;
        }

        .portfolio-link:hover .link-arrow {
          transform: translateX(5px);
        }

        /* Animation keyframes */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .portfolio-link.visible {
          animation: slideInUp 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default CreativePortfolio;
