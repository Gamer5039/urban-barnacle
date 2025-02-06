# Axora - Guided Meditation App

[English](#english) | [हिंदी](#hindi)

# English

## Overview
Axora is a guided meditation application built with Next.js that helps users in their mindfulness journey. The application supports multiple languages and provides a seamless meditation experience.

## Prerequisites
- Node.js (version 18.0.0 or higher)
- npm (version 8.0.0 or higher)
- Git

## Project Structure
```
axora/
├── app/                    # Main application code
│   ├── [locale]/          # Localized routes
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── i18n/                  # Internationalization
├── public/               # Static assets
├── styles/               # CSS modules
└── package.json         # Dependencies and scripts
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Gamer5039/urban-barnacle.git
cd axora
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add required environment variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_url
```

## Local Development

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

3. The app will automatically reload when you make changes

## Building for Production

1. Create a production build:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Deployment

### Deploying on Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Configure environment variables
5. Deploy

### Manual Server Deployment

1. Install PM2 globally:
```bash
npm install -g pm2
```

2. Build the application:
```bash
npm run build
```

3. Start with PM2:
```bash
pm2 start npm --name "axora" -- start
```

## Features
- Multi-language support (English and Hindi)
- Guided meditation sessions
- User authentication
- Progress tracking
- Audio playback
- Responsive design

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

# Hindi

## परिचय
Axora एक Next.js पर बनाया गया ध्यान (मेडिटेशन) ऐप है जो उपयोगकर्ताओं को माइंडफुलनेस में मदद करता है। यह ऐप कई भाषाओं का समर्थन करता है।

## आवश्यकताएं
- Node.js (version 18.0.0 या उससे ऊपर)
- npm (version 8.0.0 या उससे ऊपर)
- Git

## प्रोजेक्ट स्ट्रक्चर
```
axora/
├── app/                    # मुख्य एप्लिकेशन कोड
│   ├── [locale]/          # भाषा आधारित रूट्स
│   ├── api/               # API रूट्स
│   └── globals.css        # ग्लोबल स्टाइल्स
├── components/            # पुन: प्रयोज्य कंपोनेंट्स
├── i18n/                  # अंतर्राष्ट्रीयकरण
├── public/               # स्टैटिक एसेट्स
├── styles/               # CSS मॉड्यूल्स
└── package.json         # डिपेंडेंसी और स्क्रिप्ट्स
```

## इंस्टॉलेशन

1. रिपॉजिटरी को क्लोन करें:
```bash
git clone https://github.com/Gamer5039/urban-barnacle.git
cd axora
```

2. डिपेंडेंसी इंस्टॉल करें:
```bash
npm install
```

3. रूट डायरेक्टरी में `.env` फाइल बनाएं और आवश्यक एनवायरनमेंट वेरिएबल्स जोड़ें:
```env
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_url
```

## लोकल डेवलपमेंट

1. डेवलपमेंट सर्वर शुरू करें:
```bash
npm run dev
```

2. अपने ब्राउज़र में [http://localhost:3000](http://localhost:3000) खोलें

3. कोड में परिवर्तन करने पर ऐप अपने आप रीलोड हो जाएगा

## प्रोडक्शन बिल्ड

1. प्रोडक्शन बिल्ड बनाएं:
```bash
npm run build
```

2. प्रोडक्शन सर्वर शुरू करें:
```bash
npm start
```

## डिप्लॉयमेंट

### Vercel पर डिप्लॉय करना (अनुशंसित)

1. अपना कोड GitHub पर पुश करें
2. [Vercel](https://vercel.com) पर जाएं
3. अपनी GitHub रिपॉजिटरी इम्पोर्ट करें
4. एनवायरनमेंट वेरिएबल्स कॉन्फ़िगर करें
5. डिप्लॉय करें

### मैनुअल सर्वर डिप्लॉयमेंट

1. PM2 को ग्लोबली इंस्टॉल करें:
```bash
npm install -g pm2
```

2. एप्लिकेशन को बिल्ड करें:
```bash
npm run build
```

3. PM2 के साथ शुरू करें:
```bash
pm2 start npm --name "axora" -- start
```

## विशेषताएं
- बहु-भाषा समर्थन (अंग्रेजी और हिंदी)
- गाइडेड मेडिटेशन सेशन
- यूजर ऑथेंटिकेशन
- प्रगति ट्रैकिंग
- ऑडियो प्लेबैक
- रेस्पॉन्सिव डिज़ाइन

## योगदान
1. रिपॉजिटरी को फोर्क करें
2. फीचर ब्रांच बनाएं
3. अपने परिवर्तन कमिट करें
4. ब्रांच पर पुश करें
5. पुल रिक्वेस्ट बनाएं
