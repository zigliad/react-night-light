# React Night Light

A customizable night light component for React applications. It features a realistic SVG light bulb with a pull-down wire handle to toggle the light state, complete with physics-based animations for a natural feel.

[![npm version](https://img.shields.io/npm/v/react-night-light.svg)](https://www.npmjs.com/package/react-night-light)
[![Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://zigliad.github.io/react-night-light/)
[![GitHub license](https://img.shields.io/github/license/zigliad/react-night-light.svg)](https://github.com/zigliad/react-night-light/blob/main/LICENSE)

## Demo

Try the interactive demo: **[https://zigliad.github.io/react-night-light/](https://zigliad.github.io/react-night-light/)**

The demo showcases all the main features of the Night Light component:

-   **Interactive Pull Mechanism** - Pull on the cord to toggle the light on/off
-   **Real-time Customization** - Modify parameters like wire color, pull distance and length
-   **Live Code Examples** - See the exact code needed to implement your customized version
-   **Responsive Design** - Works on both desktop and mobile devices
-   **Mobile-Friendly** - Smart touch handling prevents page scrolling only when interacting with the handle

To run the demo locally:

```bash
git clone https://github.com/zigliad/react-night-light.git
cd react-night-light
npm install
npm run dev
```

## Features

-   🌙 Realistic SVG light bulb design
-   ⛓️ Interactive pull-down handle mechanism to toggle the light
-   🌈 Customizable wire color and glow effects
-   🔄 Controlled and uncontrolled component modes
-   ✨ Physics-based spring animations for realistic wire movement
-   🌟 Gentle background glow effect when light is on
-   🔧 Configurable pull distance and bounce effect
-   📱 Works on both desktop and touch devices
-   📱 Smart touch handling - prevents page scrolling only when interacting with the handle

## Installation

```bash
npm install react-night-light
# or
yarn add react-night-light
```

## Usage

```jsx
import React, { useState } from "react";
import { NightLight } from "react-night-light";

const MyComponent = () => {
	const [isLightOn, setIsLightOn] = useState(false);

	return (
		<div>
			<h1>My Bedroom App</h1>

			{/* Controlled mode with custom settings */}
			<NightLight
				isOn={isLightOn}
				onToggle={(newState) => setIsLightOn(newState)}
				maxPullDistance={70}
				wireColor="rgba(255, 220, 120, 0.5)"
			/>

			<p>The light is currently {isLightOn ? "ON" : "OFF"}</p>
		</div>
	);
};
```

### Uncontrolled Mode

```jsx
import React from "react";
import { NightLight } from "react-night-light";

const MyComponent = () => {
	return (
		<div>
			<h1>My Bedroom App</h1>

			{/* Uncontrolled mode */}
			<NightLight
				onToggle={(state) => console.log("Light is now:", state)}
			/>
		</div>
	);
};
```

## Props

| Prop                | Type                     | Default   | Description                                                             |
| ------------------- | ------------------------ | --------- | ----------------------------------------------------------------------- |
| `isOn`              | boolean                  | undefined | Controls the light state (if provided, component is in controlled mode) |
| `onToggle`          | (state: boolean) => void | undefined | Callback function triggered when light state changes                    |
| `wireColor`         | string                   | '#888'    | Color of the pull wire                                                  |
| `maxPullDistance`   | number                   | 90        | Maximum distance (in pixels) the wire can be pulled down                |
| `initialWireLength` | number                   | 30        | Initial length of the wire in pixels                                    |
| `className`         | string                   | ''        | Additional CSS class name for styling                                   |

## How it Works

The component uses SVG images for the bulb design and React Spring for realistic physics-based animations:

1. SVG images are used for both the on and off states of the light bulb
2. Pull down on the wire handle to toggle the light
3. When pulled past a threshold, the light state toggles
4. Releasing the handle triggers a spring animation with realistic bounce effect

### Physics Simulation

The component uses `@react-spring/web` to implement realistic motion physics:

-   Natural spring tension and friction parameters
-   Proper velocity transfer on release
-   Bounce effect that resembles a real wire/string being pulled
-   Smooth transitions for the light bulb and background effects

### Mobile Interaction

The component uses smart touch event handling to ensure it works well on mobile devices:

-   Page scrolling is only prevented when directly interacting with the pull handle
-   Normal scrolling behavior is maintained for the rest of the page
-   The pull handle uses `touchAction: "none"` to ensure precise control
-   Touch events are intelligently managed to provide a natural feel on mobile

## License

MIT

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to the [GitHub repository](https://github.com/zigliad/react-night-light).
