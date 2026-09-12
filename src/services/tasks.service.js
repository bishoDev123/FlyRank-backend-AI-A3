const taskRepository = require('../repositories/tasks.repositories');
const { validateTitle, validateTask, validateId, validateDone } = require('../util/validate');


function getAllTasks({ search, status } = {}) {
    const normalizedStatus = status !== undefined
        ? (status === "done" ? 1 : 0)
        : undefined;

    return taskRepository.findAll({ search, status: normalizedStatus });
}

function getTaskById(id) {
    validateId(Number(id));

    const task = taskRepository.findById(id);

    validateTask(task, id);

    return task;
}

function createTask(title) {
    const trimmed = validateTitle(title);

    const id = taskRepository.insert(trimmed);
    return taskRepository.findById(id);
}

function updateTask(title, done, id) {
    validateTitle(title);
    validateId(Number(id));
    validateDone(done);

    const task = taskRepository.findById(id);
    validateTask(task, id);

    taskRepository.update(id, title, done);
    return {...task, title, done};
}

function deleteTask(id) {
    validateId(Number(id));

    const task = taskRepository.findById(id);
    validateTask(task, id);

    taskRepository.remove(id);
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};