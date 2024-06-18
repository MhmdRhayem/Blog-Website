import express from "express"
import bodyParser from "body-parser";
import { all_articles, deleteArticleById } from "../server.js"
let id = 0;
const router = express.Router()
router.use(bodyParser.urlencoded({extended:true}))

router.get("/new",(req,res)=>{
    res.render("articles/new.ejs");
})

router.get("/:id",(req,res)=>{
    let article = all_articles.find((article)=>{
        return article.id == req.params.id;
    })
    res.render("articles/show.ejs",{article:article});
})

router.get("/edit/:id",(req,res)=>{
    let article = all_articles.find((article)=>{
        return article.id == req.params.id;
    })
    res.render("articles/edit.ejs",{article:article});
})

router.get("/delete/:id", (req, res) => {
    deleteArticleById(req.params.id);
    res.redirect("/");
});


router.post("/",(req,res)=>{
    let article = {
        id : id++,
        title : req.body.title,
        date_created : new Date().toLocaleDateString(),
        description : req.body.description
    }
    all_articles.push(article);
    console.log(all_articles);
    res.redirect("/");
})

router.post("/edit/:id",(req,res)=>{
    let article = all_articles.find((article)=>{
        return article.id == req.params.id;
    })
    article.title = req.body.title;
    article.description = req.body.description;
    res.redirect("/");
})

export { router }