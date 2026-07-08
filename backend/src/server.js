import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { config } from './config.js';
import authRoutes from './routes/auth.routes.js';
import dailyRoutes from './routes/daily.routes.js';

// Initalisation d'express
const app = express();

// Config de CORS pour autoriser la communication entre le frontend et le backend
app.use(cors({
    origin: config.frontendOrigin,
    credentials: true
}))

// Middleware pour parser le body des requetes dont le Content-Type est application/json et le rend disponible dans req.body
app.use(express.json());

// Configuration de la session pour gérer les sessions utilisateur
app.use(session({
    secret: config.sessionSecret, //crypte le cookie de session
    resave: false, // ne réécrit pas la session si elle n'a pas changée
    saveUninitialized: false, // ne crée pas de session pour les utilisateurs non connectés
    cookie: {
        // Config du cookie (inaccessible en JS, et envoyé uniquement pour les requetes du même site)
        httpOnly: true,
        sameSite: 'lax',
    }
}))

// Check si le serveur répond
app.get('/api/health', (req, res) => {
    res.json({status: 'ok'});
});

// Routes de l'API
app.use('/api/auth', authRoutes);
app.use('/api/daily', dailyRoutes);

// Démarrage du serveur
app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
});

