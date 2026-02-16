'use client';

import { useRef, useEffect, useState } from 'react';
import { Plane } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function VideoBackground() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [videoTexture, setVideoTexture] = useState<THREE.VideoTexture | null>(null);
    const { viewport } = useThree();

    useEffect(() => {
        // Create video element
        const video = document.createElement('video');
        video.src = '/videos/_title_h2o_202602112316_umz09.mp4';
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.crossOrigin = 'anonymous';

        videoRef.current = video;

        // Create video texture
        const texture = new THREE.VideoTexture(video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;
        texture.needsUpdate = true;

        // Wait for video to be loaded before playing
        video.addEventListener('loadeddata', () => {
            console.log('Video loaded successfully');
            texture.needsUpdate = true;
            video.play().catch(err => {
                console.error('Video autoplay failed:', err);
            });
            setVideoTexture(texture);
        });

        video.addEventListener('error', (e) => {
            console.error('Video loading error:', e);
        });

        // Start loading the video
        video.load();

        return () => {
            video.pause();
            video.src = '';
            texture.dispose();
        };
    }, []);

    if (!videoTexture) {
        return null;
    }

    // Custom shader for saturation and contrast control
    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            videoTexture: { value: videoTexture },
            opacity: { value: 1 },
            saturation: { value: 2.2 }, // Significantly increased for vivid colors
            contrast: { value: 1.7 },   // Increased for more dramatic contrast
            brightness: { value: 1.3 }, // Added brightness boost
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D videoTexture;
            uniform float opacity;
            uniform float saturation;
            uniform float contrast;
            uniform float brightness;
            varying vec2 vUv;

            vec3 adjustSaturation(vec3 color, float saturation) {
                float luminance = dot(color, vec3(0.299, 0.587, 0.114));
                return mix(vec3(luminance), color, saturation);
            }

            vec3 adjustContrast(vec3 color, float contrast) {
                return (color - 0.5) * contrast + 0.5;
            }

            void main() {
                vec4 texColor = texture2D(videoTexture, vUv);
                vec3 color = texColor.rgb;
                
                // Apply brightness boost first
                color *= brightness;
                
                // Apply contrast
                color = adjustContrast(color, contrast);
                
                // Apply saturation
                color = adjustSaturation(color, saturation);
                
                // Clamp to prevent oversaturation artifacts
                color = clamp(color, 0.0, 1.0);
                
                gl_FragColor = vec4(color, opacity);
            }
        `,
        transparent: true,
        side: THREE.DoubleSide,
        toneMapped: false,
    });

    // Responsive plane sizing based on viewport
    const isMobile = viewport.width < 7;
    const isTablet = viewport.width >= 7 && viewport.width < 12;

    const planeWidth = isMobile ? viewport.width * 1.5 : isTablet ? viewport.width * 1.3 : 30;
    const planeHeight = isMobile ? viewport.height * 1.2 : isTablet ? viewport.height * 1.1 : 20;

    return (
        <Plane
            args={[planeWidth, planeHeight]}
            position={[0, 0, -8]}
        >
            <primitive object={shaderMaterial} attach="material" />
        </Plane>
    );
}
