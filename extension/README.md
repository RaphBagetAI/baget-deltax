# Extension Installation Guide

This guide covers how to install the Deltax Chrome Extension locally for testing against the Indy.fr dashboard.

## Prerequisites
* Google Chrome or any Chromium-based browser (Brave, Edge).
* An active Indy account (or access to an Indy environment with a `/transactions` page).

## Installation Steps

1. **Download the Source**
   Clone the repository and ensure you have the `extension/` folder on your local machine.

2. **Open Extensions Page**
   Open Chrome and navigate to `chrome://extensions/`.

3. **Enable Developer Mode**
   In the top right corner of the Extensions page, toggle **Developer mode** to ON.

4. **Load Unpacked Extension**
   Click the **Load unpacked** button in the top left corner.
   Select the `extension/` directory you downloaded in Step 1.

5. **Verify Installation**
   You should now see "Deltax - Indy Fiscal Optimizer" in your extensions list.

## How to Test

1. Log in to your Indy dashboard at `indy.fr`.
2. Navigate to the **Transactions** view (the URL must contain `/transactions`).
3. You will see a temporary UI button labeled **Check for Leaks** appear in the bottom right corner of the page.
4. Click the button. It injects the Deltax Fiscal Alert UI, demonstrating how we flag under-claimed meals (e.g., maximizing the €15.65 DGFiP rule).
5. Navigate away from `/transactions` and notice the button automatically disappears.

---
**Note:** This is a Manifest V3 prototype utilizing a background service worker to detect SPA state changes and inject the DOM overlays.