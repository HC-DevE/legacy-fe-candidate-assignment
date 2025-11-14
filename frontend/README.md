# 🔐 Web3 Message Signer & Verifier - Frontend

A modern, beautiful Web3 application for signing and verifying messages using Dynamic.xyz headless authentication. Built with Next.js 15, React 19, TypeScript, and a stunning UI inspired by leading crypto applications.

---

## 📸 Screenshots

### Login Page
Beautiful authentication with email OTP and wallet connect options.
[![Screenshot — Login Page](/screenshots/login-page-screenshot.png)](/screenshots/login-page-screenshot.png)


### Dashboard
Modern interface for signing messages and viewing history.
[![Screenshot — Dashboard Page](/screenshots/dashboard-page-screenshot.png)](/screenshots/dashboard-page-screenshot.png)

---

## ✨ Features

### 🔐 Authentication
- **Dynamic.xyz Headless Integration** - Email OTP & Wallet Connect
- **Non-custodial** - Your keys, your control
- **Multi-factor Authentication** - Email verification
- **Session Management** - Persistent login state

### ✍️ Message Signing
- **Custom Message Input** - Sign any message
- **Real-time Validation** - Zod schema validation
- **Instant Verification** - Backend verification on signing
- **Transaction History** - Local storage of signed messages

### 🎨 User Interface
- **Light Theme** - Beautiful, modern design
- **Glassmorphism Effects** - Selective use for key components
- **Responsive Design** - Mobile-first approach
- **Color-Coded Sections**:
  - 🟣 Purple → Indigo → Blue (Login & Dashboard)

### 📊 Dashboard Features
- **Wallet Connection Status** - Real-time display
- **Message History** - Filter by wallet address
- **Copy to Clipboard** - One-click copy for addresses and signatures
- **Stats Overview** - Total messages, verification rate
- **Network Display** - Current blockchain network

---

## 🚀 Tech Stack

### Core
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript 5** - Type safety throughout

### State Management
- **Zustand** - Lightweight state management
- **TanStack Query v5** - Server state management
- **TanStack Form** - Form state and validation

### UI/UX
- **Tailwind CSS 3** - Utility-first CSS
- **Shadcn UI** - High-quality React components
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications

### Web3
- **Dynamic.xyz SDK** - Headless wallet authentication
- **Ethers.js v6** - Ethereum interactions
- **Viem** - TypeScript Ethereum library

### Validation
- **Zod** - Schema validation

---

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**
- **Dynamic.xyz Account** - Get your Environment ID from [Dynamic.xyz Dashboard](https://app.dynamic.xyz)

---

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd <repository-name>/frontend
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID=your_dynamic_environment_id_here
NEXT_PUBLIC_DYNAMIC_ORGANIZATION_ID=your_dynamic_organization_id_here  Optional
NEXT_PUBLIC_DYNAMIC_API_TOKEN=your_dynamic_api_token_here Optional
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Get your Dynamic Environment ID:**
1. Go to [Dynamic.xyz Dashboard](https://app.dynamic.xyz)
2. Create a new project or select existing
3. Copy your Environment ID from Settings
4. Enable Email authentication in Dynamic settings

### 4. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎯 Key Components

### Authentication Flow
1. User enters email
2. Dynamic.xyz sends OTP
3. User verifies OTP
4. Wallet created/connected
5. Redirect to dashboard

### Message Signing Flow

1. User inputs message
2. Validate with Zod schema
3. Sign with wallet
4. Verify signature with backend
5. Store in Zustand + localStorage
6. Display in history


### State Management

- auth.store.ts      # Authentication state
- message.store.ts   # Signed messages


---

## 🎨 Design System

### Color Palette
```css

/* Gradients */
Purple → Indigo → Blue        /* Login & Dashboard Header */
```

### Animation Classes
```css
.animate-float                /* Floating animation */
.animate-pulse-slow           /* Slow pulse */
.animate-shimmer              /* Shimmer effect */
.hover-lift                   /* Lift on hover */
.glass-card                   /* Glassmorphism */
```

---

## 🔧 Configuration

### Tailwind Config

Custom animations, gradients, and utilities are defined in `tailwind.config.ts`.

### Next.js Config

App Router configuration in `next.config.js`.

### TypeScript Config

Strict mode enabled with path aliases in `tsconfig.json`.

---

## 📡 API Integration

### Backend Connection
```typescript
// services/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Verify signature endpoint
POST /verify-signature
Body: { message: string, signature: string }
Response: { isValid: boolean, signer: string, originalMessage: string }
```

### Error Handling
```typescript
- Network errors
- Validation errors
- Signature verification failures
- All handled with user-friendly toast messages
```

---

## 🧪 Testing (Future Enhancement)
```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
```

---

## 🚀 Build & Deployment

### Production Build
```bash
npm run build
npm run start
```

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID`
   - `NEXT_PUBLIC_DYNAMIC_ORGANIZATION_ID` (if used)
   - `NEXT_PUBLIC_DYNAMIC_API_TOKEN` (if used)
   - `NEXT_PUBLIC_API_URL`
4. Deploy!

### Deploy to Netlify
```bash
npm run build
# Upload .next folder to Netlify
```

### Environment Variables for Production
```env
NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID=prod_dynamic_env_id
NEXT_PUBLIC_DYNAMIC_ORGANIZATION_ID=prod_dynamic_org_id
NEXT_PUBLIC_DYNAMIC_API_TOKEN=prod_dynamic_api_token
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

---

## 🔐 Security Considerations

### What's Stored Locally
- ✅ Wallet address
- ✅ Email (optional)
- ✅ Signed messages
- ✅ Signatures

### What's NOT Stored
- ❌ Private keys (handled by Dynamic.xyz)
- ❌ Passwords
- ❌ Sensitive credentials

### Best Practices
- Always verify signatures on backend
- Never expose private keys
- Use HTTPS in production
- Validate all user inputs
- Implement rate limiting (backend)

---

## 🐛 Troubleshooting

### Dynamic.xyz Connection Issues
```bash
# Check environment variable
echo $NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID

# Verify Dynamic.xyz settings
- Email authentication enabled
- Correct environment (dev/prod)
- Wallet connectors configured
```

### Build Errors
```bash
# Clear cache
rm -rf .next
npm run dev

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Regenerate types
npm run build

# Check tsconfig.json paths
```

---

## 📚 Documentation Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Dynamic.xyz Docs](https://docs.dynamic.xyz)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/docs/installation/next)
- [Ethers.js](https://docs.ethers.org)

---

## 📝 Code Quality

### Linting
```bash
npm run lint
```

### Formatting
```bash
npm run format
```

### Type Checking
```bash
npm run type-check
```

---

## 🎯 Roadmap

### Current Features
- ✅ Email OTP authentication
- ✅ Wallet connect
- ✅ Message signing
- ✅ Signature verification
- ✅ Message history
- ✅ Responsive design

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Authors

- HC-DEVE - Message signer web3 POC

---

## 🙏 Acknowledgments

- Dynamic.xyz for amazing Web3 authentication
- Shadcn for beautiful UI components
- Vercel for Next.js framework
- The Web3 community

---


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
