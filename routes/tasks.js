var express=require('express');
var router=express.Router();
var mongojs=require('mongojs');
var db=mongojs('mongodb://viping7:highveld7@ds127962.mlab.com:27962/vipintasklist',['tasks']);
router.get('/tasks',function(req,res){
    db.tasks.find(function(err,tasks){
        if(err){
            res.send("Error")
        }
        res.json(tasks);
        
    })
});

//Single Data

router.get('/task/:id',function(req,res){
    db.tasks.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,task){
        if(err){
            res.send("Error")
        }
        res.json(task);
        
    })
})


//posting data


router.post('/tasks',function(req,res){
  var task=req.body;
  if(!task.title){
      res.status(400);
      res.json({
          "error":"Invalid Data"
      })
  }
else{
    db.tasks.save(task,function(err,task){
        if(err){
            res.send("error");
        }
        else{
            res.json(task);
        }
    })
}    
});

//Update task


//Deleting Tasks
router.put('/task/:id',function(req,res){
    var task=req.body;
    var updateTask={};
    if(task.isDone){
        updateTask.isDone=task.isDone;
    }
    if(task.title){
        updateTask.title=task.title;
    }
    if(updateTask==''){
        res.status(400);
    }
    else{
    db.tasks.update({_id:mongojs.ObjectId(req.params.id)},updateTask,{},function(err,task){
        if(err){
            res.send("Error")
        }
        res.json(task);
        
    })
    }
})

//Deleting Tasks
router.delete('/task/:id',function(req,res){
    db.tasks.remove({_id:mongojs.ObjectId(req.params.id)},function(err,task){
        if(err){
            res.send("Error")
        }
        res.json(task);
        
    })
})

module.exports=router;