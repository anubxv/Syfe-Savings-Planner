# 💰 Syfe Savings Planner

I have tried to create A modern, lightweight yet user-friendly, goal-based savings planner built with Next.js 15, TypeScript, and Tailwind CSS. We can Track multiple financial goals with real-time currency conversion between INR and USD.

I have followed a step by step approach where I focused on modularity of the application, reusable components anda structured approach in keeping track of code enhancement.

The first milestone was to make sure the application becomes functional with all the elements in place and a decent designing. 

As I got hold on the application, I tried to add some motion and liveliness by enhancing the designing, integrating animation, splash screen, framer motion. 

To preserve the old form, i have saved the earlier code of the functional design as "old-design" branch. 

The live demo has the enhanced design followed, in compliance with the assignment narrative.

## 🚀 Live Demo

[View Live Demo](https://syfeplanner.vercel.app/)

## ✨ Features

### Core Functionality

- **Goal Creation**: Create multiple financial goals with custom names, target amounts, and currencies
- **Multi-Currency Support**: Full support for INR (₹) and USD ($) with live exchange rates
- **Progress Tracking**: Visual progress bars and percentage completion for each goal
- **Contribution Management**: Add dated contributions to track your savings journey
- **Real-time Conversion**: Automatic currency conversion using live exchange rates
- **Dashboard Overview**: Comprehensive statistics showing total targets, savings, and overall progress

### User Experience

- **Responsive Design**: Mobile-first approach that works on all devices
- **Real-time Updates**: Live exchange rate fetching with refresh capability
- **Form Validation**: Comprehensive validation with helpful error messages
- **Loading States**: Smooth loading indicators for all async operations
- **Error Handling**: Graceful error handling with user-friendly messages
- **Local Storage**: Client-side data persistence (no backend required)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks + Local Storage
- **API**: Exchange Rate API for live currency conversion
- **Deployment**: Vercel (recommended)

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd syfe-savings-planner
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables (Optional)

Create a `.env.local` file for custom configuration:

```env
# Exchange Rate API Key (optional - falls back to demo rates)
NEXT_PUBLIC_EXCHANGE_RATE_API_KEY=your_api_key_here
```

The app will work without an API key by using fallback exchange rates.

## 🏗️ Project Structure

```
src/
├── app/                   # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   └── ProgressBar.tsx
│   ├── AddGoalForm.tsx
│   ├── AddContributionModal.tsx
│   ├── Dashboard.tsx
│   ├── ExchangeRateDisplay.tsx
│   ├── GoalCard.tsx
│   └── GoalList.tsx
├── hooks/                 # Custom React hooks
│   └── useGoals.ts
├── types/                 # TypeScript type definitions
│   └── index.ts
└── utils/                 # Utility functions
    ├── currency.ts
    └── storage.ts
```

## 🎯 Key Design Decisions

### Architecture Choices

1. **Client-Side Only**: As of now, No backend is required - all data is stored in localStorage
2. **Component-First**: Modular, reusable components with clear separation of concerns
3. **Custom Hooks**: Centralized state management using React hooks
4. **TypeScript**: Full type safety throughout the application
5. **Tailwind CSS**: Utility-first CSS for rapid, responsive development

### Data Management

- **Local Storage**: Persistent data storage without external dependencies
- **Type Safety**: Comprehensive TypeScript interfaces for all data structures
- **Validation**: Client-side validation for all user inputs
- **Error Handling**: Graceful degradation when external APIs fail

### User Experience

- **Progressive Enhancement**: Works offline after initial load
- **Responsive**: Mobile-first design that scales to desktop
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Performance**: Optimized bundle size and loading states

## 📱 Usage Guide

### Creating Goals

1. Click "Add New Goal"
2. Enter goal name (e.g., "Emergency Fund", "Trip to Japan")
3. Set target amount
4. Choose currency (INR or USD)
5. Click "Create Goal"

### Adding Contributions

1. Find your goal card
2. Click "Add Contribution"
3. Enter amount and date
4. Click "Add Contribution"

### Currency Features

- Exchange rates update automatically
- Click "Refresh Rate" to get latest rates
- All amounts show in both currencies when exchange rate is available

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**

   ```bash
   npx vercel
   ```

2. **Deploy**
   ```bash
   npx vercel --prod
   ```

### Manual Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Deploy the `out` folder** to your hosting provider

## 🔄 Development Workflow

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with Next.js rules
- **Prettier**: Code formatting (recommended)

## 🧪 Testing Strategy

While not implemented in this initial version, recommended testing approach:

- **Unit Tests**: Jest + React Testing Library for components
- **Integration Tests**: Testing user workflows
- **E2E Tests**: Playwright for full application testing

## 🔮 Future Enhancements

Potential improvements for production use:

- **Backend Integration**: User accounts and cloud storage
- **More Currencies**: Support for additional currencies
- **Goal Categories**: Organize goals by categories
- **Savings Analytics**: Charts and trend analysis
- **Goal Sharing**: Share goals with family/friends
- **Reminders**: Contribution reminders and notifications
- **Export/Import**: Data backup and restore functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Exchange rates provided by [ExchangeRate-API](https://exchangerate-api.com/)
- Icons and emojis for enhanced UX
- Next.js team for the excellent framework
- Tailwind CSS for the utility-first CSS framework

---

**This project has been made for submission under Syfe frontend intern Assignment.**
