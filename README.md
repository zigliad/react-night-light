# React Night Light

A customizable night light component for React with an interactive pull-cord mechanism.

[![npm version](https://img.shields.io/npm/v/react-night-light.svg)](https://www.npmjs.com/package/react-night-light)
<a href="https://zigliad.github.io/react-night-light/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/demo-live-brightgreen.svg" alt="Demo" /></a>
[![GitHub license](https://img.shields.io/github/license/zigliad/react-night-light.svg)](https://github.com/zigliad/react-night-light/blob/main/LICENSE)

## <a href="https://zigliad.github.io/react-night-light/" target="_blank" rel="noopener noreferrer">Live Demo</a>

<p>
  <img src="https://github.com/zigliad/react-night-light/blob/main/light-bulb-demo.gif?raw=true" alt="React Night Light Demo" width="200" />
</p>

## Features

-   💡 Realistic SVG light bulb with pull-cord toggle
-   ⛓️ Interactive pull-down handle mechanism to toggle the light
-   ✨ Physics-based animations for natural movement
-   🌈 Customizable appearance (wire color, length, pull distance)
-   🔄 Controlled and uncontrolled component modes
-   📱 Mobile / touch device compatible

## Installation

```bash
npm install react-night-light
# or
yarn add react-night-light
```

## Usage

### Controlled Mode

```jsx
import React, { useState } from "react";
import { NightLight } from "react-night-light";

const MyComponent = () => {
	const [isLightOn, setIsLightOn] = useState(false);

	return (
		<div>
			<NightLight
				isOn={isLightOn}
				onToggle={(newState) => setIsLightOn(newState)}
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
			<NightLight
				onToggle={(state) => console.log("Light is now:", state)}
			/>
		</div>
	);
};
```

## Props

| Prop                | Type                     | Default   | Description                                |
| ------------------- | ------------------------ | --------- | ------------------------------------------ |
| `isOn`              | boolean                  | undefined | Controls light state (for controlled mode) |
| `onToggle`          | (state: boolean) => void | undefined | Callback when light state changes          |
| `wireColor`         | string                   | '#888'    | Color of the pull wire                     |
| `maxPullDistance`   | number                   | 90        | Maximum pull distance (pixels)             |
| `initialWireLength` | number                   | 30        | Initial wire length (pixels)               |
| `className`         | string                   | ''        | Additional CSS class                       |

## License

MIT

[GitHub Repository](https://github.com/zigliad/react-night-light)
