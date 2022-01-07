// 导入数据库操作模块
const db = require('../db/index')
// 获取文章分类列表的处理函数
exports.getArtCates = (req,res) => {
  const sql = `select * from ev_article_cate where is_delete=0 order by id asc`
  db.query(sql,(err,results)=>{
    if(err) return res.cc(err)
    res.send({
      status:0,
      message:'获取文章数据分类成功',
      data:results
    })
  })
}
// 新增文章分类
exports.addArticleCates = (req,res) =>{
  const sql = `select * from ev_article_cate where name = ? or alias = ?`
  db.query(sql,[req.body.name,req.body.alias],(err,results) =>{
    if(err) return res.cc(err)
    // 判断数据是否被占用
    if(results.length ===2 ) return res.cc('分类名称与分类别名被占用,请更换')
    if(results.length ===1 &&  results[0].name === req.body.name &&results[0].alias === req.body.alias) 
    return res.cc('分类名称与分类别名都被占用,请更换')
    if(results.length ===1 &&  results[0].name === req.body.name) return res.cc('分类名称被占用')
    if(results.length ===1 &&  results[0].alias === req.body.alias ) return res.cc('分类别名被占用')
    // 都可用
    // 定义插入文章分类的语句
    const sql = `insert into ev_article_cate set ?`
    // 执行插入文章分类的SQL语句
    db.query(sql,req.body,(err,results) =>{
      if(err) return res.cc(err)
      if(results.affectedRows !==1) return res.cc('新增文章分类失败')
      res.cc('新增文章分类成功')
    })
  })
}
// 删除对应ID文章分类
exports.deleteCateById = (req,res) =>{
  const sql =`update ev_article_cate set is_delete = 1 where id =? `
  db.query(sql,req.params.id,(err,results)=>{
    if(err) return res.cc(err)
    if(results.affectedRows !==1) return res.cc('删除失败')
    return res.cc('删除文章成功',0)
  })
}
// 获取对应ID的文章分类
exports.getArtCateById =(req,res) =>{
  const sql = `select * from ev_article_cate where id =?`
  db.query(sql,req.params.id,(err,results) =>{
    if(err) return res.cc(err)
    if(results.length !==1) return res.cc('获取文章分类数据失败')
    res.send({
      status:0,
      message:'获取文章分类成功',
      data:results
    })
  })
}
// 根据ID更新文章分类
exports.updateCateById = (req,res) =>{
  // 查重语句
  const sql = `select * from ev_article_cate where id<>? and (name = ? or alias =?)`
  db.query(sql,[req.body.Id,req.body.name,req.body.alias],(err,results)=>{
    if(err) return res.cc(err)
    if(results.length ===2 ) return res.cc('分类名称与别名被占用，请更换后重试')
    if(results.length ===1 &&results[0].name===req.body.name &&results[0].alias === req.body.alias)
    return res.cc('分类名称与别名被占用，请更换后重试')
    if(results.length ===1 &&results[0].name===req.body.name) return res.cc('分类名称被占用，请更换后重试')
    if(results.length ===1 &&results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试')
    // 定义更新文章分类的sql语句
    // 执行更新文章分类的sql语句
    const sql = `update ev_article_cate set ? where Id=?`
    db.query(sql,[req.body,req.body.Id],(err,results) =>{
      if(err) return res.cc(err)
      if(results.affectedRows!==1) return res.cc('更新文章分类失败')
      res.cc('更新文章分类成功',0)
    })
  }
  )
 
}


