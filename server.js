// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAni4c3ZUfUJ1WkAmEsajOzEJlUEjF459E",
  authDomain: "todolist-cf11d.firebaseapp.com",
  projectId: "todolist-cf11d",
  appId: "1:902611403801:web:2cd588a65bedba1b431688"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

// Add task to Firestore
function addTask() {
  const task = taskInput.value.trim();
  if (!task) return;

  db.collection("todos").add({
    task,
    completed: false,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  taskInput.value = "";
}

// Toggle task completed
function toggleTask(id, currentStatus) {
  db.collection("todos").doc(id).update({
    completed: !currentStatus
  });
}

// Delete task
function deleteTask(id) {
  db.collection("todos").doc(id).delete();
}

// Load tasks from Firestore
function loadTasks() {
  db.collection("todos").orderBy("timestamp", "desc").onSnapshot(snapshot => {
    taskList.innerHTML = "";
    snapshot.forEach(doc => {
      const task = doc.data();
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";

      li.innerHTML = `
        <span onclick="toggleTask('${doc.id}', ${task.completed})">${task.task}</span>
        <button onclick="deleteTask('${doc.id}')">Delete</button>
      `;

      taskList.appendChild(li);
    });
  });
}

loadTasks();
