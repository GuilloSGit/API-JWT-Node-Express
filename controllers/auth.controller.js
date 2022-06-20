export const register = (req, res) => {
    console.log('req.body', req.body);
    res.json({ 'register': 'register' });
};

export const login = (req, res) => {
    res.json({ 'login': 'login' });
};
