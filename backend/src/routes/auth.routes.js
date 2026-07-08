import express from 'express';
import {getUserInfo} from '../services/geoguessrClient.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        // on récupert le cookie ncfa depuis le front
        const { ncfa } = req.body;
        // On appelle la fonction pour récup les infos de l'user
        const user = await getUserInfo(ncfa);

        // on stocke les infos dans la session
        req.session.ncfa = ncfa;
        req.session.user = user;
        res.json({ user });
    } catch {
        res.status(401).json({ error: 'Cookie invalide' });
    }
});

export default router;