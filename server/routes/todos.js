const express = require("express");
const { check, validationResult } = require("express-validator");
const { Todo } = require("../models");
const router = express.Router();
const auth = require("../middleware/auth");

// @route   GET api/todos
// @desc    Get all todos from user
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        const todos = await Todo.findAll({
            where: { userID: req.user.id },
            order: [["createdAt", "DESC"]],
        });
        res.json(todos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   GET api/todos/filter
// @desc    Get todos by completion status
// @access  Private
router.get("/filter", auth, async (req, res) => {
    try {
        const { status } = req.query;
        const isCompleted = status === "completed";

        const todos = await Todo.findAll({
            where: {
                userID: req.user.id,
                isCompleted,
            },
            order: [["createdAt", "DESC"]],
        });

        res.json(todos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   GET api/todos
// @desc    Create a todos
// @access  Private
router.post(
    "/",
    [auth, [check("title", "Title is required").not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description } = req.body;

        try {
            const newTodo = await Todo.create({
                title,
                description,
                userID: req.user.id,
            });

            res.json(newTodo);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error");
        }
    }
);

// @route   PUT api/todos/:id
// @desc    Update a todo
// @access  Private
router.put("/:id", auth, async (req, res) => {
    const { title, description, isCompleted } = req.body;

    try {
        const todo = await Todo.findOne({
            where: {
                id: req.params.id,
                userID: req.user.id,
            },
        });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        await todo.update({
            title: title || todo.title,
            description:
                description !== undefined ? description : todo.description,
            isCompleted:
                isCompleted !== undefined ? isCompleted : todo.isCompleted,
        });

        res.json(todo);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

// @route   DELETE api/todos/:id
// @desc    Delete a todo
// @acces   Private
router.delete("/:id", auth, async (req, res) => {
    try {
        const todo = await Todo.findOne({
            where: {
                id: req.params.id,
                userID: req.user.id,
            },
        });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        await todo.destroy();

        res.json({ message: "Todo removed" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

// @route   PUT api/todos/:id/toggle
// @desc    Toggle todo completion status
// @access  Private
router.put("/:id/toggle", auth, async (req, res) => {
    try {
        // Find todo
        const todo = await Todo.findOne({
            where: {
                id: req.params.id,
                userID: req.user.id,
            },
        });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        // Toggle completion status
        await todo.update({
            isCompleted: !todo.isCompleted,
        });

        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
