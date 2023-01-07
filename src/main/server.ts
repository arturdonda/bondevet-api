import { configureApp } from './config/express';

configureApp().then(app => {
	const PORT = 3000;

	app.listen(PORT, () => console.log(`[Server]: ⚡️ Running on port ${PORT}`));
});
