import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

router.get("/", async (request, response) => {
  const employees = await prisma.employee.findMany()

  response.json(employees)
  return response.status(200)
})

router.post("/", async (request, response) => {
  const { cpf, name, birthYear, companyCnpj } = request.body
  const newEmployee = await prisma.employee.create({
    data: { cpf, name, birthYear, companyCnpj },
    select: {
      cpf: true,
      name: true,
      birthYear: true,
      Company: true,
    },
  })

  response.json(newEmployee)
  return response.status(200)
})

export default router
