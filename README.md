# 🏴‍☠️ Chasse au Trésor - Jeu Web Multijoueur

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-purple.svg)](https://getbootstrap.com/)


Un jeu de chasse au trésor interactif développé en JavaScript vanilla avec une interface moderne et responsive.

## 🎯 Aperçu du Projet

Ce projet est un jeu web multijoueur où les participants recherchent des pièces sur un plateau de jeu, utilisent des stratégies et collaborent en équipes pour accumuler des trésors.

![Demo](assets/demo-screenshot.png)

## ✨ Fonctionnalités Principales

### 🎮 Gameplay
- **🔍 Recherche de pièces** : Système de coordonnées pour localiser des trésors
- **🕵️ Espionnage** : Mécanisme pour obtenir des informations sur les équipes adverses
- **👥 Gestion d'équipe** : Formation et suivi des groupes de joueurs
- **📱 Validation QR Code** : Intégration de codes QR pour des actions spéciales
- **⏱️ Système de temps d'attente** : Mécaniques de jeu équilibrées
- **💰 Banque de pièces** : Suivi en temps réel des trésors par équipe

### 🔧 Fonctionnalités Techniques
- **📱 Interface responsive** : Compatible desktop et mobile
- **🌐 API REST** : Communication avec serveur via fetch API
- **💾 Gestion d'état** : Stockage local des données utilisateur
- **📊 Tableaux dynamiques** : Affichage en temps réel des statistiques
- **❌ Gestion d'erreurs** : Messages contextuels avec feedback visuel

## 🛠️ Technologies Utilisées

### Frontend
```
HTML5     • Structure sémantique moderne
CSS3      • Design avec Grid Layout et Flexbox
JavaScript• ES6+ avec async/await
Bootstrap • Composants UI responsive v5.3.3
```

### API & Communication
```
REST API  • Communication serveur asynchrone
JSON      • Format d'échange de données
Fetch API • Requêtes HTTP natives
```

### Outils de Développement
```
Google Fonts • Police "Pirata One" thématique
LocalStorage • Persistance des données utilisateur
SVG Icons    • Icônes vectorielles intégrées
```

## 🚀 Installation et Démarrage

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Connexion Internet (pour l'API et les polices)

### Installation Rapide
```bash
# Cloner le repository
git clone https://github.com/votre-username/chasse-au-tresor.git

# Naviguer dans le dossier
cd chasse-au-tresor

# Option 1: Ouvrir directement
open index.html

# Option 2: Serveur local (recommandé)
python -m http.server 8000
# ou avec Node.js
npx serve .
# ou avec PHP
php -S localhost:8000
```

### Première Utilisation
1. **Ouvrir** `index.html` dans votre navigateur
2. **Entrer** votre UID utilisateur unique
3. **Valider** votre équipe
4. **Commencer** la chasse au trésor !

## 📁 Structure du Projet

```
chasse-au-tresor/
│
├── 📄 index.html           # Page principale du jeu
├── 🎨 style.css            # Styles personnalisés et layout
├── ⚡ script.js            # Logique JavaScript complète
├── 📁 assets/              # Ressources multimédia
│   ├── 🖼️ wallpaperflare.com_wallpaper.jpg
│   ├── 🖼️ img_or.webp
│   └── 🖼️ img_qrcode.webp
├── 📚 README.md            # Documentation du projet
└── 📜 LICENSE              # Licence MIT
```

## 🎨 Design et UX

### Thème Visuel
- **🏴‍☠️ Esthétique pirate** : Police "Pirata One" authentique
- **🖼️ Background immersif** : Wallpaper thématique fixe
- **🎯 Interface claire** : Layout organisé en zones fonctionnelles
- **💀 Feedback visuel** : Messages d'erreur avec icônes thématiques

### Responsive Design
- **📱 Mobile First** : Optimisé pour tous les écrans
- **⚡ Performance** : Chargement rapide et fluide
- **♿ Accessibilité** : Contraste et navigation au clavier

## 🔗 API Endpoints

Le jeu communique avec l'API `https://pixel-api.codenestedu.fr` :

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/prendrePiece` | `POST` | Récupérer une pièce à des coordonnées |
| `/chercherPiece` | `POST` | Localiser des pièces avec le sonar |
| `/payerEspion` | `POST` | Obtenir des informations d'espionnage |
| `/piecesEnBanque` | `GET` | Consulter les banques d'équipes |
| `/temps-attente` | `GET` | Vérifier les délais d'action |

### Format des Données
```javascript
// Exemple de requête
{
  "uid": "player123",
  "lig": 42,
  "col": 24
}

// Exemple de réponse
{
  "piecePresente": true,
  "valeurPiece": 5
}
```

## 🎯 Fonctionnalités Avancées

### 💾 Gestion d'État Persistante
```javascript
// Sauvegarde automatique de l'UID
localStorage.setItem('uid', userUID);

// Gestion des sessions de jeu
const savedUID = localStorage.getItem('uid');
```

### ⏱️ Interface Temps Réel
- **Compte à rebours automatique** avec `setInterval`
- **Mise à jour dynamique** des tableaux
- **Messages contextuels** selon les actions

### 🛡️ Sécurité et Validation
- **Validation des coordonnées** (0-99)
- **Gestion d'erreurs HTTP** complète
- **Limitation par temps d'attente** côté serveur

## 🔧 Développement

### Architecture du Code
```javascript
// Structure modulaire
const functions = {
  prendrePiece: () => { /* logique */ },
  payerEspion: () => { /* logique */ },
  tempAttente: () => { /* logique */ }
};

// Gestion d'erreurs centralisée
.catch(error => {
  console.error('Erreur:', error);
  // Feedback utilisateur approprié
});
```

### Bonnes Pratiques Implémentées
- ✅ **Code ES6+** avec arrow functions et async/await
- ✅ **Gestion d'erreurs** exhaustive avec try/catch
- ✅ **Interface accessible** avec ARIA labels
- ✅ **Performance optimisée** sans frameworks lourds
- ✅ **Code commenté** et documenté

### Débogage
```javascript
// Logs détaillés pour le développement
console.log("UIDjoueur:", UIDjoueur);
console.log("Données envoyées:", formatedData);
console.log("Réponse API:", data);
```

## 🎮 Guide d'Utilisation

### Actions de Base
1. **Prendre une pièce** : Entrer coordonnées + clic "Prendre"
2. **Chercher** : Utiliser le sonar pour localiser
3. **Espionner** : Payer pour obtenir des infos (1 fois/partie)
4. **Voler** : Récupérer des pièces d'autres joueurs

### Stratégies Avancées
- **Coordination d'équipe** : Partager les informations
- **Gestion du temps** : Optimiser les actions selon les délais
- **Espionnage tactique** : Utiliser l'espion au bon moment

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. **Fork** le projet
2. **Créer** une branche feature : `git checkout -b feature/NewFeature`
3. **Commit** les changements : `git commit -m 'Add: Nouvelle fonctionnalité'`
4. **Push** la branche : `git push origin feature/NewFeature`
5. **Ouvrir** une Pull Request

### Code de Conduite
- Code propre et commenté
- Tests des nouvelles fonctionnalités
- Documentation mise à jour

## 📊 Métriques du Projet

- **Langages** : 100% JavaScript vanilla
- **Dépendances** : Bootstrap uniquement
- **Taille** : < 50KB total
- **Compatibilité** : Navigateurs modernes
- **Performance** : Chargement < 2s

## 🐛 Issues Connues

- [ ] Améliorer la gestion hors-ligne
- [ ] Ajouter des tests automatisés
- [ ] Optimiser pour IE11 (si nécessaire)

## 📈 Roadmap

### Version 2.0
- [ ] **Multijoueur temps réel** avec WebSockets
- [ ] **Chat intégré** pour les équipes
- [ ] **Système de niveaux** et progression
- [ ] **Mode spectateur** pour observer les parties

### Version 1.5
- [ ] **Sons et musique** d'ambiance
- [ ] **Animations** CSS avancées
- [ ] **Mode sombre** pour l'interface
- [ ] **Statistiques** détaillées par joueur

## 📝 Licence

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour plus de détails.

```
MIT License - Utilisation libre pour projets personnels et commerciaux
```

## 👨‍💻 Auteur

**[Votre Nom]**
- 🐙 **GitHub** : [@votre-username](https://github.com/votre-username)

## 🙏 Remerciements

- **Bootstrap Team** pour les composants UI exceptionnels
- **Google Fonts** pour la police "Pirata One" parfaite
- **API Provider** pour l'infrastructure serveur robuste
- **Communauté GitHub** pour l'inspiration et les retours

---

## 🌟 Support

Si ce projet vous a aidé, n'hésitez pas à :
- ⭐ **Mettre une étoile** au repository
- 🐛 **Signaler des bugs** via les Issues
- 💡 **Proposer des améliorations**
- 🔄 **Partager** avec d'autres développeurs

---

**Fait avec ❤️ en JavaScript**