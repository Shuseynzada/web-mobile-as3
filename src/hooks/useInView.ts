import { useState, useEffect, useCallback } from 'react';

const useInView = (threshold = 0.1): [ (node: HTMLDivElement | null) => void, boolean ] => {
    const [isInview, setIsInview] = useState(false);
    const [node, setNode] = useState<HTMLDivElement | null>(null);

    const refCallback = useCallback((node: HTMLDivElement | null) => {
        setNode(node);
    }, []);

    useEffect(() => {
        if (!node) return;

        const observer = new IntersectionObserver((entries) => {
            setIsInview(entries[0].isIntersecting);
        }, { threshold });

        observer.observe(node);

        return () => {
            observer.unobserve(node);
        };
    }, [node, threshold]);

    return [refCallback, isInview];
};

export default useInView;
