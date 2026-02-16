const express = require("express");
const userRoutes = require("./routes/user.routes");
const { sequelize } = require("./config/db");

const app = express();

app.use(express.json());

app.use("/userManagement", userRoutes);

async function start() {
	try {
		await sequelize.authenticate();
		console.log("Database connected");
		app.listen(3000, () => console.log("Server running on port 3000"));
	} catch (error) {
		console.error("Database connection failed", error);
		process.exit(1);
	}
}

start();