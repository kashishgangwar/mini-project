import { useState, useEffect } from "react"

function App(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [isLogged,setIsLogged] = useState(false)

  const [subject,setSubject] = useState("")
  const [priority,setPriority] = useState("medium")
  const [subjects,setSubjects] = useState([])

  const [days,setDays] = useState("")
  const [hours,setHours] = useState("")
  const [plan,setPlan] = useState([])

  const login = async ()=>{
    const res = await fetch("http://localhost:5000/api/auth/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email,password})
    })

    const data = await res.json()

    if(data.token){
      localStorage.setItem("token",data.token)
      setIsLogged(true)
    }
  }

  const loadSubjects = async ()=>{
    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:5000/api/subjects/all",{
      headers:{Authorization:"Bearer "+token}
    })

    const data = await res.json()
    setSubjects(data)
  }

  const addSubject = async ()=>{
    if(!subject){
      alert("Enter subject")
      return
    }

    const token = localStorage.getItem("token")

    await fetch("http://localhost:5000/api/subjects/add",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+token
      },
      body:JSON.stringify({name:subject,priority})
    })

    setSubject("")
    loadSubjects()
  }

  const deleteSubject = async (id)=>{
    const token = localStorage.getItem("token")

    await fetch(`http://localhost:5000/api/subjects/delete/${id}`,{
      method:"DELETE",
      headers:{Authorization:"Bearer "+token}
    })

    loadSubjects()
  }

  const generatePlan = async ()=>{
    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:5000/api/planner/generate",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+token
      },
      body:JSON.stringify({
        days:Number(days),
        hoursPerDay:Number(hours)
      })
    })

    const data = await res.json()
    setPlan(data)
  }

  useEffect(()=>{
    if(isLogged){
      loadSubjects()
    }
  },[isLogged])

  if(!isLogged){
    return(
      <div style={{textAlign:"center",marginTop:"100px"}}>
        <h1>Smart Planner 🚀</h1>
        <input placeholder="Email" onChange={e=>setEmail(e.target.value)}/><br/><br/>
        <input type="password" onChange={e=>setPassword(e.target.value)} /><br/><br/>
        <button onClick={login}>Login</button>
      </div>
    )
  }

  return(
    <div style={{padding:"20px"}}>

      <h2>Add Subject</h2>

      <input value={subject} onChange={e=>setSubject(e.target.value)} />

      <select value={priority} onChange={e=>setPriority(e.target.value)}>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <button onClick={addSubject}>Add</button>

      <h3>Subjects</h3>

      {subjects.map((s)=>(
        <div key={s._id}>
          {s.name} ({s.priority})
          <button onClick={()=>deleteSubject(s._id)}>Delete</button>
        </div>
      ))}

      <h2>Generate Plan</h2>

      <input placeholder="Days" onChange={e=>setDays(e.target.value)} />
      <input placeholder="Hours/day" onChange={e=>setHours(e.target.value)} />

      <button onClick={generatePlan}>Generate</button>

      {plan.map((d,i)=>(
        <div key={i}>
          <h3>{d.date}</h3>

          <table border="1">
            <thead>
              <tr>
                <th>Time</th>
                <th>Subject</th>
              </tr>
            </thead>

            <tbody>
              {d.schedule.map((s,j)=>(
                <tr key={j}>
                  <td>{s.time}</td>
                  <td>{s.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      ))}

    </div>
  )
}

export default App