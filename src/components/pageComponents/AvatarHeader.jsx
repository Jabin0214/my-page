import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EyeTrackingAvatar from '../ui/EyeTrackingAvatar';
import Button from '../functionalComponents/Button';

const AvatarHeader = ({ containerRef }) => {
    const { t } = useTranslation();

    const handleScrollDown = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className="relative min-h-[70vh] flex flex-col justify-center items-center text-center z-10">
            {/* 毛玻璃背景 */}
            <div className="absolute inset-0 -z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/50"></div>

            <div className="py-8 px-6 flex flex-col items-center">
                <div className="mb-5 relative">
                    <div className="absolute -top-2 -left-2 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
                    <EyeTrackingAvatar containerRef={containerRef} />
                </div>

                <h1 className="text-5xl font-bold mb-4 animate-fade-in text-white">
                    {t('Home.title')}
                </h1>

                <p className="text-xl max-w-2xl mx-auto mb-8 animate-fade-in delay-200 text-gray-200/80">
                    {t('Home.description')}
                </p>

                <div className="flex justify-center gap-4 animate-fade-in delay-300 mb-10">
                    <Link to="/projects">
                        <Button text={t('Home.link.0')} />
                    </Link>
                    <Link to="/contact">
                        <Button text={t('Home.link.1')} />
                    </Link>
                </div>

                {/* 向下滚动指示 */}
                <div
                    className="absolute bottom-1 left-0 right-0 flex flex-col items-center cursor-pointer animate-bounce hover:animate-none transition-all"
                    onClick={handleScrollDown}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default AvatarHeader; 