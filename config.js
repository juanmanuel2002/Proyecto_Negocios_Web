import dotenv from 'dotenv';

dotenv.config();

const config = {
    firebase: {
        apiKey: process.env.REACT_APP_apiKey,
        authDomain: process.env.REACT_APP_authDomain,
        databaseURL: process.env.REACT_APP_databaseURL,
        projectId: process.env.REACT_APP_projectId,
        storageBucket: process.env.REACT_APP_storageBucket,
        messagingSenderId: process.env.REACT_APP_messagingSenderId,
    },
    paypal: {
        paypalClientId: process.env.PAYPAL_CLIENT_ID,
    },
    twitter:{
        key: process.env.X_KEY,
        secret: process.env.X_SECRET,
        bearer: process.env.X_BEARER,
        id: process.env.X_ID,
        token: process.env.X_TOKEN,
        tokenSecret: process.env.X_TOKEN_SECRET,
    }
};

export default config;