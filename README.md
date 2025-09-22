# 🏙️ FixMyTown  

**FixMyTown** is a **civic issue reporting and resolution platform** that bridges the gap between citizens and local administrations.  
It enables **citizens** to easily report issues via a **mobile app**, while **administrators** manage, verify, and resolve them through a **web portal** with AI-powered routing and analytics.  

---

## ✨ Features  

### 👥 User Panel (Mobile App)
- 📍 **Report Issues** with details, photos, and speech-to-text support.  
- 🔄 **Check if an issue already exists** and update existing reports.  
- 📊 **Heatmap of issues** for better awareness.  
- ⏳ **Track timeline** of pending and resolved issues.  
- 🗣️ **Provide feedback** once an issue is resolved.  
- 📢 **Civic Updates**: Notices & initiatives from authorities.  

### 🛠️ Admin Panel (Web App)
- 📌 **View pending issues** with AI-based verification for authenticity.  
- 🤖 **AI filters spam/invalid reports**, flagged issues go for human review.  
- 🏢 **Delegate issues to departments** automatically.  
- ✅ **Track resolution progress** and mark as resolved.  
- 📈 **Efficiency metrics**: Avg. resolution time, no. of issues resolved.  
- 📰 **Announcements & updates** for citizens.  
- 📍 **Issue heatmap** for decision-making.  

---

## 🏗️ System Workflow  

![System Workflow](./assets/fixmytown-flow.png)  
*(Add your architecture diagram here — the one you uploaded!)*  

---

## 🛠️ Tech Stack  

**Frontend:**  
- ⚛️ React (Admin Web)  
- 📱 React Native (Citizen Mobile App)  

**Backend:**  
- 🌐 Node.js | Next.js | FastAPI  

**Database:**  
- 🍃 MongoDB  

**APIs:**  
- 🔮 Gemini AI (AI-based verification, NLP, severity detection)  
- 🗺️ Google Maps API (location & geotagging)  

---

## 📊 Key Highlights  
- 🔎 **AI-powered severity detection & spam filtering**.  
- 🚀 **Real-time dashboards** for citizens & admins.  
- 📡 **API calls for combining issue descriptions & reports**.  
- 🏆 **Ranking system** for municipalities based on efficiency.  
- 🔗 **Seamless citizen–authority communication**.  

---

## 🚀 Getting Started  

### Prerequisites  
- Node.js & npm  
- MongoDB instance  
- Google Maps API key  
- Gemini AI API key  

### Installation  
```bash
# Clone repository
git clone https://github.com/your-username/FixMyTown.git

# Install dependencies
cd FixMyTown
npm install

# Run development server
npm run dev
