import React from 'react';

const AdaptiveImage = ({ src, alt, className }) => {
    return (
        <div 
            className={`bg-theme-text transition-colors duration-300 ${className}`}
            style={{ 
                WebkitMaskImage: `url(${src})`, 
                WebkitMaskSize: 'contain', 
                WebkitMaskPosition: 'center', 
                WebkitMaskRepeat: 'no-repeat',
                maskImage: `url(${src})`,
                maskSize: 'contain',
                maskPosition: 'center',
                maskRepeat: 'no-repeat'
            }}
            title={alt}
            aria-label={alt}
            role="img"
        />
    );
};

export default AdaptiveImage;
