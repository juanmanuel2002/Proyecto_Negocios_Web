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
};

export default config;