const express = require("express");
const resepRoutes = express.Router();
const { prisma } = require("../config/prisma");

// get all resep
resepRoutes.get("/", async (req, res) => {
	const resep = await prisma.resep.findMany();
	res.status(200).send(resep);
});

// get resep by id
resepRoutes.get("/:id", async (req, res) => {
	const resep = await prisma.resep.findUnique({
		where: {
			id: parseInt(req.params.id),
		},
	});
	if (!resep)
		res.status(404).json({
			message: "Resep not found",
		});
	else res.status(200).json(resep);
});

// create resep
resepRoutes.post("/", async (req, res) => {
	const { name, imageUrl, desc } = req.body;
	const newResep= await prisma.resep.create({
		data: {
			name: name,
            imageUrl: imageUrl,
            desc: desc,
		},
	});
	res.status(201).json({
		message: "Resep created",
		data: newResep,
	});
});

// update resep
resepRoutes.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
    const { imageUrl } = req.body;
    const { desc } = req.body;
	const updatedResep = await prisma.resep.update({
		where: { id: parseInt(id) },
		data: { name: name,
                 imageUrl: imageUrl,
                 desc: desc,
         },
	});
	res.status(200).json({
		message: `resep with id: ${id} is updated`,
		data: updatedResep,
	});
});

// delete resep
resepRoutes.delete("/:id", async (req, res) => {
	const { id } = req.params;
	await prisma.resep.delete({
		where: {
			id: parseInt(id),
		},
	});
	res.status(200).json({
		message: `resep with id: ${id} successfully deleted`,
	});
});

module.exports = { resepRoutes };