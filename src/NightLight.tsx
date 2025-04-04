import { animated, config, useSpring } from "@react-spring/web";
import React, { useCallback, useEffect, useRef, useState } from "react";

// Import SVG images to ensure they're properly included in builds
// Using relative URLs that will work with the base path configuration
const bulbOffSvg = "./images/bulb-off.svg";
const bulbOnSvg = "./images/bulb-on.svg";
const handleSvg = "./images/handle.svg";

export type Props = {
	isOn?: boolean;
	onToggle?: (state: boolean) => void;
	wireColor?: string;
	maxPullDistance?: number;
	width?: number | string;
	height?: number | string;
	initialWireLength?: number; // New prop for initial wire length
	className?: string; // Added className prop
};

export const NightLight: React.FC<Props> = ({
	isOn: controlledIsOn,
	onToggle,
	wireColor = "#888",
	maxPullDistance = 60, // Maximum pull distance
	width = "150px", // Default width that fits the components
	height = "auto", // Height will be determined by content
	initialWireLength = 15, // Default initial wire length
	className = "", // Default className is empty string
}) => {
	const [internalState, setInternalState] = useState(false);
	const isControlled = controlledIsOn !== undefined;
	const isOn = isControlled ? controlledIsOn : internalState;

	// Track dragging state
	const isDragging = useRef(false);
	const startY = useRef(0);
	const handleRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const threshold = maxPullDistance * 0.6; // Threshold to trigger toggle

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
		// backgroundColor: isOn ? "#f9f9f5" : "#141414",
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
			e.preventDefault();
			isDragging.current = true;

			// Record the starting position
			if ("touches" in e) {
				startY.current = e.touches[0].clientY;
			} else {
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
			e.preventDefault();
			handleMove(e.touches[0].clientY);
		},
		[handleMove]
	);

	// Handle drag end
	const handleEnd = useCallback(() => {
		if (!isDragging.current) return;
		isDragging.current = false;

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
			// Clean up
			clearAnimationTimeout();
			api.stop();
		};
	}, [api]);

	// Set up global event listeners for desktop
	useEffect(() => {
		const handleGlobalMouseMove = (e: MouseEvent) => {
			if (isDragging.current) {
				handleMove(e.clientY);
			}
		};

		const handleGlobalMouseUp = () => {
			if (isDragging.current) {
				handleEnd();
			}
		};

		// Track if mouse leaves window and force release
		const handleMouseLeave = () => {
			if (isDragging.current) {
				handleEnd();
			}
		};

		// Add global event listeners
		window.addEventListener("mousemove", handleGlobalMouseMove);
		window.addEventListener("mouseup", handleGlobalMouseUp);
		window.addEventListener("touchmove", handleTouchMove, {
			passive: false,
		});
		window.addEventListener("touchend", handleEnd);
		window.addEventListener("mouseleave", handleMouseLeave);
		window.addEventListener("blur", handleEnd); // Handle window losing focus

		return () => {
			// Clean up event listeners
			window.removeEventListener("mousemove", handleGlobalMouseMove);
			window.removeEventListener("mouseup", handleGlobalMouseUp);
			window.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("touchend", handleEnd);
			window.removeEventListener("mouseleave", handleMouseLeave);
			window.removeEventListener("blur", handleEnd);
		};
	}, [handleMove, handleEnd, handleTouchMove]);

	// Calculate minimum height needed based on components
	const bulbHeight = 140; // Light bulb height
	const wireHeight = initialWireLength; // Initial wire length
	const handleHeight = 40; // Handle height
	const pullExtension = maxPullDistance; // Maximum pull distance

	// Total minimum height needed for all components plus space for pulling
	const totalMinHeight =
		bulbHeight + wireHeight + handleHeight + pullExtension;

	return (
		<animated.div
			ref={containerRef}
			className={className}
			style={{
				...backgroundSpring,
				width, // Use provided width or default to 150px
				height: height === "auto" ? `${totalMinHeight}px` : height,
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
				<animated.img
					src={bulbOffSvg}
					alt="Light bulb off"
					style={{
						...bulbOffSpring,
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
					}}
				/>

				{/* On Bulb */}
				<animated.img
					src={bulbOnSvg}
					alt="Light bulb on"
					style={{
						...bulbOnSpring,
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
					}}
				/>
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
						touchAction: "none",
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
					<img
						src={handleSvg}
						alt="Pull handle"
						style={{
							width: "100%",
							pointerEvents: "none",
							filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.15))",
						}}
					/>
				</animated.div>
			</div>
		</animated.div>
	);
};
