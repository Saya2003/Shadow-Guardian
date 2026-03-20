

# Shadow Guardian - Offline SOS Mesh Network Dashboard

## Overview
A dark-mode-first, mobile-responsive women's safety dashboard with high-contrast UI, large touch targets, and a calm but urgent aesthetic. Built modularly to support future BLE integration.

## Design System
- **Background**: Charcoal Black (#121212) with subtle gray surface layers
- **Primary/SOS**: Deep Crimson (#D32F2F) with pulsing animations
- **Secondary**: Neutral Silver-Gray (#B2B2B2)
- **Typography**: Inter font, high contrast white text
- **Touch targets**: Minimum 44x44px throughout
- **Border radius**: Rounded, soft edges for a modern feel

## Pages & Components

### 1. Header / Top Navigation Bar
- App logo + "Shadow Guardian" title
- **Connectivity Status Indicator**: Animated dot — green (Online/Mesh Active) or red (Offline) with label
- Profile avatar for "Saya" with dropdown

### 2. Hero Section — SOS Trigger
- Massive circular button with crimson gradient, centered on screen
- Subtle pulsing glow animation on idle, intensifies on hover/press
- "TRIGGER SOS" label in bold white
- Below: a **slide-to-cancel** rail that appears after trigger, requiring a deliberate swipe to cancel
- Ripple animation on activation

### 3. Real-Time Status Panel — Nearby Guardians
- Radar-style animated concentric rings with dots representing mesh nodes
- List view toggle showing node name, distance, signal strength, and status
- Count badge: "3 Guardians in Range"

### 4. Emergency Contacts Grid
- Card grid (2 columns on mobile, 3+ on desktop)
- Each card: Avatar, name, phone number, status badge ("Notified" / "Standby" / "Unreachable")
- Quick-call action button on each card

### 5. Offline Map Placeholder
- Card with OpenStreetMap-styled static map visual
- "Last Known Location" pin with timestamp
- Offline indicator badge
- Location coordinates displayed

### 6. Quick Toggles Bar
- **Flashlight Toggle**: Icon button with on/off state
- **Discrete Mode Toggle**: Dims screen instantly, minimal UI mode

### 7. Bottom Navigation Bar
- Fixed bottom nav with 4 tabs: Home, Safety Vault, Community, Settings
- Lucide icons, active state highlighted in crimson
- Large tap targets (56px height)

## File Structure
- `src/pages/Index.tsx` — Main dashboard layout
- `src/components/Header.tsx` — Top nav with connectivity status
- `src/components/SOSTrigger.tsx` — Hero SOS button + slide-to-cancel
- `src/components/NearbyGuardians.tsx` — Radar + guardian list
- `src/components/EmergencyContacts.tsx` — Trusted guardian cards
- `src/components/OfflineMap.tsx` — Map placeholder with last known location
- `src/components/QuickToggles.tsx` — Flashlight + Discrete Mode
- `src/components/BottomNav.tsx` — Bottom navigation bar

## Interactions & Animations
- SOS button: CSS pulse keyframe animation, scale on press
- Radar: Rotating sweep line with fading concentric rings
- Connectivity indicator: Blinking dot animation
- Slide-to-cancel: Draggable slider component
- Discrete mode: Smooth opacity transition on entire app
- Page sections: Fade-in on mount

