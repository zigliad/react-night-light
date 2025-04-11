import { animated, useSpring } from "@react-spring/web";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import { NightLight } from "./NightLight";

const App = () => {
	const [isOn, setIsOn] = useState(true);
	const [wireColor, setWireColor] = useState("#888");
	const [maxPullDistance, setMaxPullDistance] = useState(90);
	const [initialWireLength, setInitialWireLength] = useState(30);
	const [showCustomization, setShowCustomization] = useState(false);

	const springProps = useSpring({
		backgroundColor: isOn ? "#f9f9f5" : "#141414",
		config: { tension: 120, friction: 14 },
	});

	return (
		// @ts-ignore - React-spring has issues with children prop in TypeScript for React 19
		<animated.div
			style={{
				position: "relative",
				width: "100%",
				minHeight: "100vh",
				...springProps,
			}}
		>
			{/* Night Light fixed at the top */}
			<div className="fixed-light-container">
				<div className="night-light-wrapper">
					<NightLight
						isOn={isOn}
						onToggle={setIsOn}
						maxPullDistance={maxPullDistance}
						initialWireLength={initialWireLength}
						wireColor={wireColor}
					/>
				</div>
			</div>

			<div className="demo-container">
				<header className="demo-header">
					<h1 style={{ color: isOn ? "#333" : "#f0f0f0" }}>
						React Night Light
					</h1>
					<p style={{ color: isOn ? "#555" : "#ccc" }}>
						An interactive pull-cord light switch component
					</p>
				</header>

				<div className="demo-content">
					<div
						className="demo-info"
						style={{ color: isOn ? "#333" : "#ccc" }}
					>
						<div className="feature-card">
							<h2>How It Works</h2>
							<p>
								<strong>Pull down on the cord</strong> above to
								turn the light on and off! The component uses
								realistic physics animations to create a natural
								pulling interaction.
							</p>
						</div>

						<div className="feature-card">
							<h2>Key Features</h2>
							<ul>
								<li>
									<span className="feature-icon">⛓️</span>{" "}
									Interactive pull-cord mechanism
								</li>
								<li>
									<span className="feature-icon">✨</span>{" "}
									Physics-based animations
								</li>
								<li>
									<span className="feature-icon">🌈</span>{" "}
									Customizable appearance
								</li>
								<li>
									<span className="feature-icon">📱</span>{" "}
									Touch and mouse support
								</li>
								<li>
									<span className="feature-icon">🔄</span>{" "}
									Controlled & uncontrolled modes
								</li>
							</ul>
							<a
								href="https://github.com/zigliad/react-night-light"
								target="_blank"
								rel="noopener noreferrer"
								className="github-link"
							>
								<svg
									className="github-icon"
									viewBox="0 0 16 16"
									fill="white"
								>
									<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
								</svg>
								View on GitHub
							</a>
						</div>

						<div className="feature-card">
							<h2>Current State</h2>
							<div className="state-indicator">
								<p>
									The light is currently{" "}
									<strong>{isOn ? "ON" : "OFF"}</strong>
									{isOn ? " ☀️" : " 🌙"}
								</p>
							</div>
							<button
								className="demo-button"
								onClick={() =>
									setShowCustomization(!showCustomization)
								}
								style={{
									backgroundColor: isOn ? "#333" : "#555",
									color: isOn ? "#fff" : "#eee",
								}}
							>
								{showCustomization
									? "Hide Customization"
									: "Customize Component"}
							</button>

							{showCustomization && (
								<div className="customization-panel">
									<div className="control-group">
										<label>Wire Color:</label>
										<div className="color-with-preview">
											<input
												type="color"
												value={wireColor}
												onChange={(e) =>
													setWireColor(e.target.value)
												}
											/>
											<div
												className="color-preview"
												style={{
													backgroundColor: wireColor,
												}}
											></div>
										</div>
									</div>

									<div className="control-group">
										<label>
											Max Pull Distance:{" "}
											<span className="value-display">
												{maxPullDistance}px
											</span>
										</label>
										<input
											type="range"
											min="40"
											max="150"
											value={maxPullDistance}
											onChange={(e) =>
												setMaxPullDistance(
													parseInt(e.target.value)
												)
											}
										/>
									</div>

									<div className="control-group">
										<label>
											Wire Length:{" "}
											<span className="value-display">
												{initialWireLength}px
											</span>
										</label>
										<input
											type="range"
											min="10"
											max="60"
											value={initialWireLength}
											onChange={(e) =>
												setInitialWireLength(
													parseInt(e.target.value)
												)
											}
										/>
									</div>
								</div>
							)}
						</div>

						<div className="feature-card code-example-card">
							<div className="code-header">
								<h2>Code Example</h2>
							</div>
							<pre
								style={{
									overflow: "auto",
									backgroundColor: isOn
										? "rgba(0,0,0,0.05)"
										: "rgba(0,0,0,0.3)",
									padding: "16px",
									borderRadius: "8px",
									fontSize: "14px",
									color: isOn ? "#444" : "#f0f0f0",
									boxShadow:
										"inset 0 1px 5px rgba(0,0,0,0.1)",
									lineHeight: "1.5",
									border: `1px solid ${
										isOn
											? "rgba(0,0,0,0.1)"
											: "rgba(255,255,255,0.1)"
									}`,
								}}
							>
								{`import { NightLight } from 'react-night-light';
import { useState } from 'react';

function MyComponent() {
  const [lightOn, setLightOn] = useState(false);
  
  return (
    <NightLight
      isOn={lightOn}
      onToggle={setLightOn}
      maxPullDistance={${maxPullDistance}}
      initialWireLength={${initialWireLength}}
      wireColor="${wireColor}"
    />
  );
}`}
							</pre>
						</div>
					</div>
				</div>

				<footer style={{ color: isOn ? "#777" : "#aaa" }}>
					<p>
						Made with <span className="heart-icon">♥</span> by Liad
						Zigdon
					</p>
				</footer>
			</div>

			<style>
				{`
					html, body {
						height: 100%;
						margin: 0;
						padding: 0;
						-webkit-overflow-scrolling: touch;
					}

					#root {
						min-height: 100%;
						position: relative;
					}

					.night-light-wrapper {
						height: 250px;
						width: 150px;
						pointer-events: auto;
						position: relative;
					}

					.fixed-light-container {
						position: fixed;
						top: 0;
						left: 0;
						right: 0;
						z-index: 10;
						height: 250px;
						display: flex;
						justify-content: center;
						pointer-events: none;
						transform: translateZ(0);
					}

					.fixed-light-container > div {
						pointer-events: auto;
					}

					.demo-container {
						display: flex;
						flex-direction: column;
						min-height: 100vh;
						max-width: 1200px;
						margin: 0 auto;
						padding: 20px;
						padding-top: 250px;
						box-sizing: border-box;
						-webkit-overflow-scrolling: touch;
						position: relative;
						z-index: 1;
					}
					
					.demo-header {
						text-align: center;
						margin-bottom: 40px;
					}

					.demo-header h1 {
						margin-bottom: 10px;
						transition: color 0.3s ease;
						font-size: 2.5rem;
						font-weight: 700;
						letter-spacing: -0.5px;
					}

					.demo-header p {
						font-size: 1.2rem;
						transition: color 0.3s ease;
						opacity: 0.8;
					}
					
					.demo-content {
						display: flex;
						flex-wrap: wrap;
						flex: 1;
						gap: 40px;
						justify-content: center;
						align-items: flex-start;
					}
					
					.demo-info {
						max-width: 700px;
						transition: color 0.3s ease;
					}
					
					.feature-card {
						background-color: rgba(255, 255, 255, 0.03);
						border-radius: 12px;
						padding: 25px;
						margin-bottom: 24px;
						backdrop-filter: blur(10px);
						box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
						transition: all 0.3s ease;
						border: 1px solid rgba(255, 255, 255, 0.05);
					}

					.feature-card:hover {
						transform: translateY(-3px);
						box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
					}

					.feature-card h2 {
						margin-top: 0;
						font-size: 1.5rem;
						font-weight: 600;
						margin-bottom: 16px;
						display: flex;
						align-items: center;
					}

					.feature-icon {
						display: inline-block;
						margin-right: 8px;
						font-size: 1.2rem;
					}

					.feature-card ul {
						padding-left: 20px;
					}

					.feature-card li {
						margin-bottom: 10px;
						display: flex;
						align-items: center;
					}

					.code-example-card {
						border: 1px solid rgba(100, 100, 255, 0.1);
					}

					.code-header {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 12px;
					}

					.state-indicator {
						display: flex;
						align-items: center;
						margin-bottom: 15px;
					}

					.state-circle {
						width: 16px;
						height: 16px;
						border-radius: 50%;
						margin-right: 10px;
						transition: all 0.3s ease;
					}

					.state-on {
						background-color: #4CAF50;
						box-shadow: 0 0 10px #4CAF50;
					}

					.state-off {
						background-color: #F44336;
					}

					.demo-button {
						display: inline-block;
						padding: 10px 20px;
						border: none;
						border-radius: 30px;
						font-size: 15px;
						font-weight: 600;
						cursor: pointer;
						transition: all 0.3s ease;
						margin-top: 10px;
						box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
					}

					.demo-button:hover {
						transform: translateY(-2px);
						box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
					}
					
					.demo-button:active {
						transform: translateY(1px);
					}

					.customization-panel {
						margin-top: 20px;
						padding: 20px;
						background-color: rgba(0, 0, 0, 0.1);
						border-radius: 10px;
						border: 1px solid rgba(255, 255, 255, 0.05);
					}

					.control-group {
						margin-bottom: 20px;
					}

					.control-group:last-child {
						margin-bottom: 0;
					}

					.control-group label {
						display: block;
						margin-bottom: 8px;
						font-weight: 500;
						display: flex;
						justify-content: space-between;
						align-items: center;
					}

					.value-display {
						font-family: monospace;
						background-color: rgba(0, 0, 0, 0.1);
						padding: 2px 6px;
						border-radius: 4px;
						font-size: 14px;
					}

					.control-group input[type="range"] {
						width: 100%;
						height: 6px;
						-webkit-appearance: none;
						background: rgba(255, 255, 255, 0.1);
						outline: none;
						border-radius: 3px;
						cursor: pointer;
					}

					.control-group input[type="range"]::-webkit-slider-thumb {
						-webkit-appearance: none;
						width: 18px;
						height: 18px;
						border-radius: 50%;
						background: #fff;
						box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
					}

					.color-with-preview {
						display: flex;
						align-items: center;
					}

					.color-preview {
						width: 20px;
						height: 20px;
						border-radius: 4px;
						margin-left: 10px;
						border: 1px solid rgba(255, 255, 255, 0.2);
					}

					.heart-icon {
						color: #F44336;
						margin: 0 4px;
					}

					footer {
						text-align: center;
						margin-top: 60px;
						padding: 20px 0;
						font-size: 15px;
						transition: color 0.3s ease;
						border-top: 1px solid rgba(255, 255, 255, 0.05);
					}

					.github-link {
						display: inline-flex;
						align-items: center;
						margin-top: 12px;
						padding: 8px 16px;
						background-color: #333;
						color: white;
						text-decoration: none;
						border-radius: 6px;
						font-weight: 500;
						transition: all 0.2s ease;
						border: 1px solid rgba(255, 255, 255, 0.1);
					}

					.github-link:hover {
						background-color: #444;
						transform: translateY(-2px);
					}

					.github-icon {
						margin-right: 8px;
						width: 20px;
						height: 20px;
					}

					@media (max-width: 768px) {
						.demo-content {
							flex-direction: column;
						}
						
						.demo-info {
							width: 100%;
						}

						.fixed-light-container {
							height: 180px;
						}
						
						.night-light-wrapper {
							height: 180px;
						}

						.demo-container {
							padding-top: 180px;
							padding-left: 15px;
							padding-right: 15px;
						}
						
						pre {
							max-width: 100%;
							white-space: pre-wrap;
							word-break: break-word;
						}
						
						.feature-card {
							padding: 20px 15px;
						}
						
						body, html {
							height: 100%;
							overflow-y: auto;
							position: static;
						}
					}
				`}
			</style>
		</animated.div>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
