# time-off-tracker

A lightweight countdown and tracking web application.

## Overview

Time Off Tracker is a frontend web application built to track elapsed time from a specific past date. It features a dynamic dashboard that displays:
- Real-time elapsed time (days, hours, minutes, seconds).
- Calculated metrics based on the elapsed duration.
- An interactive dynamic text generator.
- A static timeline component.

## Features

- **Live Counter:** Real-time updates calculating the exact time passed since a specific event.
- **Dynamic Interface:** Elements progress based on the tracked duration.
- **Responsive Design:** Optimized for various screen sizes, built with a dark theme aesthetic.
- **No Dependencies:** Built entirely with vanilla JavaScript, HTML5, and CSS3.

## Tech Stack

- **HTML5**
- **CSS3** (Custom properties, grid, flexbox, animations)
- **Vanilla JavaScript** (DOM manipulation, time calculations)

## Getting Started

To run the project locally:

1. Clone this repository.
2. Open `index.html` in any modern web browser.
3. The tracker will initialize automatically based on the predefined date in `script.js`.

## Customization

The base tracking date can be modified inside `script.js` by updating the `LAST_DM` and `LAST_GROUP` constant variables:

```javascript
const LAST_DM    = new Date('YYYY-MM-DDTHH:MM:SS');
const LAST_GROUP = new Date('YYYY-MM-DDTHH:MM:SS');
```
