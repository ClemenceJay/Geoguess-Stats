import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [ncfa, setNcfa] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault(); //On empêche le rechargement de la page
        setError(null);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ ncfa }),
            });
            if (!res.ok) throw new Error('Cookie invalide');
            navigate('/dashboard');
        } catch (err){
            setError(err.message);
        }
    }

    return (
        <div>
            <h1>Geoguess-Stat</h1>
            <form onSubmit={handleSubmit}>
                <label> Cookie _ncfa
                    <input
                        type="text"
                        value={ncfa}
                        onChange={(e) => setNcfa(e.target.value)}
                    />
                </label>
                <button type="submit">Se connecter</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}