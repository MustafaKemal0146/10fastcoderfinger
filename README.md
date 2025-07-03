# 🚀 TenFastCoderFinger

**Master Your Coding Speed with Style**

A modern, feature-rich typing practice application specifically designed for programmers. Improve your coding speed, accuracy, and consistency with real code snippets in multiple programming languages.

![TenFastCoderFinger](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=400&fit=crop&crop=center)

## ✨ Features

### 🎯 Core Typing Practice
- **Real Code Snippets**: Practice with actual code in C#, Python, and more
- **Multiple Difficulty Levels**: Easy, Medium, and Hard challenges
- **Live Statistics**: Real-time WPM, accuracy, and error tracking
- **Smart Error Detection**: Visual feedback for mistakes with position tracking

### 🏆 Gamification & Progress
- **Achievement System**: Unlock badges for speed, accuracy, and consistency milestones
- **XP & Leveling**: Gain experience points and level up your profile
- **Daily Streaks**: Maintain consistency with streak tracking
- **Global Leaderboards**: Compete with typists worldwide

### 📊 Advanced Analytics
- **Detailed Statistics**: Comprehensive performance analysis with charts
- **Progress Tracking**: Weekly, monthly, and yearly improvement trends
- **Language-Specific Stats**: Performance breakdown by programming language
- **Consistency Metrics**: Track your typing consistency over time

### 🎮 Multiplayer & Social
- **Real-time Multiplayer**: Race against friends and other players
- **Custom Rooms**: Create private typing competitions
- **Spectator Mode**: Watch and learn from top performers
- **Social Profiles**: Showcase your achievements and progress

### 📚 Learning Hub
- **Interactive Lessons**: Step-by-step programming tutorials
- **Practice Exercises**: Hands-on coding challenges
- **Progress Tracking**: Monitor your learning journey
- **Multiple Categories**: From basics to advanced concepts

### 🎨 Customization
- **6 Beautiful Themes**: Dark, Light, VS Code, Sublime, Atom, Monokai
- **Font Customization**: Choose from popular coding fonts
- **Sound Effects**: Immersive audio feedback (optional)
- **Responsive Design**: Perfect experience on all devices

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Backend**: Supabase
- **Database**: PostgreSQL
- **Authentication**: Supabase Auth
- **Build Tool**: Vite
- **Deployment**: Netlify Ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for backend features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mustafakemal0146/10fastcoderfinger.git
   cd 10fastcoderfinger
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── achievements/   # Achievement system
│   ├── learning/       # Learning hub components
│   ├── multiplayer/    # Multiplayer features
│   └── stats/          # Statistics and charts
├── contexts/           # React Context providers
├── data/              # Static data and code snippets
├── hooks/             # Custom React hooks
├── lib/               # External library configurations
├── pages/             # Main application pages
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── styles/            # Global styles
```

## 🎮 How to Play

1. **Choose Your Challenge**
   - Select programming language (C#, Python, etc.)
   - Pick difficulty level (Easy, Medium, Hard)

2. **Start Typing**
   - Type the displayed code exactly as shown
   - Watch your live statistics update
   - Maintain accuracy for better scores

3. **Track Progress**
   - View detailed statistics after each session
   - Monitor your improvement over time
   - Unlock achievements and level up

4. **Compete & Learn**
   - Join multiplayer rooms for real-time competition
   - Explore the learning hub for tutorials
   - Climb the global leaderboards

## 🏗️ Database Schema

The application uses Supabase with the following main tables:

- **users**: User profiles and statistics
- **code_snippets**: Programming challenges
- **typing_sessions**: Individual practice sessions
- **achievements**: Achievement definitions
- **user_achievements**: User achievement progress
- **multiplayer_rooms**: Real-time game rooms

## 🎨 Themes

Choose from 6 carefully crafted themes:

- **Dark** (Default): Modern dark theme with blue accents
- **Light**: Clean light theme for daytime use
- **VS Code**: Familiar Visual Studio Code styling
- **Sublime**: Elegant Sublime Text inspired theme
- **Atom**: GitHub's Atom editor theme
- **Monokai**: Classic Monokai color scheme

## 🔧 Configuration

### Sound Settings
- Enable/disable keystroke sounds
- Background music toggle
- Volume controls

### Display Options
- Font family selection
- Font size adjustment
- Live statistics toggle

### Gameplay
- Auto-save progress
- Notification preferences
- Language preferences

## 📈 Performance Metrics

Track your improvement with detailed metrics:

- **Words Per Minute (WPM)**: Standard typing speed measurement
- **Accuracy**: Percentage of correctly typed characters
- **Consistency**: Stability of typing speed over time
- **Error Rate**: Frequency and types of mistakes
- **Progress Trends**: Historical performance data

## 🏆 Achievement System

Unlock achievements across multiple categories:

- **Speed Achievements**: Reach WPM milestones
- **Accuracy Achievements**: Perfect typing sessions
- **Consistency Achievements**: Maintain performance
- **Streak Achievements**: Daily practice rewards
- **Special Achievements**: Unique challenges

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style

- Use TypeScript for type safety
- Follow React best practices
- Maintain component modularity
- Write descriptive commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Code Snippets**: Curated from popular programming tutorials
- **Design Inspiration**: Modern coding editors and typing applications
- **Icons**: Lucide React icon library
- **Fonts**: JetBrains Mono, Fira Code, and other coding fonts

## 📞 Support

- **Documentation**: [Wiki](https://github.com/mustafakemal0146/tenfastcoderfinger/wiki)
- **Issues**: [GitHub Issues](https://github.com/mustafakemal0146/tenfastcoderfinger/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mustafakemal0146/tenfastcoderfinger/discussions)
- **Email**: ismustafakemal0146@gmail.com

## 🗺️ Roadmap

### Upcoming Features
- [ ] Mobile app (React Native)
- [ ] VS Code extension
- [ ] Custom code snippet uploads
- [ ] Team competitions
- [ ] Advanced AI analysis
- [ ] Voice commands
- [ ] Offline mode
- [ ] More programming languages

### Version History
- **v1.0.0**: Initial release with core features
- **v1.1.0**: Multiplayer and achievements
- **v1.2.0**: Learning hub and advanced stats
- **v1.3.0**: Themes and customization

---

<div align="center">

**Made with ❤️ for the coding community**

• [Demo](https://astounding-manatee-83545f.netlify.app/)  •

</div>
