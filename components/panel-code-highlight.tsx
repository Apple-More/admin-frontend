'use client';
import React, { useState, ReactNode } from 'react';

interface PanelCodeHighlightProps {
    children: ReactNode;
    title?: string;
    codeHighlight?: string;
    id?: string;
    className?: string;
}

const PanelCodeHighlight = ({ children, title, id, className = '' }: PanelCodeHighlightProps) => {
    return (
        <div className={`panel ${className}`} id={id}>
            <div className="mb-5 flex items-center justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">{title}</h5>
            </div>
            {children}
        </div>
    );
};

export default PanelCodeHighlight;
