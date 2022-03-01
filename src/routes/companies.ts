import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

router.get("/", async (request, response) => {
  const companies = await prisma.company.findMany()
  return response.json(companies)
})

router.post("/", async (request, response) => {
  const { cnpj, name } = request.body

  try {
    const createdCompany = await prisma.company.create({
      data: { cnpj, name },
    })

    return response.json(createdCompany)
  } catch (error) {
    response.json({
      error: true,
      message: "Duplicate CNPJ",
    })

    return response.status(400)
  }
})

router.put("/:cnpj", async (request, response) => {
  const { cnpj } = request.params
  const { name } = request.body

  const updatedCompany = await prisma.company.update({
    where: { cnpj },
    data: { name },
  })

  return response.json(updatedCompany)
})

router.delete("/:cnpj", async (request, response) => {
  const { cnpj } = request.params
  const deletedCompany = await prisma.company.delete({
    where: { cnpj },
  })

  return response.json(deletedCompany)
})

export default router
