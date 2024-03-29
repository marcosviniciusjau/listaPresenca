import React,{ useState ,useEffect} from 'react';
import './styles.css'

import { Card } from '../../components/Card'

export function Home(name) {

  const [studentName, setStudentName]= useState('');
  const [students,setStudents] = useState([]);

  const [user,setUser]= useState({name:'',perfil:''})
  function handleAddStudent(){
     const newStudent={
      name: studentName,
      time: new Date().toLocaleDateString("pt-br",{
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit',
      })
     };

     setStudents(prevState=> [...prevState,newStudent]);
  }

  useEffect(()=>{
    async function fetchData(){
      const response = await fetch ('https://api.github.com/users/rodrigorgtic')
      const data= await response.json();
      
      setUser({
        name: data.name,
        perfil:data.avatar_url,
      })
    }
    fetchData();
  }, []);
  
  return (
    <div className="container">
   <header>
   <h1>Lista de Presença</h1>
   <div>
    <strong> {user.name}</strong>
    <img src={user.perfil} alt="Foto de Perfil"/>
   </div>
   </header> <input 
      type="text" 
      placeholder="Digite o nome..."
      onChange={e => setStudentName(e.target.value)}/>
    <button type="button"
    onClick={handleAddStudent}>Adicionar</button>

    {
      students.map(student => 
      (
      <Card 
        key={student.time}
        name={student.name} 
        time={student.time}
      />
      )
     )}   
      </div>
    
  )
}
