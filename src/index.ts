import express, { json } from "express"
import companiesRoutes from "./routes/companies"
import employeesRoutes from "./routes/employees"

const app = express()

app.use(json())

app.use("/companies", companiesRoutes)
app.use("/employees", employeesRoutes)

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on PORT ${process.env.PORT || 3001}`)
})
