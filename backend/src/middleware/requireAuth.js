// Middleware: s'execute avant les route pour checker si user est bien connecté
export function requireAuth(req, res, next) {
    if (!req.session.ncfa) {
        return res.status(401).json({ error: "Non authentifié" });
    }
    // Fonction Express, permet de dire de passer à la route suivante
    next()
}