const Subject = require("../models/Subject")

exports.generatePlan = async (req,res)=>{
    try{

        const { days, hoursPerDay } = req.body

        // user ke subjects nikaal
        const subjects = await Subject.find({ userId: req.user.id })

        // agar subject hi nahi hai
        if(!subjects || subjects.length === 0){
            return res.json([])
        }

        // 🔥 PRIORITY WEIGHT SYSTEM
        let weightedSubjects = []

        subjects.forEach(sub => {
            if(sub.priority === "high"){
                weightedSubjects.push(sub, sub, sub)   // high = 3x
            }
            else if(sub.priority === "medium"){
                weightedSubjects.push(sub, sub)        // medium = 2x
            }
            else{
                weightedSubjects.push(sub)             // low = 1x
            }
        })

        let plan = []
        let index = 0

        let startDate = new Date()

        for(let i = 0; i < Number(days); i++){

            let currentDate = new Date()
            currentDate.setDate(startDate.getDate() + i)

            let schedule = []
            let hour = 9   // start time 9 AM

            for(let j = 0; j < Number(hoursPerDay); j++){

                const subject = weightedSubjects[index % weightedSubjects.length]

                // TIME FORMAT FIX (09:00 - 10:00)
                const start = String(hour).padStart(2,"0")
                const end = String(hour+1).padStart(2,"0")

                schedule.push({
                    subject: subject.name,
                    time: `${start}:00 - ${end}:00`
                })

                hour++
                index++
            }

            plan.push({
                date: currentDate.toDateString(),
                schedule: schedule
            })
        }

        res.json(plan)

    }catch(err){
        res.status(500).json({ error: err.message })
    }
}