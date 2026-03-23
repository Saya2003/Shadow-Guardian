# 🛡️ Shadow Guardian
> **Bridging the safety gap when the grid goes dark.**

Shadow Guardian is a decentralized, offline safety ecosystem designed for women. Unlike traditional SOS apps that fail in "dead zones" (elevators, basements, or remote areas), Shadow Guardian uses **Bluetooth Low Energy (BLE) Mesh Networking** to relay distress signals from phone to phone until they reach someone with an internet connection.

---

## 🚀 The Problem
Most safety apps are useless without a cellular or data connection. Furthermore, existing solutions often compromise user privacy by storing sensitive location and health data on centralized corporate servers.

## ✨ Our Innovation: "Mesh SOS"
Shadow Guardian turns every user's smartphone into a **decentralized node**. 
1. **Offline Trigger:** A user in distress triggers an SOS even with zero signal.
2. **Mesh Hopping:** The signal "hops" via BLE to the nearest "Shadow Guardian" user.
3. **Smart Relay:** Once any node in the mesh hits 4G/Wi-Fi, it automatically alerts emergency contacts with the sender's last known location.
4. **Local-First Privacy:** All data is encrypted on-device. No central servers. No tracking.

---

## 🛠️ Tech Stack
* **Framework:** React Native (Expo)
* **Networking:** Bluetooth Low Energy (BLE) via `react-native-ble-plx`
* **Architecture:** Decentralized Mesh P2P
* **Maps:** OpenStreetMap (FOSS-compliant)
* **Styling:** Tailwind CSS / NativeWind

---

## 📦 Installation & Setup

### Prerequisites
* Node.js (v18+)
* Expo Go app on your physical Android/iOS device (Bluetooth does not work on emulators)

### Steps
1. **Clone the repo:**
   ```bash
   git clone [https://github.com/Saya2003/Shadow-Guardian.git](https://github.com/Saya2003/Shadow-Guardian.git)
   cd Shadow-Guardian