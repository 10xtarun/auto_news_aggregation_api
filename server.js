const app = require("./app")

app.listen(process.env.PORT || 3000, (error) => {
    if (error) throw error
    console.log(`Server is listening on PORT : ${process.env.PORT}`)
})
