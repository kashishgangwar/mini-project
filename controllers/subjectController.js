const Subject = require("../models/Subject")

exports.addSubject = async (req,res)=>{
    try{
        const {name,priority} = req.body

        const subject = new Subject({
            name,
            priority,
            userId:req.user.id
        })

        await subject.save()
        res.json(subject)

    }catch(err){
        res.status(500).json({error:err.message})
    }
}

exports.getSubjects = async (req,res)=>{
    const subjects = await Subject.find({userId:req.user.id})
    res.json(subjects)
}

exports.deleteSubject = async (req,res)=>{
    try{
        const id = req.params.id

        await Subject.findByIdAndDelete(id)

        res.json({message:"Deleted successfully"})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}