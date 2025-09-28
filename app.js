import express from "express";

const app = express();
const port = 1500;

app.use(express.json());

const userData = [
  {
    name: "Leanne Graham",
    id: 1,
  },
  {
    name: "Ervin Howell",
    id: 2,
  },
  {
    name: "Clementine Bauch",
    id: 3,
  },
  {
    name: "Patricia Lebsack",
    id: 4,
  },
  {
    name: "Chelsey Dietrich",
    id: 5,
  },
  {
    name: "Mrs. Dennis Schulist",
    id: 6,
  },
  {
    name: "Kurtis Weissnat",
    id: 7,
  },
  {
    name: "Nicholas Runolfsdottir V",
    id: 8,
  },
  {
    name: "Glenna Reichert",
    id: 9,
  },
  {
    name: "Clementina DuBuque",
    id: 10,
  },
];

app.get("/allusers", async (req, res) => {
  res.json({ message: "Hello from India!", users: userData });
});

app.get("/user", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const user = userData.slice(startIndex, endIndex);

  res.json({ message: "Hello from India!", users: user }).status(200);
});

app.post("/adduser", (req, res) => {
  const { name } = req.body;
  userData.push({ name, id: userData.length + 1 });
  res.json({ message: "User added successfully", users: userData }).status(201);
});

app.delete("/deleteuser/:id", (req, res) => {
  const { id } = req.params;
  const index = userData.findIndex((user) => user.id === parseInt(id));
  if (index !== -1) {
    userData.splice(index, 1);
    const newArr = userData.map((user, idx) => ({ ...user, id: idx + 1 }));
    res
      .json({ message: "User deleted successfully", users: newArr })
      .status(200);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.put("/updateuser/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const index = userData.findIndex((user) => user.id === parseInt(id));
  if (index !== -1) {
    userData[index].name = name;
    res
      .json({ message: "User updated successfully", users: userData })
      .status(200);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
