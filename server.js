import express from "express"
import { dirname } from "path"
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import { router as articleRouter } from "./routes/articles.js" 

let all_articles = [{
    id : 1000,
    title:"Article 1",
    date_created: new Date().toLocaleDateString(),
    description:"This is the first article"
}];


const app = express();
const port = 3000;


app.use("/articles",articleRouter)
app.use(express.static("public"))


app.get("/",(req,res)=>{
    res.render("articles/index.ejs",{all_articles:all_articles});
});

app.get("/articles/delete/:id",(req,res)=>{
    all_articles = all_articles.filter(article => article.id != req.params.id);
    res.redirect("/");
})

app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
});

function deleteArticleById(id) {
    all_articles = all_articles.filter(article => article.id != id);
}

export { all_articles,deleteArticleById}