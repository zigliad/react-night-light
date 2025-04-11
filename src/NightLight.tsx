import { animated, config, useSpring } from "@react-spring/web";
import React, { useCallback, useEffect, useRef, useState } from "react";

// SVG Components instead of image references
const BulbOffSVG = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 180">
		<defs>
			<radialGradient
				id="bulbOffGradient"
				cx="50%"
				cy="50%"
				r="50%"
				fx="45%"
				fy="40%"
			>
				<stop offset="0%" stopColor="#f8f8f8" />
				<stop offset="60%" stopColor="#e0e0e0" />
				<stop offset="100%" stopColor="#b0b0b0" />
			</radialGradient>
		</defs>
		<circle
			cx="75"
			cy="72"
			r="50"
			fill="url(#bulbOffGradient)"
			stroke="#ccc"
			strokeWidth="1.5"
		/>
		<path
			d="M62,0 L88,0 L88,22 L62,22 Z"
			fill="#d0d0d0"
			stroke="#bbb"
			strokeWidth="1"
		/>
		<rect
			x="65"
			y="22"
			width="20"
			height="10"
			fill="#d0d0d0"
			stroke="#bbb"
			strokeWidth="1"
		/>
		<rect
			x="67"
			y="32"
			width="16"
			height="10"
			fill="#c0c0c0"
			stroke="#bbb"
			strokeWidth="1"
		/>
		<path
			d="M67,40 Q75,48 83,40"
			stroke="#888"
			strokeWidth="2"
			fill="none"
		/>
		<path
			d="M55,92 Q70,107 95,102"
			stroke="#888"
			strokeWidth="1.5"
			fill="none"
		/>
		<path
			d="M90,52 Q100,57 95,67"
			stroke="#d6d6d6"
			strokeWidth="1.5"
			fill="none"
		/>
	</svg>
);

const BulbOnSVG = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 180">
		<defs>
			<radialGradient
				id="bulbOnGradient"
				cx="0.5"
				cy="0.5"
				r="0.5"
				fx="0.45"
				fy="0.45"
			>
				<stop offset="0%" stopColor="#fffef0" />
				<stop offset="50%" stopColor="#fff8d0" />
				<stop offset="100%" stopColor="#ffeeaa" />
			</radialGradient>
		</defs>
		<circle
			cx="75"
			cy="72"
			r="50"
			fill="url(#bulbOnGradient)"
			stroke="#e5ca80"
			strokeWidth="1"
		/>
		<path
			d="M62,0 L88,0 L88,22 L62,22 Z"
			fill="#d0d0d0"
			stroke="#bbb"
			strokeWidth="1"
		/>
		<rect
			x="65"
			y="22"
			width="20"
			height="10"
			fill="#d0d0d0"
			stroke="#bbb"
			strokeWidth="1"
		/>
		<rect
			x="67"
			y="32"
			width="16"
			height="10"
			fill="#c0c0c0"
			stroke="#bbb"
			strokeWidth="1"
		/>
		<path
			d="M67,40 Q75,48 83,40"
			stroke="#ffb84d"
			strokeWidth="2"
			fill="none"
		/>
		<path
			d="M55,92 Q70,107 95,102"
			stroke="#ca9"
			strokeWidth="1.5"
			fill="none"
		/>
		<path
			d="M90,52 Q100,57 95,67"
			stroke="#fff"
			strokeWidth="2"
			fill="none"
			opacity="0.8"
		/>
		<line
			x1="75"
			y1="30"
			x2="75"
			y2="45"
			stroke="rgba(255, 255, 200, 0.8)"
			strokeWidth="1.5"
		/>
		<line
			x1="100"
			y1="47"
			x2="85"
			y2="47"
			stroke="rgba(255, 255, 200, 0.8)"
			strokeWidth="1.5"
		/>
		<line
			x1="50"
			y1="47"
			x2="65"
			y2="47"
			stroke="rgba(255, 255, 200, 0.8)"
			strokeWidth="1.5"
		/>
	</svg>
);

const HandleSVG = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 60">
		<rect
			x="7"
			y="2"
			width="20"
			height="50"
			rx="5"
			ry="5"
			fill="#888"
			opacity="0.3"
		/>
		<rect
			x="5"
			y="0"
			width="20"
			height="50"
			rx="5"
			ry="5"
			fill="#bbb"
			stroke="#999"
			strokeWidth="1"
		/>
		<rect
			x="7"
			y="5"
			width="16"
			height="40"
			rx="3"
			ry="3"
			fill="#aaa"
			stroke="#999"
			strokeWidth="0.5"
		/>
		<rect x="10" y="10" width="10" height="30" rx="2" ry="2" fill="#999" />
		<line x1="13" y1="15" x2="17" y2="15" stroke="#777" strokeWidth="1.5" />
		<line x1="13" y1="20" x2="17" y2="20" stroke="#777" strokeWidth="1.5" />
		<line x1="13" y1="25" x2="17" y2="25" stroke="#777" strokeWidth="1.5" />
		<line x1="13" y1="30" x2="17" y2="30" stroke="#777" strokeWidth="1.5" />
		<line
			x1="9"
			y1="10"
			x2="9"
			y2="40"
			stroke="#ccc"
			strokeWidth="0.75"
			opacity="0.6"
		/>
	</svg>
);

export type Props = {
	isOn?: boolean;
	onToggle?: (state: boolean) => void;
	wireColor?: string;
	maxPullDistance?: number;
	initialWireLength?: number; // New prop for initial wire length
	className?: string; // Added className prop
	ref?: React.Ref<HTMLDivElement>; // React 19 allows ref as a direct prop
};

/**
 * NightLight - A React component that simulates a night light with pull-to-toggle functionality
 *
 * This component is compatible with React 19's direct ref system, where ref is passed as a prop.
 * In React 19, forwardRef becomes a legacy API as refs can be passed directly to function components.
 */
export function NightLight({
	isOn: controlledIsOn,
	onToggle,
	wireColor = "#888",
	maxPullDistance = 90, // Maximum pull distance
	initialWireLength = 30, // Default initial wire length
	className = "", // Default className is empty string
	ref, // React 19 allows ref as a direct prop
}: Props) {
	const [internalState, setInternalState] = useState(false);
	const isControlled = controlledIsOn !== undefined;
	const isOn = isControlled ? controlledIsOn : internalState;

	// Track dragging state
	const isDragging = useRef(false);
	const startY = useRef(0);
	const handleRef = useRef<HTMLDivElement>(null);
	const threshold = maxPullDistance * 0.6; // Threshold to trigger toggle
	// Track if we're interacting with the handle specifically
	const isHandleInteraction = useRef(false);

	// Spring for wire and handle animation
	const [{ y }, api] = useSpring(() => ({
		y: 0,
		config: { ...config.gentle, tension: 170, friction: 26 },
		immediate: false,
		onRest: () => {
			// Reset any extreme positions if they somehow occur
			const currentY = y.get();
			if (currentY > maxPullDistance || currentY < 0) {
				api.start({ y: 0 });
			}
		},
	}));

	// Spring for background color
	const backgroundSpring = useSpring({
		config: { mass: 1, tension: 120, friction: 14 },
	});

	// Spring for bulb opacity transitions
	const bulbOnSpring = useSpring({
		opacity: isOn ? 1 : 0,
		config: { mass: 1, tension: 120, friction: 14 },
	});

	const bulbOffSpring = useSpring({
		opacity: isOn ? 0 : 1,
		config: { mass: 1, tension: 120, friction: 14 },
	});

	// For tracking animation state
	const animationTimeoutRef = useRef<number | null>(null);

	// Clear any pending timeouts
	const clearAnimationTimeout = () => {
		if (animationTimeoutRef.current !== null) {
			window.clearTimeout(animationTimeoutRef.current);
			animationTimeoutRef.current = null;
		}
	};

	// Handle starting the drag
	const handleStart = useCallback(
		(e: React.MouseEvent | React.TouchEvent) => {
			// Only start dragging if we're touching the handle
			if ("touches" in e) {
				const target = e.target as HTMLElement;
				if (handleRef.current && handleRef.current.contains(target)) {
					// This is a handle interaction - we should prevent default
					e.preventDefault();
					isDragging.current = true;
					isHandleInteraction.current = true;
					startY.current = e.touches[0].clientY;
				}
			} else {
				// For mouse events, always prevent default
				e.preventDefault();
				isDragging.current = true;
				isHandleInteraction.current = true;
				startY.current = e.clientY;
			}
		},
		[]
	);

	// Handle drag movement
	const handleMove = useCallback(
		(clientY: number) => {
			if (!isDragging.current) return;

			// Clear any pending animation timeouts when moving
			clearAnimationTimeout();

			// Calculate pull distance with stronger constraints
			const pullDistance = Math.max(
				0,
				Math.min(maxPullDistance, clientY - startY.current)
			);

			// Use immediate: true for dragging to avoid lag
			api.start({ y: pullDistance, immediate: true });
		},
		[api, maxPullDistance]
	);

	// Handle mouse move for desktop
	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			handleMove(e.clientY);
		},
		[handleMove]
	);

	// Handle touch move for mobile
	const handleTouchMove = useCallback(
		(e: TouchEvent) => {
			// Only prevent default if this is a handle interaction
			if (isDragging.current && isHandleInteraction.current) {
				e.preventDefault();
				handleMove(e.touches[0].clientY);
			}
		},
		[handleMove]
	);

	// Handle drag end
	const handleEnd = useCallback(() => {
		if (!isDragging.current) return;
		isDragging.current = false;
		isHandleInteraction.current = false;

		// Clear any pending timeouts
		clearAnimationTimeout();

		// Get current position in a safe way
		let currentY;
		try {
			currentY = y.get();
			// Ensure it's a valid number and within bounds
			if (isNaN(currentY) || !isFinite(currentY)) {
				currentY = 0;
			}
			currentY = Math.max(0, Math.min(maxPullDistance, currentY));
		} catch (e) {
			// Fallback if getting the value fails
			currentY = 0;
		}

		// First stop any ongoing animations
		api.stop();

		if (currentY > threshold) {
			// Toggle state
			const newState = !isOn;
			if (!isControlled) setInternalState(newState);
			onToggle?.(newState);
		}

		// Use a very simple and stable spring config for return
		api.start({
			y: 0,
			immediate: false,
			config: {
				mass: 1,
				tension: 180,
				friction: 20,
				// Use very minimal velocity to avoid extreme spring effects
				velocity: 0,
				clamp: true, // Clamp to prevent overshoot
				bounce: 0,
			},
		});

		// Set a safety timeout to ensure it returns to 0
		animationTimeoutRef.current = window.setTimeout(() => {
			api.start({ y: 0, immediate: false });
		}, 500);
	}, [api, isOn, isControlled, onToggle, threshold, y, maxPullDistance]);

	// Cancel any ongoing animations on component unmount
	useEffect(() => {
		return () => {
			// Clean up - use block for React 19 compatibility
			clearAnimationTimeout();
			api.stop();
		};
	}, [api]);

	// Set up global event listeners for desktop
	useEffect(() => {
		// Add global event listeners
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleEnd);
		window.addEventListener("touchmove", handleTouchMove, {
			passive: false, // Need non-passive to be able to preventDefault only when needed
		});
		window.addEventListener("touchend", handleEnd);
		window.addEventListener("mouseleave", handleEnd);
		window.addEventListener("blur", handleEnd); // Handle window losing focus

		// Return cleanup function with block syntax for React 19
		return () => {
			// Clean up event listeners
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleEnd);
			window.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("touchend", handleEnd);
			window.removeEventListener("mouseleave", handleEnd);
			window.removeEventListener("blur", handleEnd);
		};
	}, [handleMouseMove, handleEnd, handleTouchMove]);

	// Calculate minimum height needed based on components
	const bulbHeight = 140; // Light bulb height
	const wireHeight = initialWireLength; // Initial wire length
	const handleHeight = 40; // Handle height
	const pullExtension = maxPullDistance; // Maximum pull distance

	// Total minimum height needed for all components plus space for pulling
	const totalMinHeight =
		bulbHeight + wireHeight + handleHeight + pullExtension;

	return (
		// @ts-ignore - React-spring has issues with TypeScript in React 19
		<animated.div
			ref={ref}
			className={className}
			style={{
				...backgroundSpring,
				width: "150px", // Default width that fits the components
				height: `${totalMinHeight}px`,
				position: "relative",
				overflow: "visible", // Allow handle to extend beyond container
				display: "flex",
				justifyContent: "flex-start", // Align from left instead of center
				alignItems: "flex-start", // Align from top
			}}
		>
			{/* Light Bulb Container */}
			<div
				style={{
					position: "absolute",
					width: "120px",
					height: "140px",
					left: 0, // Position at left
					top: 0, // Start from top
				}}
			>
				{/* Off Bulb */}
				{/* @ts-ignore - React-spring has issues with TypeScript in React 19 */}
				<animated.div
					style={{
						...bulbOffSpring,
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
					}}
				>
					<BulbOffSVG />
				</animated.div>

				{/* On Bulb */}
				{/* @ts-ignore - React-spring has issues with TypeScript in React 19 */}
				<animated.div
					style={{
						...bulbOnSpring,
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
					}}
				>
					<BulbOnSVG />
				</animated.div>
			</div>

			{/* Pull wire and handle */}
			<div
				style={{
					position: "absolute",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					top: 0, // Position at the top of container
					right: 0, // Position at the right side of the container
				}}
			>
				{/* Static part of the wire - always visible */}
				<div
					style={{
						height: initialWireLength,
						width: 2,
						background: wireColor,
						margin: "0 auto",
					}}
				/>

				{/* Dynamic wire connected to the handle */}
				<div
					style={{
						position: "relative",
						height: 0,
						margin: 0,
						padding: 0,
					}}
				>
					<animated.div
						style={{
							position: "absolute",
							top: 0,
							left: "50%",
							marginLeft: -1,
							height: y,
							width: 2,
							background: wireColor,
							transformOrigin: "top",
						}}
					/>
				</div>

				{/* Pull Handle - with visual adjustment to connect with wire */}
				{/* @ts-ignore - React-spring has issues with TypeScript in React 19 */}
				<animated.div
					ref={handleRef}
					style={{
						y,
						width: "30px",
						height: "40px",
						display: "flex",
						justifyContent: "center",
						alignItems: "flex-start", // Align to top to connect with wire
						cursor: "grab",
						zIndex: 10,
						touchAction: "none", // Use none specifically for the handle to prevent scrolling when interacting with it
						// Connect handle to wire
						marginTop: 0,
					}}
					onMouseDown={handleStart}
					onTouchStart={handleStart}
				>
					{/* Wire connection point - ensures wire connects to handle */}
					<div
						style={{
							position: "absolute",
							top: 0,
							left: "50%",
							marginLeft: -1,
							width: 2,
							height: 2,
							background: wireColor,
						}}
					/>
					<div style={{ width: "100%", pointerEvents: "none" }}>
						<HandleSVG />
					</div>
				</animated.div>
			</div>
		</animated.div>
	);
}
