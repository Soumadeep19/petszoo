# 🐾 Petszoo - Flipkart Clone for Pet Foods & Supplies (Mobile APK + Backend)

**Petszoo** is a Flipkart clone mobile application specifically designed for pet owners. It allows customers to browse, search, and buy high-quality pet foods and supplies for **Dogs, Cats, Birds, Fish, and Small Pets**.

The project contains a **complete fullstack system**:
1. **Ready-to-install Android APK** (`Petszoo.apk` in the root folder)
2. **React + Vite Frontend** (Tailwind CSS, Lucide Icons, Capacitor Native Android integration)
3. **Node.js & Express REST Backend** (Products, Categories, Deals, Banners, Orders API with storage)

---

## 📱 Generated Android APK Location

The compiled, installable Android APK is located at:
```
c:\Users\mycom\Desktop\flipkart clone using antigravity\Petszoo.apk
```
*(Also available in `frontend/android/app/build/outputs/apk/debug/app-debug.apk`)*

### How to Install `Petszoo.apk` on Your Android Phone:
1. Transfer `Petszoo.apk` to your phone via USB cable, WhatsApp, Google Drive, or Bluetooth.
2. Tap the `Petszoo.apk` file on your phone.
3. Allow **"Install unknown apps"** when prompted.
4. Tap **Install** and open **Petszoo**!

---

## 🐶 🦜 🐱 Pet Categories & Products Included

| Pet Category | Popular Brands | Featured Items |
| :--- | :--- | :--- |
| **Birds** 🦜 | Vitapol, ZuPreem, Taiyo Pluss | Budgie daily seed mix (1.2 kg), Parrot fruit pellets, Sun-dried cuttlefish bones, Wrought iron hanging bird cages |
| **Dogs** 🐶 | Pedigree, Royal Canin, Drools, Himalaya | Pedigree Meat & Rice (10 kg), Royal Canin Maxi Puppy, Absolute Calcium Milk Bones, Anti-tick shampoos |
| **Cats** 🐱 | Whiskas, Sheba, Me-O | Ocean Fish gravy pouches (12-pack), Persian dry cat food, Creamy lickable treats, Multi-tier scratching tree |
| **Fish & Aquatics** 🐠 | Taiyo, Sobo, Hikari | High-protein floating red pellets, 3-in-1 submersible aquarium filter & oxygen pump |
| **Small Pets** 🐰 | Versele-Laga, Crispy Muesli | High-fiber muesli for guinea pigs & rabbits, timothy hay, gnaw chew sticks |
| **Accessories & Care** 🎾 | Petszoo Essentials, Himalaya | Cotton braided chew rope toys, Ayurvedic flea & tick shampoo, scratching posts |

---

## 🛍️ Flipkart UI / UX Features Replicated

- **Iconic Flipkart Top Bar**: Classic Flipkart blue header with the Petszoo logo, italic *"Explore Plus ✦"* badge, live search bar with voice/camera icons, notification bell, wishlist counter, and cart badge.
- **Circular Category Pill Slider**: High-res pet avatars (Dogs, Cats, Birds, Fish, Small Pets, Healthcare, Toys) with instant filtering.
- **Auto-sliding Banner Carousel**: Promotional event banners with sale tags and discount indicators.
- **Deals of the Day with Live Countdown Timer**: Active clock ticking down hours, minutes, and seconds.
- **Petszoo Assured Ribbon**: Flipkart's signature Plus/Assured blue-and-yellow badge on verified products.
- **Product Details Screen**:
  - Multi-image zoom slider
  - Pack size / weight variant selector (e.g., 500g, 1.2kg, 4kg, 10kg)
  - Pincode delivery estimator
  - Bank offers & special coupon discounts list
  - Detailed ingredients & nutritional specifications table
  - Sticky bottom action bar (**"ADD TO CART"** + **"BUY NOW"** in Flipkart orange `#fb641b`).
- **Cart & Pricing Summary**:
  - Quantity controls (`-` / `+`) and item removal
  - **Petszoo SuperCoins** redemption strip (`Redeem 50 coins for ₹50 Off`)
  - Detailed Flipkart bill breakdown (Total MRP, Discount, Free Delivery, Total Payable)
  - Green *"You will save ₹XXX on this order"* callout.
- **Checkout & Payment**:
  - Delivery address editor
  - Multiple payment options: **Cash on Delivery (COD)** with 4-digit captcha, **UPI (Google Pay, PhonePe, Paytm)**, **Credit/Debit Cards**, and **Net Banking**.
- **Flipkart Order Confirmation & Live Tracking Stepper**:
  - Green celebration screen
  - Live progress stepper: *Order Placed → Packed → Shipped via Petszoo Express → Out for Delivery → Delivered*.
- **5-Tab Bottom Navigation**:
  - 🏠 Home
  - 🗂️ Categories
  - 🔔 Deals & Alerts
  - 👤 Account (Pet profiles manager for dogs, birds, cats + SuperCoins wallet)
  - 🛒 Cart (with live badge counter)

---

## 🚀 How to Run the Project Locally

### 1. Start the Backend Server (Port 5000)
Double-click `start-backend.bat` or run:
```powershell
cd "c:\Users\mycom\Desktop\flipkart clone using antigravity\backend"
node server.js
```
The REST API will be available at `http://localhost:5000`.

### 2. Start the Frontend Mobile Web Preview (Port 3000)
Double-click `start-frontend-web.bat` or run:
```powershell
cd "c:\Users\mycom\Desktop\flipkart clone using antigravity\frontend"
npm run dev
```
Open `http://localhost:3000` in Google Chrome (press `F12` and click the Device Toggle icon to view as an iPhone/Android phone).

### 3. Rebuild the APK Anytime
If you make changes to products, styles, or logic, simply double click:
```
rebuild-apk.bat
```
This will automatically re-bundle the web assets and compile a fresh `Petszoo.apk`!
