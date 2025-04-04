import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { useSpring, animated } from "@react-spring/web";

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
		<animated.div
			style={{
				position: "relative",
				// height: "100vh",
				width: "100vw",
				...springProps,
			}}
		>
			{/* Night Light fixed at the top */}
			<div className="fixed-light-container">
				<NightLight
					isOn={isOn}
					onToggle={setIsOn}
					maxPullDistance={maxPullDistance}
					initialWireLength={initialWireLength}
					wireColor={wireColor}
				/>
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
						padding-top: 200px; /* Space for the fixed light */
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

						.demo-container {
							padding-top: 160px;
						}
					}
				`}
			</style>
		</animated.div>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
