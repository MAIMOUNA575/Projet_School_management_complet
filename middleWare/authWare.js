// import jwt from "jsonwebtoken";

// function authWare(req, res, next) {

//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//         return res.status(401).json({
//             message: "Token manquant"
//         });
//     }

//     const token = authHeader.replace("Bearer ", "");

//     try {

//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_SECRET
//         );

//         req.user = decoded;

//         next();

//     } catch (error) {

//         return res.status(401).json({
//             message: "Token invalide"
//         });

//     }

// }

// export { authWare };













import jwt from "jsonwebtoken";

function auth(req, res, next) {

    // Récupérer le token
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Accès refusé. Aucun token fourni."
        });
    }

    // Vérifier le format : Bearer TOKEN
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Token invalide."
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Stocker les informations de l'utilisateur
        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Token invalide ou expiré."
        });

    }

}

export { auth };