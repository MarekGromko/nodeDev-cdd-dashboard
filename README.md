# NodeDev CDD Dashboard

## Introduction

Tableau de bord moderne pour la visualisation de données de devises, développé avec React, TypeScript et Vite. Cette application fournit un suivi en temps réel des taux de change, des prédictions et une analyse de la stabilité des monnaies pour l'application

**Repositories:**
  - API: https://github.com/LorsenLamour/nodeDev-cdd-api/
  - Scrapper: https://github.com/MarekGromko/nodeDev-cdd-scrapper

## Fonctionnalités

- **Tableau de bord global** : Vue d'ensemble des taux de change mondiaux
- **Tableau de bord de devises** : Analyse détaillée des devises individuelles
- **Graphiques interactifs** : Visualisations dynamiques des données avec Chart.js
- **Authentification** : Login avec JWT

## Stack

- **Framework Frontend** : React 19.2.0
- **Langage** : TypeScript 5.9.3
- **Outil de build** : Vite 7.2.4
- **Routage** : React Router 7.10.1
- **Styles** : Tailwind CSS 4.1.17 + DaisyUI 5.5.8
- **Client HTTP** : Axios 1.13.2
- **Graphiques** : Chart.js 4.5.1

## Prérequis

- Node.js 20.x ou supérieur
- npm ou yarn

## Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/MarekGromko/nodeDev-cdd-dashboard.git
   cd nodedev-cdd-dashboard
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   
   Copier le fichier d'exemple et mettre à jour les paramètres :
   ```bash
   cp exemple.env .env
   ```
   
   Mettre à jour le fichier `.env` avec votre configuration :
   ```env
   # Route de base de l'API
   VITE_API_BASE_URL=/api
   
   # URL complète du serveur API
   VITE_API_URL=http://localhost:8080
   
   # Port du serveur VITE
   VITE_SERVER_PORT=3000
   
   # Optionnel : Configuration HTTPS
   # VITE_USE_HTTPS=true
   # VITE_HTTPS_KEY_PATH=/chemin/vers/key.pem
   # VITE_HTTPS_CERT_PATH=/chemin/vers/cert.pem
   
   # Optionnel : Désactiver le HMR
   # VITE_NO_HMR=true
   ```

## Exécution de l'application

### Mode développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000` (ou le port spécifié dans votre fichier `.env`).

### Build de production

```bash
npm run build
```

### Prévisualisation du build de production

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Support Docker

Le projet inclut un Dockerfile pour le déploiement conteneurisé :

```bash
# Construire l'image Docker
docker build -t nodedev-cdd-dashboard .

# Exécuter le conteneur
docker run -p 3000:8080 -p 3001:8443 nodedev-cdd-dashboard
```

## Structure du projet

```
├── public/                 # Ressources statiques
├── src/
│   ├── components/        # Composants React
│   │   ├── graphs/       # Composants de graphiques
│   │   ├── GraphError.tsx
│   │   ├── GraphShimmer.tsx
│   │   └── Tabs.tsx
│   ├── data/             # Données statiques (devises, drapeaux, noms)
│   ├── helpers/          # Fonctions utilitaires
│   ├── hooks/            # Hooks React personnalisés
│   ├── pages/            # Composants de pages
│   │   ├── CurrencyDashboard.tsx
│   │   ├── GlobalDashboard.tsx
│   │   ├── Login.tsx
│   │   └── Settings.tsx
│   ├── api.dto.ts        # Objets de transfert de données API
│   ├── api.mock.ts       # Données factices pour l'API
│   ├── api.ts            # Client API
│   ├── App.tsx           # Composant principal
│   ├── Router.tsx        # Configuration du routage
│   └── main.tsx          # Point d'entrée de l'application
├── Dockerfile            # Configuration Docker
├── vite.config.ts        # Configuration Vite
├── tsconfig.json         # Configuration TypeScript
└── package.json          # Dépendances et scripts
```

## Composants principaux

### Tableaux de bord
- **GlobalDashboard** : Affiche les taux de change mondiaux
- **CurrencyDashboard** : Affiche les informations détaillées pour les devises individuelles

### Composants de graphiques
- `CurrencyInfo` : Affichage des informations de devise
- `CurrencyPredictionRates` : Graphiques de prédiction des taux de change
- `CurrencyRates` : Visualisation des taux de change actuels
- `GlobalDeltaRates` : Variations des taux globaux
- `GlobalRates` : Taux globaux généraux
- `GlobalStability` : Indicateurs de stabilité du marché

### Hooks personnalisés
- `useChartEffect` : Gère le cycle de vie et les mises à jour de Chart.js
- `useFetcher` : Gère la récupération des données API

## Authentification

L'application utilise une authentification basée sur JWT. Les utilisateurs doivent se connecter via la route `/login`. Les routes protégées redirigent automatiquement vers la page de connexion si l'utilisateur n'est pas authentifié.

## Intégration API

L'application inclut une intégration API via Axios avec configuration de proxy dans Vite. Les endpoints API sont proxifiés via `/api` vers le serveur backend spécifié dans les variables d'environnement.

Des données factices sont disponibles pour le développement en utilisant Faker.js.

## Informations projet
Auteurs : 
  - Marek Gromko 
  - Lorsen  Valri Deyfker Lamour 
  - Rachel Silencieux 
  - Dusly Nestor 

Professeur : Sara Boumehraz
Cours : 420‑514‑MV – Collecte et interprétation de données