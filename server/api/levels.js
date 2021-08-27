const router = require('express').Router();
const {
	models: { Level, Test, User },
} = require('../db');
const { requireToken, userHasLevel } = require('./gatekeepingMiddleware');
module.exports = router;

router.get('/list', requireToken, async (req, res, next) => {
	try {
		const levels = await Level.findAll({
			include: { model: User, where: { id: req.user.id }, required: false },
			order: [['id', 'ASC']],
		});
		res.send(levels);
	} catch (err) {
		next(err);
	}
});

router.get('/complete/:id', requireToken, async (req, res, next) => {
	try {
		const nextLvl = await req.user.hasLevel(parseInt(req.params.id));
		console.log('this is next level', nextLvl);
		if (!nextLvl) {
			await req.user.addLevel(parseInt(req.params.id));
		}
		const level = await Level.findByPk(parseInt(req.params.id) + 1, {
			include: Test,
		});
		if (level) {
			res.json(level);
		}
	} catch (err) {
		next(err);
	}
});

router.get('/:id', requireToken, userHasLevel, async (req, res, next) => {
	try {
		const level = await Level.findByPk(req.params.id, { include: Test });
		res.json(level);
	} catch (err) {
		next(err);
	}
});
