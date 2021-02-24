import { App } from './App';

// Start server
const PORT: number = parseInt(process.env.PORT) || 3000;
App.listen(PORT, () => {
    console.log('Server is running at', PORT);
});

