import process from 'process';

const parseEnv = () => {
    const params = process.env;
    const keys = Object.keys(params).filter(key => key.includes('RSS_'));

    keys.forEach(key => console.log(`${key}=${params[key]}`));
};

parseEnv();