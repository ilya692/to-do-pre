const items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];


const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");


function loadTasks() {
	const storedTasks = localStorage.getItem('tasks');
	if (storedTasks) {
		return JSON.parse(storedTasks);
	}
	return items;
}


function saveTasks(taskList) {
	localStorage.setItem('tasks', JSON.stringify(taskList));
}


function getTasksFromDOM() {
  	const taskElements = document.querySelectorAll('.to-do__item-text');
  	const tasksArray = [];
  	taskElements.forEach(function(element) {
    	tasksArray.push(element.innerHTML);
  	});
  	return tasksArray;
}


function createItem(taskContent) {
	const itemTemplate = document.getElementById("to-do__item-template");
	const itemClone = itemTemplate.content.querySelector(".to-do__item").cloneNode(true);
	const taskTextElement = itemClone.querySelector(".to-do__item-text");
	const deleteBtn = itemClone.querySelector(".to-do__item-button_type_delete");
	const duplicateBtn = itemClone.querySelector(".to-do__item-button_type_duplicate");
	const editBtn = itemClone.querySelector(".to-do__item-button_type_edit");
	taskTextElement.innerHTML = taskContent;

	deleteBtn.addEventListener('click', function(){
		itemClone.remove();
		const currentTasks = getTasksFromDOM();
		saveTasks(currentTasks);
	});

	duplicateBtn.addEventListener('click', function() {
		const duplicatedContent = taskTextElement.innerHTML;
		const duplicatedItem = createItem(duplicatedContent);
		listElement.prepend(duplicatedItem);
		const currentTasks = getTasksFromDOM();
		saveTasks(currentTasks);
	});

	editBtn.addEventListener('click', function() {
		taskTextElement.setAttribute('contenteditable', 'true');
		taskTextElement.focus();
	});

	taskTextElement.addEventListener('blur', function() {
		taskTextElement.setAttribute('contenteditable', 'false');
		const currentTasks = getTasksFromDOM();
		saveTasks(currentTasks);
	});
	return itemClone;
}


formElement.addEventListener('submit', function(event) {
	event.preventDefault();
	const newTaskText = inputElement.value.trim();
	if (newTaskText) {
		const newTaskElement = createItem(newTaskText);
		listElement.prepend(newTaskElement);
		const currentTasks = getTasksFromDOM();
		saveTasks(currentTasks);
		inputElement.value = '';}
});


	const initialTasks = loadTasks();
	initialTasks.forEach(function(task){
		const taskElement = createItem(task);
		listElement.append(taskElement);
});
